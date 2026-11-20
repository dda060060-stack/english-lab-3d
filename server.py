import hashlib
import os
import shutil
import subprocess
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

CACHE_DIR = "/tmp/english_city_tts"
os.makedirs(CACHE_DIR, exist_ok=True)

EDGE_TTS_BIN = shutil.which("edge-tts") or os.path.expanduser("~/.local/bin/edge-tts")
ALLOWED_VOICES = {"en-US-JennyNeural", "en-US-GuyNeural", "en-US-AriaNeural"}


class EnglishCityHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/tts":
            self.handle_tts(parsed.query)
            return
        super().do_GET()

    def handle_tts(self, query_string):
        params = parse_qs(query_string)
        text = params.get("text", [""])[0].strip()
        voice = params.get("voice", ["en-US-JennyNeural"])[0]
        rate = params.get("rate", ["+0%"])[0]

        if not text:
            self.send_error(400, "Missing text parameter")
            return

        if voice not in ALLOWED_VOICES:
            voice = "en-US-JennyNeural"
        if rate not in ("+0%", "-28%"):
            rate = "+0%"

        cache_key = hashlib.md5(f"{voice}|{rate}|{text}".encode("utf-8")).hexdigest()
        mp3_path = os.path.join(CACHE_DIR, f"{cache_key}.mp3")

        if not os.path.exists(mp3_path) or os.path.getsize(mp3_path) == 0:
            try:
                subprocess.run(
                    [
                        EDGE_TTS_BIN,
                        "--voice", voice,
                        f"--rate={rate}",
                        "--text", text,
                        "--write-media", mp3_path,
                    ],
                    check=True,
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.PIPE,
                    timeout=20,
                )
            except Exception as exc:
                print(f"[TTS Error] {exc}")
                self.send_error(500, "TTS generation failed")
                return

        try:
            with open(mp3_path, "rb") as f:
                audio_data = f.read()
            self.send_response(200)
            self.send_header("Content-Type", "audio/mpeg")
            self.send_header("Content-Length", str(len(audio_data)))
            self.send_header("Cache-Control", "public, max-age=86400")
            self.end_headers()
            self.wfile.write(audio_data)
        except Exception as exc:
            print(f"[TTS Read Error] {exc}")
            self.send_error(500, "Could not read audio file")


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = ThreadingHTTPServer(("127.0.0.1", 8081), EnglishCityHandler)
    print("🎙️ English City 3D + Voix Humaines prêt sur http://127.0.0.1:8081")
    server.serve_forever()
