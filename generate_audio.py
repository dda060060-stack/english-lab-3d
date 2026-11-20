#!/usr/bin/env python3
"""
Générateur d'audio MP3 statiques pour DAVID-DA Speak (compatible GitHub Pages).

Lit les 8 unités de `lessons.json` (dialogues, exemples de grammaire, vocabulaire
et réponses audio de quiz), génère les fichiers `.mp3` dans `audio/` avec `edge_tts`
(voix masculine `en-US-GuyNeural` et féminine `en-US-JennyNeural`), ignore les
fichiers déjà générés et crée l'index `audio/manifest.json`.

Usage :
    python3 generate_audio.py
    python3 generate_audio.py --dry-run
"""

import argparse
import asyncio
import json
import os
import re
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
LESSONS_FILE = BASE_DIR / "lessons.json"
AUDIO_DIR = BASE_DIR / "audio"
MANIFEST_FILE = AUDIO_DIR / "manifest.json"

MALE_VOICE = "en-US-GuyNeural"
FEMALE_VOICE = "en-US-JennyNeural"

# Unités dont le personnage principal est masculin (Moussa, Ibrahim, Salif, Wendpanga)
MALE_UNITS = {1, 3, 5, 7}


def normalize_text(text: str) -> str:
    """Normalise une phrase anglaise pour la clé du manifeste."""
    return re.sub(r"\s+", " ", str(text or "").strip()).lower()


def get_dialogue_turn_role(unit_num: int, speaker: str, idx: int) -> str:
    """Reproduit exactement la logique de rôle de app.js (`getCinemaTurnRole`)."""
    sp = (speaker or "").strip()
    low = sp.lower()
    if unit_num == 1 and "layla" in low:
        return "extra"
    if sp == "A" or low == "camarade":
        return "npc"
    if sp == "B" or low in ("étudiant", "etudiant"):
        return "player"
    return "npc" if idx % 2 == 0 else "player"


def extract_audio_items(lessons_path: Path) -> list[dict]:
    """Extrait tous les couples uniques (voix, texte anglais) de lessons.json."""
    with lessons_path.open("r", encoding="utf-8") as f:
        data = json.load(f)

    units = data if isinstance(data, list) else data.get("units", [])
    items: list[dict] = []
    seen_keys: set[tuple[str, str]] = set()
    counters: dict[tuple[int, str], int] = {}

    def add_item(unit_num: int, kind: str, text: str, voice: str) -> None:
        cleaned = re.sub(r"\s+", " ", str(text or "").strip())
        if not cleaned:
            return
        norm = normalize_text(cleaned)
        dedup_key = (voice, norm)
        if dedup_key in seen_keys:
            return
        seen_keys.add(dedup_key)

        c_key = (unit_num, kind)
        counters[c_key] = counters.get(c_key, 0) + 1
        filename = f"u{unit_num}_{kind}_{counters[c_key]:02d}.mp3"
        items.append(
            {
                "unit": unit_num,
                "kind": kind,
                "voice": voice,
                "text": cleaned,
                "norm_text": norm,
                "manifest_key": f"{voice}|{norm}",
                "rel_path": f"audio/{filename}",
                "abs_path": AUDIO_DIR / filename,
            }
        )

    for unit in units:
        if not isinstance(unit, dict):
            continue
        unit_num = int(unit.get("unit", 0) or 0)
        npc_voice = MALE_VOICE if unit_num in MALE_UNITS else FEMALE_VOICE
        player_voice = FEMALE_VOICE if npc_voice == MALE_VOICE else MALE_VOICE

        # 1. Répliques de dialogues (respecte le changement de voix NPC / Joueur / Layla)
        for idx, line in enumerate(unit.get("dialogues", []) or []):
            if not isinstance(line, dict):
                continue
            role = get_dialogue_turn_role(unit_num, line.get("speaker", ""), idx)
            if role == "player":
                voice = player_voice
            elif role == "extra":
                voice = FEMALE_VOICE
            else:
                voice = npc_voice
            add_item(unit_num, "dlg", line.get("en", ""), voice)

        # 2. Exemples de grammaire cliquables
        for rule in unit.get("grammar", []) or []:
            if not isinstance(rule, dict):
                continue
            for ex in rule.get("examples", []) or []:
                if isinstance(ex, dict):
                    add_item(unit_num, "grm", ex.get("en", ""), npc_voice)

        # 3. Mots et expressions de vocabulaire
        for vocab in unit.get("vocab", []) or []:
            if isinstance(vocab, dict):
                add_item(unit_num, "voc", vocab.get("en", ""), npc_voice)

        # 4. Bonnes réponses audio des quiz
        for quiz in unit.get("quizzes", []) or []:
            if not isinstance(quiz, dict):
                continue
            for opt in quiz.get("options", []) or []:
                if isinstance(opt, dict) and opt.get("correct"):
                    add_item(unit_num, "qz", opt.get("text", ""), npc_voice)

    return items


def write_manifest(items: list[dict], include_missing: bool = False) -> dict:
    """Écrit audio/manifest.json en indexant chaque (voix + texte) vers son MP3."""
    entries: dict[str, str] = {}
    by_text: dict[str, str] = {}

    for item in items:
        abs_path: Path = item["abs_path"]
        exists = abs_path.exists() and abs_path.stat().st_size > 0
        if not include_missing and not exists:
            continue
        rel_path = item["rel_path"]
        entries[item["manifest_key"]] = rel_path
        if item["norm_text"] not in by_text:
            by_text[item["norm_text"]] = rel_path

    manifest = {
        "version": 1,
        "generated_from": "lessons.json",
        "voices": {
            "male": MALE_VOICE,
            "female": FEMALE_VOICE,
        },
        "count": len(entries),
        "entries": entries,
        "byText": by_text,
    }

    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    with MANIFEST_FILE.open("w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    return manifest


async def synthesize_item(edge_tts_mod, item: dict, max_retries: int = 3) -> None:
    """Génère un fichier MP3 via edge_tts avec gestion propre des tentatives."""
    tmp_path = item["abs_path"].with_suffix(".mp3.tmp")
    last_err = None

    for attempt in range(1, max_retries + 1):
        try:
            communicate = edge_tts_mod.Communicate(
                text=item["text"],
                voice=item["voice"],
            )
            await communicate.save(str(tmp_path))
            if tmp_path.exists() and tmp_path.stat().st_size > 0:
                os.replace(tmp_path, item["abs_path"])
                return
            raise RuntimeError("Fichier MP3 vide")
        except Exception as exc:
            last_err = exc
            if tmp_path.exists():
                try:
                    tmp_path.unlink()
                except OSError:
                    pass
            if attempt < max_retries:
                await asyncio.sleep(0.8 * attempt)

    raise RuntimeError(f"Échec après {max_retries} essais : {last_err}")


async def run_generation(items: list[dict], dry_run: bool = False) -> int:
    total = len(items)
    if total == 0:
        print("Aucun texte anglais trouvé dans lessons.json.")
        return 0

    if dry_run:
        print(f"[DRY-RUN] {total} fichiers audio uniques détectés dans lessons.json.")
        for idx, item in enumerate(items[:10], start=1):
            print(f"[{idx}/{total}] ({item['voice']}) {item['rel_path']} <- {item['text']}")
        if total > 10:
            print(f"... ({total - 10} autres fichiers)")
        return 0

    AUDIO_DIR.mkdir(parents=True, exist_ok=True)

    try:
        import edge_tts  # type: ignore
    except ImportError:
        print(
            "Erreur : la bibliothèque 'edge_tts' est introuvable.\n"
            "Installez-la avec : pip install edge-tts",
            file=sys.stderr,
        )
        return 1

    generated = 0
    skipped = 0
    failed = 0

    print(f"Génération des fichiers MP3 DAVID-DA Speak ({total} phrases uniques)...")

    for idx, item in enumerate(items, start=1):
        abs_path: Path = item["abs_path"]
        rel_path: str = item["rel_path"]

        if abs_path.exists() and abs_path.stat().st_size > 0:
            skipped += 1
            print(f"[{idx}/{total}] Ignoré (déjà présent) : {rel_path}")
            continue

        try:
            await synthesize_item(edge_tts, item)
            generated += 1
            print(f"[{idx}/{total}] Généré : {rel_path}")
        except Exception as exc:
            failed += 1
            print(f"[{idx}/{total}] ERREUR ({rel_path}) : {exc}", file=sys.stderr)

        # Sauvegarde incrémentale du manifeste tous les 25 fichiers
        if idx % 25 == 0:
            write_manifest(items, include_missing=False)

    manifest = write_manifest(items, include_missing=False)
    print(
        f"\nTerminé ! Générés : {generated} | Ignorés : {skipped} | Erreurs : {failed}\n"
        f"Index sauvegardé : {MANIFEST_FILE.relative_to(BASE_DIR)} ({manifest['count']} entrées)"
    )
    return 0 if failed == 0 else 2


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Pré-génère les MP3 anglais de DAVID-DA Speak pour GitHub Pages."
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Affiche les phrases détectées sans générer les fichiers MP3.",
    )
    args = parser.parse_args()

    if not LESSONS_FILE.exists():
        print(f"Erreur : fichier introuvable : {LESSONS_FILE}", file=sys.stderr)
        return 1

    items = extract_audio_items(LESSONS_FILE)
    return asyncio.run(run_generation(items, dry_run=args.dry_run))


if __name__ == "__main__":
    raise SystemExit(main())
