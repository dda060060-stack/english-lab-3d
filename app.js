/*****************************************************************************
 * DAVID-DA Speak — Apprendre l'anglais Niveau 0 • Unit 1 à Unit 8
 * Architecture propre : Portraits SVG 2D, Scène 3D Burkina Faso (Three.js),
 * Cel-Shading Toon, Textures Procédurales Canvas, Profil localStorage & Audio.
 *****************************************************************************/

'use strict';

/* ===========================================================================
   1. ICÔNES SVG MINIMALISTES (ZÉRO ÉMOJI D'INTERFACE)
   =========================================================================== */
const UI_ICONS = {
  speaker: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 9.5V14.5H9L14.5 19V5L9 9.5H5Z" fill="currentColor"/><path d="M17.5 8.5C18.7 9.7 19.3 10.8 19.3 12C19.3 13.2 18.7 14.3 17.5 15.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  soundOn: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 9.5V14.5H9L14.5 19V5L9 9.5H5Z" stroke="currentColor" stroke-width="2.1" stroke-linejoin="round"/><path d="M17.5 8.5C18.8 9.6 19.4 10.8 19.4 12C19.4 13.2 18.8 14.4 17.5 15.5" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/></svg>',
  soundOff: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 9.5V14.5H9L14.5 19V5L9 9.5H5Z" stroke="currentColor" stroke-width="2.1" stroke-linejoin="round"/><path d="M17 9.5L21 13.5M21 9.5L17 13.5" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.5 12.5L10 17L18.5 7.5" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  cross: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7L17 17M17 7L7 17" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg>'
};

/* ===========================================================================
   2. PORTRAITS 2D VECTORIELS STYLE DUOLINGO (8 HABITANTS + 4 AVATARS USER)
   =========================================================================== */
function createPortraitSVG(cfg) {
  const {
    bg = '#DDF4FF',
    bgAccent = '#BCE7FF',
    skin = '#7A482B',
    skinShadow = '#61371F',
    shirt = '#58CC02',
    trim = '#FCD116',
    hair = '#1E1B18',
    headwrap = null,
    headwrapAccent = '#FCD116',
    style = 'short-fade',
    glasses = null,
    earrings = false,
    beard = false
  } = cfg;

  let headBack = '';
  let headFront = '';

  if (style === 'headwrap-knot' && headwrap) {
    headBack = `<circle cx="72" cy="24" r="13" fill="${headwrap}"/>
      <ellipse cx="50" cy="30" rx="28" ry="18" fill="${headwrap}"/>`;
    headFront = `<path d="M23 41C25 22 36 16 50 16C64 16 75 22 77 41C68 35 59 33 50 33C41 33 32 35 23 41Z" fill="${headwrap}"/>
      <path d="M27 34C38 27 62 27 73 34" stroke="${headwrapAccent}" stroke-width="4" stroke-linecap="round" fill="none"/>
      <circle cx="71" cy="24" r="7" fill="${headwrapAccent}"/>`;
  } else if (style === 'headwrap-crown' && headwrap) {
    headBack = `<ellipse cx="50" cy="25" rx="29" ry="19" fill="${headwrap}"/>`;
    headFront = `<path d="M22 42C24 20 35 12 50 12C65 12 76 20 78 42C68 35 60 33 50 33C40 33 32 35 22 42Z" fill="${headwrap}"/>
      <path d="M26 32C37 25 63 25 74 32" stroke="${headwrapAccent}" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path d="M34 22C44 17 56 17 66 22" stroke="${headwrapAccent}" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.85"/>`;
  } else if (style === 'headwrap-braid' && headwrap) {
    headBack = `<circle cx="24" cy="54" r="7" fill="${hair}"/><circle cx="76" cy="54" r="7" fill="${hair}"/>
      <circle cx="23" cy="64" r="5.5" fill="${hair}"/><circle cx="77" cy="64" r="5.5" fill="${hair}"/>
      <ellipse cx="50" cy="29" rx="27" ry="16" fill="${headwrap}"/>`;
    headFront = `<path d="M24 41C26 23 36 16 50 16C64 16 74 23 76 41C67 35 59 33 50 33C41 33 33 35 24 41Z" fill="${headwrap}"/>
      <path d="M29 33C40 27 60 27 71 33" stroke="${headwrapAccent}" stroke-width="4" stroke-linecap="round" fill="none"/>`;
  } else if (style === 'headwrap-tech' && headwrap) {
    headBack = `<ellipse cx="50" cy="27" rx="28" ry="17" fill="${headwrap}"/>`;
    headFront = `<path d="M23 41C25 21 36 15 50 15C64 15 75 21 77 41C68 36 59 34 50 34C41 34 32 36 23 41Z" fill="${headwrap}"/>
      <rect x="33" y="22" width="34" height="5" rx="2.5" fill="${headwrapAccent}"/>`;
  } else if (style === 'cap') {
    headBack = `<ellipse cx="50" cy="30" rx="27" ry="15" fill="${shirt}"/>`;
    headFront = `<path d="M24 40C25 23 36 16 50 16C64 16 75 23 76 40H24Z" fill="${shirt}"/>
      <path d="M22 38C36 33 65 33 82 39C72 43 36 42 22 38Z" fill="${trim}"/>
      <circle cx="50" cy="16" r="3.5" fill="${trim}"/>`;
  } else if (style === 'puffs') {
    headBack = `<circle cx="25" cy="27" r="12" fill="${hair}"/><circle cx="75" cy="27" r="12" fill="${hair}"/>`;
    headFront = `<path d="M25 44C25 26 36 19 50 19C64 19 75 26 75 44C69 36 60 32 50 32C40 32 31 36 25 44Z" fill="${hair}"/>
      <circle cx="28" cy="32" r="3" fill="${trim}"/><circle cx="72" cy="32" r="3" fill="${trim}"/>`;
  } else if (style === 'curly-top') {
    headBack = `<circle cx="34" cy="24" r="10" fill="${hair}"/><circle cx="50" cy="21" r="12" fill="${hair}"/><circle cx="66" cy="24" r="10" fill="${hair}"/>`;
    headFront = `<path d="M25 42C26 27 36 21 50 21C64 21 74 27 75 42C68 35 60 32 50 32C40 32 32 35 25 42Z" fill="${hair}"/>`;
  } else {
    // short-fade
    headFront = `<path d="M25 43C25 25 36 18 50 18C64 18 75 25 75 43C69 35 60 32 50 32C40 32 31 35 25 43Z" fill="${hair}"/>`;
  }

  const earringsSVG = earrings
    ? `<circle cx="23" cy="59" r="4" fill="none" stroke="#FCD116" stroke-width="2.5"/>
       <circle cx="77" cy="59" r="4" fill="none" stroke="#FCD116" stroke-width="2.5"/>`
    : '';

  const beardSVG = beard
    ? `<path d="M32 61C34 73 41 78 50 78C59 78 66 73 68 61C63 67 57 70 50 70C43 70 37 67 32 61Z" fill="${hair}" opacity="0.88"/>`
    : '';

  const glassesSVG = glasses
    ? `<g stroke="${glasses}" stroke-width="2.8" fill="rgba(255,255,255,0.22)">
         <circle cx="40" cy="50" r="8.5"/>
         <circle cx="60" cy="50" r="8.5"/>
         <path d="M48.5 50H51.5" stroke-linecap="round"/>
       </g>`
    : '';

  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
    <circle cx="50" cy="50" r="50" fill="${bg}"/>
    <path d="M12 80C22 65 78 65 88 80C78 93 65 100 50 100C35 100 22 93 12 80Z" fill="${bgAccent}"/>
    ${headBack}
    <!-- Épaules et tenue Faso Dan Fani -->
    <path d="M16 96C19 78 32 71 50 71C68 71 81 78 84 96C75 100 63 102 50 102C37 102 25 100 16 96Z" fill="${shirt}"/>
    <path d="M36 73L50 86L64 73" fill="none" stroke="${trim}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="46" y="84" width="8" height="12" rx="3" fill="${trim}" opacity="0.9"/>
    <!-- Cou -->
    <rect x="42" y="64" width="16" height="14" rx="7" fill="${skinShadow}"/>
    <!-- Oreilles -->
    <circle cx="24" cy="52" r="6.5" fill="${skin}"/>
    <circle cx="76" cy="52" r="6.5" fill="${skin}"/>
    ${earringsSVG}
    <!-- Visage arrondi style Duolingo -->
    <rect x="26" y="25" width="48" height="50" rx="24" fill="${skin}"/>
    <!-- Joues chaleureuses -->
    <ellipse cx="34" cy="58" rx="5.2" ry="3.2" fill="#FF8B8B" opacity="0.32"/>
    <ellipse cx="66" cy="58" rx="5.2" ry="3.2" fill="#FF8B8B" opacity="0.32"/>
    <!-- Sourcils -->
    <path d="M34 41C37 39 42 39 45 41" stroke="${hair}" stroke-width="2.6" stroke-linecap="round" fill="none"/>
    <path d="M55 41C58 39 63 39 66 41" stroke="${hair}" stroke-width="2.6" stroke-linecap="round" fill="none"/>
    <!-- Grands yeux expressifs -->
    <circle cx="40" cy="50" r="5.3" fill="#FFFFFF"/>
    <circle cx="60" cy="50" r="5.3" fill="#FFFFFF"/>
    <circle cx="40.8" cy="50.3" r="3.2" fill="#1E1B18"/>
    <circle cx="60.8" cy="50.3" r="3.2" fill="#1E1B18"/>
    <circle cx="42" cy="48.8" r="1.3" fill="#FFFFFF"/>
    <circle cx="62" cy="48.8" r="1.3" fill="#FFFFFF"/>
    ${beardSVG}
    <!-- Sourire chaleureux -->
    <path d="M40 60C43 66.5 57 66.5 60 60Z" fill="#FFFFFF"/>
    <path d="M40 60C43 66.5 57 66.5 60 60" stroke="#3C1E10" stroke-width="2.2" stroke-linecap="round" fill="none"/>
    ${glassesSVG}
    ${headFront}
  </svg>`;
}

const CHARACTER_PORTRAIT_SPECS = {
  'unit-1': {
    bg: '#FFE4E4', bgAccent: '#FFCBCB', skin: '#6E3F22', skinShadow: '#542E17',
    shirt: '#EF4444', trim: '#FCD116', style: 'short-fade'
  },
  'unit-2': {
    bg: '#DDF4FF', bgAccent: '#BAE6FD', skin: '#7C4A2D', skinShadow: '#61371F',
    shirt: '#1CB0F6', trim: '#FF9600', headwrap: '#FF9600', headwrapAccent: '#FFF4D6',
    style: 'headwrap-knot', glasses: '#1899D6'
  },
  'unit-3': {
    bg: '#FFF0DD', bgAccent: '#FFD9B3', skin: '#5E331A', skinShadow: '#462411',
    shirt: '#EA580C', trim: '#FEF08A', style: 'short-fade', beard: true
  },
  'unit-4': {
    bg: '#FAE8FF', bgAccent: '#F3CCFF', skin: '#734124', skinShadow: '#583019',
    shirt: '#C026D3', trim: '#FCD116', headwrap: '#EF4444', headwrapAccent: '#FCD116',
    style: 'headwrap-crown', earrings: true
  },
  'unit-5': {
    bg: '#E2FAD2', bgAccent: '#C5F4A6', skin: '#66381D', skinShadow: '#4D2914',
    shirt: '#58CC02', trim: '#FCD116', style: 'cap'
  },
  'unit-6': {
    bg: '#FEF3C7', bgAccent: '#FDE68A', skin: '#7C4A2D', skinShadow: '#60361E',
    shirt: '#D97706', trim: '#FEF3C7', headwrap: '#16A34A', headwrapAccent: '#FCD116',
    style: 'headwrap-braid', earrings: true
  },
  'unit-7': {
    bg: '#CCFBF1', bgAccent: '#99F6E4', skin: '#6C3D21', skinShadow: '#512C16',
    shirt: '#0F766E', trim: '#FBBF24', style: 'curly-top'
  },
  'unit-8': {
    bg: '#CFFAFE', bgAccent: '#A5F3FC', skin: '#784629', skinShadow: '#5C341D',
    shirt: '#0891B2', trim: '#FDE047', headwrap: '#06B6D4', headwrapAccent: '#FDE047',
    style: 'headwrap-tech', glasses: '#1E293B'
  },
  'partner': {
    bg: '#E8F7D4', bgAccent: '#D1F0AB', skin: '#8D5838', skinShadow: '#6E4228',
    shirt: '#58CC02', trim: '#FFFFFF', style: 'curly-top'
  }
};

const USER_AVATAR_PRESETS = [
  {
    id: 'preset-1',
    label: 'Explorateur',
    svg: createPortraitSVG({
      bg: '#D7FFB8', bgAccent: '#B8F58C', skin: '#7A482B', skinShadow: '#5E351E',
      shirt: '#58CC02', trim: '#FF9600', style: 'short-fade'
    })
  },
  {
    id: 'preset-2',
    label: 'Étudiante',
    svg: createPortraitSVG({
      bg: '#DDF4FF', bgAccent: '#B5E6FF', skin: '#8C5636', skinShadow: '#6E4126',
      shirt: '#1CB0F6', trim: '#FCD116', headwrap: '#FF9600', headwrapAccent: '#FFFFFF',
      style: 'headwrap-knot'
    })
  },
  {
    id: 'preset-3',
    label: 'Voyageur',
    svg: createPortraitSVG({
      bg: '#FFF4D6', bgAccent: '#FFE29E', skin: '#64381E', skinShadow: '#4A2814',
      shirt: '#FF9600', trim: '#FFFFFF', style: 'cap', glasses: '#3C3C3C'
    })
  },
  {
    id: 'preset-4',
    label: 'Créative',
    svg: createPortraitSVG({
      bg: '#FCE7F3', bgAccent: '#FBCFE8', skin: '#7D4B2E', skinShadow: '#603820',
      shirt: '#C026D3', trim: '#FCD116', style: 'puffs', earrings: true
    })
  }
];

function getNpcPortraitSVG(unitId) {
  const spec = CHARACTER_PORTRAIT_SPECS[unitId] || CHARACTER_PORTRAIT_SPECS['unit-1'];
  return createPortraitSVG(spec);
}

function getPartnerPortraitSVG() {
  return createPortraitSVG(CHARACTER_PORTRAIT_SPECS.partner);
}

function getPresetById(presetId) {
  return USER_AVATAR_PRESETS.find(p => p.id === presetId) || USER_AVATAR_PRESETS[0];
}

function renderAvatarHTML(avatarType, presetId, dataUrl) {
  if (avatarType === 'photo' && dataUrl) {
    return `<img src="${dataUrl}" alt="Photo de profil" />`;
  }
  return getPresetById(presetId).svg;
}

/* ===========================================================================
   3. DONNÉES PÉDAGOGIQUES & QUARTIER BURKINA FASO (SYNCHRONISÉ AVEC lessons.json)
   =========================================================================== */
const NEIGHBORHOOD_DATA = [
  {
    unit: 1,
    id: 'unit-1',
    placeName: 'Place de la Nation',
    shortName: 'Place Nation',
    npcName: 'Moussa',
    gender: 'male',
    hairStyle: 'short',
    outfitStyle: 'tunic',
    voice: 'en-US-GuyNeural',
    unitTitle: "What's your name?",
    theme: 'Salutations et présentations',
    color: 0xef4444,
    wallColor: 0xe6bc8a,
    awningColor: 0xdc2626,
    shirtColor: 0xef4444,
    trimColor: 0xfcd116,
    skinColor: 0x6e3f22,
    headwrapColor: null,
    accessory: 'none',
    buildingType: 'plaza',
    pos: { x: 0, z: -7.8 },
    buildingPos: { x: 0, z: -12.6 },
    buildingRotY: 0,
    dialogues: [
      {
        speaker: 'Moussa',
        en: "Hello! Good morning! My name is Moussa. Welcome to Ouagadougou! It's nice to meet you!",
        fr: "Bonjour ! Je m'appelle Moussa. Bienvenue à Ouagadougou ! Enchanté de vous rencontrer !"
      }
    ],
    grammar: [
      {
        title: "Possessifs (my, your, his, her) & verbe « be »",
        explanation: "Utilisez « My name is... » pour vous présenter et contractez « be » à l'oral (I'm, you're, it's).",
        examples: [
          { en: "My name is Moussa.", fr: "Je m'appelle Moussa." },
          { en: "It's nice to meet you too!", fr: "Enchanté(e) moi aussi !" }
        ]
      }
    ],
    tip: "Pour répondre à « It's nice to meet you! », dites « It's nice to meet you too! ».",
    vocab: [
      { en: "Hello! Good morning!", fr: "Bonjour ! (le matin)" },
      { en: "My name is Moussa.", fr: "Je m'appelle Moussa." },
      { en: "It's nice to meet you.", fr: "Enchanté(e) !" }
    ],
    quizzes: [
      {
        question: "Moussa vous dit « It's nice to meet you! ». Quelle est la meilleure réponse ?",
        options: [
          { text: "It's nice to meet you too!", correct: true },
          { text: "Good night, see you!", correct: false },
          { text: "I am a table.", correct: false }
        ],
        explanation: "On reprend la formule avec « too » (aussi)."
      }
    ]
  },
  {
    unit: 2,
    id: 'unit-2',
    placeName: 'Librairie / Campus',
    shortName: 'Campus',
    npcName: 'Aminata',
    gender: 'female',
    hairStyle: 'headwrap',
    outfitStyle: 'pagne-skirt',
    skirtColor: 0x0f5c8c,
    voice: 'en-US-JennyNeural',
    unitTitle: 'Where are my keys?',
    theme: 'Objets du quotidien et prépositions',
    color: 0x1cb0f6,
    wallColor: 0xedd6b5,
    awningColor: 0x0284c7,
    shirtColor: 0x1cb0f6,
    trimColor: 0xff9600,
    skinColor: 0x7c4a2d,
    headwrapColor: 0xff9600,
    accessory: 'glasses',
    buildingType: 'campus',
    pos: { x: 14.5, z: -6.2 },
    buildingPos: { x: 14.5, z: -11.4 },
    buildingRotY: 0,
    dialogues: [
      {
        speaker: 'Aminata',
        en: "Hi! What's this? It's my notebook, and my keys are in my backpack!",
        fr: "Salut ! Qu'est-ce que c'est ? C'est mon cahier, et mes clés sont dans mon sac à dos !"
      }
    ],
    grammar: [],
    tip: "Singulier : « What's this? It's a pen. » • Pluriel : « What are these? They're pens. »",
    vocab: [],
    quizzes: []
  },
  {
    unit: 3,
    id: 'unit-3',
    placeName: 'Maquis / Café Le Faso',
    shortName: 'Maquis Le Faso',
    npcName: 'Ibrahim',
    gender: 'male',
    hairStyle: 'short',
    outfitStyle: 'tunic',
    voice: 'en-US-GuyNeural',
    unitTitle: 'Where are you from?',
    theme: 'Pays, villes, nationalités et descriptions',
    color: 0xea580c,
    wallColor: 0xd97d54,
    awningColor: 0x15803d,
    shirtColor: 0xea580c,
    trimColor: 0xfef08a,
    skinColor: 0x5e331a,
    headwrapColor: null,
    accessory: 'beard',
    buildingType: 'maquis',
    pos: { x: -14.5, z: -6.2 },
    buildingPos: { x: -14.5, z: -11.4 },
    buildingRotY: 0,
    dialogues: [
      {
        speaker: 'Ibrahim',
        en: "Welcome to Café Le Faso! Where are you from? I'm from Bobo-Dioulasso, in Burkina Faso.",
        fr: "Bienvenue au Café Le Faso ! D'où venez-vous ? Je viens de Bobo-Dioulasso, au Burkina Faso."
      }
    ],
    grammar: [],
    tip: "Utilisez « I'm from + Pays/Ville » ou « I'm + Nationalité ».",
    vocab: [],
    quizzes: []
  },
  {
    unit: 4,
    id: 'unit-4',
    placeName: 'Boutique Faso Dan Fani',
    shortName: 'Faso Dan Fani',
    npcName: 'Fatimata',
    gender: 'female',
    hairStyle: 'headwrap',
    outfitStyle: 'dress',
    skirtColor: 0xa21caf,
    voice: 'en-US-AriaNeural',
    unitTitle: 'Is this coat yours?',
    theme: 'Vêtements, couleurs et météo',
    color: 0xc026d3,
    wallColor: 0xe4ab66,
    awningColor: 0xb91c1c,
    shirtColor: 0xc026d3,
    trimColor: 0xfcd116,
    skinColor: 0x734124,
    headwrapColor: 0xef4444,
    accessory: 'earrings',
    buildingType: 'market',
    pos: { x: 15.5, z: 9.6 },
    buildingPos: { x: 15.5, z: 14.4 },
    buildingRotY: Math.PI,
    dialogues: [
      {
        speaker: 'Fatimata',
        en: "Welcome to my Faso Dan Fani shop! It's sunny and hot today.",
        fr: "Bienvenue dans ma boutique Faso Dan Fani ! Il fait soleil et chaud aujourd'hui."
      }
    ],
    grammar: [],
    tip: "Placez toujours la couleur avant le nom du vêtement : « a red jacket ».",
    vocab: [],
    quizzes: []
  },
  {
    unit: 5,
    id: 'unit-5',
    placeName: 'Gare Routière / Arrêt de Bus',
    shortName: 'Gare Routière',
    npcName: 'Salif',
    gender: 'male',
    hairStyle: 'short',
    outfitStyle: 'tunic',
    voice: 'en-US-GuyNeural',
    unitTitle: 'What time is it?',
    theme: 'Heure et actions en cours',
    color: 0x58cc02,
    wallColor: 0xdca56c,
    awningColor: 0x15803d,
    shirtColor: 0x58cc02,
    trimColor: 0xfcd116,
    skinColor: 0x66381d,
    headwrapColor: null,
    accessory: 'cap',
    buildingType: 'busstop',
    pos: { x: -15.5, z: 9.6 },
    buildingPos: { x: -15.5, z: 13.8 },
    buildingRotY: Math.PI,
    dialogues: [
      {
        speaker: 'Salif',
        en: "Excuse me, what time is it? It's eight thirty! I'm waiting for the bus right now.",
        fr: "Excusez-moi, quelle heure est-il ? Il est huit heures trente ! J'attends le bus en ce moment."
      }
    ],
    grammar: [],
    tip: "N'oubliez pas l'auxiliaire « be » devant le verbe en « -ing » : « I am waiting ».",
    vocab: [],
    quizzes: []
  },
  {
    unit: 6,
    id: 'unit-6',
    placeName: 'Cour Familiale',
    shortName: 'Cour Familiale',
    npcName: 'Mariam',
    gender: 'female',
    hairStyle: 'braids-wrap',
    outfitStyle: 'dress',
    skirtColor: 0xb45309,
    voice: 'en-US-JennyNeural',
    unitTitle: 'I ride my bike to school.',
    theme: 'Transports, famille et routine quotidienne',
    color: 0xd97706,
    wallColor: 0xd98e59,
    awningColor: 0xb45309,
    shirtColor: 0xd97706,
    trimColor: 0xfef3c7,
    skinColor: 0x7c4a2d,
    headwrapColor: 0x16a34a,
    accessory: 'earrings',
    buildingType: 'courtyard',
    pos: { x: -9.2, z: 23.0 },
    buildingPos: { x: -15.2, z: 23.0 },
    buildingRotY: Math.PI / 2,
    dialogues: [
      {
        speaker: 'Mariam',
        en: "Good morning! Every day, I get up at six and I ride my bike to school!",
        fr: "Bonjour ! Tous les jours, je me lève à six heures et je vais à l'école à vélo !"
      }
    ],
    grammar: [],
    tip: "Verbes clés : « ride a bike », « take the bus », « walk to school ».",
    vocab: [],
    quizzes: []
  },
  {
    unit: 7,
    id: 'unit-7',
    placeName: 'Villa / Résidence',
    shortName: 'Villa',
    npcName: 'Wendpanga',
    gender: 'male',
    hairStyle: 'short',
    outfitStyle: 'tunic',
    voice: 'en-US-GuyNeural',
    unitTitle: 'Does it have a view?',
    theme: 'Maison, pièces et meubles',
    color: 0x0f766e,
    wallColor: 0xf1dec0,
    awningColor: 0xc2410c,
    shirtColor: 0x0f766e,
    trimColor: 0xfbbf24,
    skinColor: 0x6c3d21,
    headwrapColor: null,
    accessory: 'none',
    buildingType: 'villa',
    pos: { x: 9.2, z: 23.0 },
    buildingPos: { x: 15.2, z: 23.0 },
    buildingRotY: -Math.PI / 2,
    dialogues: [
      {
        speaker: 'Wendpanga',
        en: "Welcome to my house! Does it have a view? Yes, it does!",
        fr: "Bienvenue chez moi ! A-t-elle une belle vue ? Oui !"
      }
    ],
    grammar: [],
    tip: "On dit « Does it have...? » (jamais « Does it has »).",
    vocab: [],
    quizzes: []
  },
  {
    unit: 8,
    id: 'unit-8',
    placeName: 'Atelier & Bureau Tech',
    shortName: 'Bureau Tech',
    npcName: 'Awa',
    gender: 'female',
    hairStyle: 'bun',
    outfitStyle: 'pagne-skirt',
    skirtColor: 0x155e75,
    voice: 'en-US-AriaNeural',
    unitTitle: 'Where do you work?',
    theme: 'Métiers et lieux de travail',
    color: 0x0891b2,
    wallColor: 0xe3b982,
    awningColor: 0x0891b2,
    shirtColor: 0x0891b2,
    trimColor: 0xfde047,
    skinColor: 0x784629,
    headwrapColor: 0x06b6d4,
    accessory: 'glasses',
    buildingType: 'tech',
    pos: { x: 0, z: 26.5 },
    buildingPos: { x: 0, z: 31.6 },
    buildingRotY: Math.PI,
    dialogues: [
      {
        speaker: 'Awa',
        en: "Hello! What do you do? I'm a software developer, and I work in a tech office here in Ouagadougou!",
        fr: "Bonjour ! Que faites-vous dans la vie ? Je suis développeuse logiciel et je travaille dans un bureau tech à Ouagadougou !"
      }
    ],
    grammar: [],
    tip: "N'oubliez jamais l'article « a / an » devant un métier : « I am an engineer ».",
    vocab: [],
    quizzes: []
  }
];

/* ===========================================================================
   4. ÉTAT GLOBAL, PROFIL SANS COMPTE, STREAK & COMPRESSION PHOTO CANVAS
   =========================================================================== */
const PROFILE_STORAGE_KEY = 'david_speak_profile_v1';
const PROGRESS_STORAGE_KEY = 'david_speak_progress_v1';
const LEGACY_STORAGE_KEYS = ['english_city_3d_burkina_v2', 'english_city_3d_progress_v1'];
const VALID_LOCATION_IDS = new Set(NEIGHBORHOOD_DATA.map(loc => loc.id));

const state = {
  profile: null, // { name, avatarType: 'preset'|'photo', avatarPresetId, avatarDataUrl }
  xp: 0,
  streak: 1,
  lastActiveDate: null,
  visitedIds: new Set(),
  completedQuizIds: new Set(),
  soundEnabled: true,
  toneReady: false,
  activeNpc: null,
  nearbyNpc: null,
  activeTab: 'dialogue',
  autoWalkTarget: null,
  speakingTarget: null, // 'player' | npcId | null (pilote le lip-sync 3D et les gestes)
  cinema: {
    active: false,
    loc: null,
    npcEntity: null,
    turnIndex: 0,
    finished: false,
    activeRole: null, // 'npc' | 'player'
    playerSpot: null,
    camSide: 1,
    autoAdvanceTimer: null
  },
  quizIndex: 0,
  quizAnswered: false,
  keys: { up: false, down: false, left: false, right: false },
  cameraYaw: 0,
  cameraPitch: 0.40,
  cameraDistance: 14.5,
  lookAtY: 1.4,
  isDragging: false,
  lastPointer: { x: 0, y: 0 },
  onboardingDraft: {
    avatarType: 'preset',
    avatarPresetId: 'preset-1',
    avatarDataUrl: null
  },
  profileDraft: {
    avatarType: 'preset',
    avatarPresetId: 'preset-1',
    avatarDataUrl: null
  }
};

function getLocalDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function daysBetweenDateKeys(prevKey, nextKey) {
  if (!prevKey || !nextKey) return null;
  const p = prevKey.split('-').map(Number);
  const n = nextKey.split('-').map(Number);
  if (p.length !== 3 || n.length !== 3 || p.some(Number.isNaN) || n.some(Number.isNaN)) return null;
  const utcPrev = Date.UTC(p[0], p[1] - 1, p[2]);
  const utcNext = Date.UTC(n[0], n[1] - 1, n[2]);
  return Math.round((utcNext - utcPrev) / 86400000);
}

function updateDailyStreak(shouldSave = true) {
  const today = getLocalDateKey();
  if (!state.lastActiveDate) {
    state.streak = Math.max(1, state.streak || 1);
    state.lastActiveDate = today;
  } else if (state.lastActiveDate !== today) {
    const diff = daysBetweenDateKeys(state.lastActiveDate, today);
    if (diff === 1) {
      state.streak = Math.max(1, (state.streak || 1) + 1);
    } else if (diff > 1 || diff === null) {
      state.streak = 1;
    }
    state.lastActiveDate = today;
  }
  if (shouldSave) saveProgress();
}

function hasSavedProgress() {
  return state.xp > 0 || state.visitedIds.size > 0 || state.completedQuizIds.size > 0;
}

function saveProfile() {
  if (!state.profile) return true;
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(state.profile));
    return true;
  } catch (e) {
    showToast("Impossible d'enregistrer la photo (stockage plein). Essayez un avatar.");
    return false;
  }
}

function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object' || !data.name || !String(data.name).trim()) {
      return null;
    }
    return {
      name: String(data.name).trim().slice(0, 32),
      avatarType: data.avatarType === 'photo' && data.avatarDataUrl ? 'photo' : 'preset',
      avatarPresetId: data.avatarPresetId || 'preset-1',
      avatarDataUrl: data.avatarType === 'photo' ? data.avatarDataUrl : null
    };
  } catch (e) {
    return null;
  }
}

function saveProgress() {
  try {
    const payload = {
      version: 3,
      totalUnits: NEIGHBORHOOD_DATA.length,
      xp: state.xp,
      streak: state.streak,
      lastActiveDate: state.lastActiveDate || getLocalDateKey(),
      visitedIds: Array.from(state.visitedIds),
      completedQuizIds: Array.from(state.completedQuizIds),
      soundEnabled: state.soundEnabled,
      updatedAt: Date.now()
    };
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    // Ignorer si localStorage est indisponible
  }
}

function loadProgress() {
  try {
    let raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) {
      // Migration douce depuis une ancienne version si présente
      for (const legacyKey of LEGACY_STORAGE_KEYS) {
        const legacyRaw = localStorage.getItem(legacyKey);
        if (legacyRaw) {
          raw = legacyRaw;
          break;
        }
      }
    }
    if (!raw) {
      updateDailyStreak(false);
      return false;
    }
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') {
      updateDailyStreak(false);
      return false;
    }

    state.xp = Number.isFinite(data.xp) && data.xp >= 0 ? Math.floor(data.xp) : 0;
    state.visitedIds = new Set(
      Array.isArray(data.visitedIds)
        ? data.visitedIds.filter(id => VALID_LOCATION_IDS.has(id))
        : []
    );
    state.completedQuizIds = new Set(
      Array.isArray(data.completedQuizIds)
        ? data.completedQuizIds.filter(id => VALID_LOCATION_IDS.has(id))
        : []
    );
    if (typeof data.soundEnabled === 'boolean') {
      state.soundEnabled = data.soundEnabled;
    }
    state.streak = Number.isFinite(data.streak) && data.streak >= 1 ? Math.floor(data.streak) : 1;
    state.lastActiveDate = typeof data.lastActiveDate === 'string' ? data.lastActiveDate : null;

    updateDailyStreak(true);
    return hasSavedProgress();
  } catch (e) {
    updateDailyStreak(false);
    return false;
  }
}

/**
 * Redimensionne et compresse obligatoirement toute photo importée via <canvas>
 * Dimensions max : 160x160 px (recadrage carré centré), JPEG qualité 0.8.
 */
function compressProfileImage(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type || !file.type.startsWith('image/')) {
      reject(new Error('Format de fichier non pris en charge.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Impossible de lire cette image.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Image invalide ou corrompue.'));
      img.onload = () => {
        const maxSize = 160;
        const srcW = img.naturalWidth || img.width;
        const srcH = img.naturalHeight || img.height;
        if (!srcW || !srcH) {
          reject(new Error('Dimensions d\'image invalides.'));
          return;
        }

        const cropSide = Math.min(srcW, srcH);
        const sx = Math.floor((srcW - cropSide) / 2);
        const sy = Math.floor((srcH - cropSide) / 2);
        const targetSize = Math.min(maxSize, cropSide);

        const canvas = document.createElement('canvas');
        canvas.width = targetSize;
        canvas.height = targetSize;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas indisponible.'));
          return;
        }

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetSize, targetSize);
        ctx.drawImage(img, sx, sy, cropSide, cropSide, 0, 0, targetSize, targetSize);

        try {
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(dataUrl);
        } catch (err) {
          reject(err);
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ===========================================================================
   5. AUDIO (EFFETS TONE.JS + EDGE-TTS /tts + SECOURS SPEECHSYNTHESIS)
   =========================================================================== */
let synthFX = null;
let chimeFX = null;
let currentAudio = null;
let speechRequestId = 0;

async function initAudioFX() {
  if (state.toneReady || typeof Tone === 'undefined') return;
  try {
    await Tone.start();
    synthFX = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.01, decay: 0.12, sustain: 0.05, release: 0.2 }
    }).toDestination();
    synthFX.volume.value = -10;

    chimeFX = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.02, decay: 0.2, sustain: 0.1, release: 0.4 }
    }).toDestination();
    chimeFX.volume.value = -8;
    state.toneReady = true;
  } catch (e) {
    // Ignorer si audio bloqué par le navigateur
  }
}

function playFX(type) {
  if (!state.soundEnabled || !state.toneReady || typeof Tone === 'undefined') return;
  try {
    const now = Tone.now();
    if (type === 'click') synthFX.triggerAttackRelease('C5', '32n', now);
    else if (type === 'open') chimeFX.triggerAttackRelease(['E5', 'G5'], '16n', now);
    else if (type === 'success') chimeFX.triggerAttackRelease(['C5', 'E5', 'G5', 'C6'], '8n', now);
    else if (type === 'error') synthFX.triggerAttackRelease('A2', '8n', now);
    else if (type === 'step') synthFX.triggerAttackRelease('G3', '64n', now);
  } catch (e) {}
}

function clearCinemaAutoAdvance() {
  if (state.cinema && state.cinema.autoAdvanceTimer) {
    clearTimeout(state.cinema.autoAdvanceTimer);
    state.cinema.autoAdvanceTimer = null;
  }
}

function stopCurrentSpeech() {
  speechRequestId++;
  clearCinemaAutoAdvance();
  state.speakingTarget = null;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  const statusEl = document.getElementById('voice-status');
  if (statusEl) statusEl.classList.add('hidden');
  updateBubbleSpeakingWaves(false);
}

function playSingleUtterance(text, slow, chosenVoice, myReqId, speakerTarget = null) {
  return new Promise(async (resolve) => {
    if (!text || myReqId !== speechRequestId) {
      resolve();
      return;
    }
    const rateParam = slow ? '-28%' : '+0%';
    const statusEl = document.getElementById('voice-status');

    if (statusEl) {
      statusEl.textContent = slow ? 'Lecture lente...' : 'Lecture audio...';
      statusEl.classList.remove('hidden');
    }

    const startSpeaking = () => {
      if (myReqId === speechRequestId && speakerTarget) {
        state.speakingTarget = speakerTarget;
        updateBubbleSpeakingWaves(true);
      }
    };

    const finishSpeaking = () => {
      if (myReqId === speechRequestId) {
        state.speakingTarget = null;
        updateBubbleSpeakingWaves(false);
      }
      resolve();
    };

    try {
      const url = `/tts?text=${encodeURIComponent(text)}&voice=${encodeURIComponent(chosenVoice)}&rate=${encodeURIComponent(rateParam)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Local TTS indisponible');
      const blob = await res.blob();
      if (myReqId !== speechRequestId) {
        resolve();
        return;
      }

      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      currentAudio = audio;
      let finished = false;
      const done = () => {
        if (finished) return;
        finished = true;
        URL.revokeObjectURL(audioUrl);
        if (currentAudio === audio) currentAudio = null;
        finishSpeaking();
      };
      audio.onended = done;
      audio.onerror = done;
      startSpeaking();
      await audio.play();
    } catch (e) {
      if (myReqId !== speechRequestId) {
        resolve();
        return;
      }
      if ('speechSynthesis' in window) {
        let settled = false;
        const finishUtter = () => {
          if (settled) return;
          settled = true;
          clearTimeout(fallbackSafetyTimer);
          finishSpeaking();
        };
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'en-US';
        utter.rate = slow ? 0.68 : 0.95;
        utter.onstart = startSpeaking;
        utter.onend = finishUtter;
        utter.onerror = finishUtter;
        // Filet de sécurité si le navigateur ne déclenche pas onend (ex: mode sans voix système)
        const approxMs = Math.max(1800, Math.min(9000, text.length * (slow ? 85 : 62)));
        const fallbackSafetyTimer = setTimeout(finishUtter, approxMs + 1200);
        startSpeaking();
        window.speechSynthesis.speak(utter);
      } else {
        // Mode silencieux : anime la bouche le temps naturel de lecture de la phrase
        startSpeaking();
        const approxMs = Math.max(1500, Math.min(5000, text.length * 55));
        setTimeout(() => {
          finishSpeaking();
        }, approxMs);
      }
    }
  });
}

async function speakEnglish(text, slow = false, voice = null, speakerTarget = null) {
  playFX('click');
  stopCurrentSpeech();
  const myReqId = speechRequestId;
  const chosenVoice = voice || (state.activeNpc ? state.activeNpc.voice : 'en-US-JennyNeural');
  const target = speakerTarget || (state.activeNpc ? state.activeNpc.id : null);
  await playSingleUtterance(text, slow, chosenVoice, myReqId, target);
  const statusEl = document.getElementById('voice-status');
  if (myReqId === speechRequestId && statusEl) statusEl.classList.add('hidden');
}

async function speakDialogueSequence(loc, slow = false) {
  if (!loc) return;
  playFX('click');
  stopCurrentSpeech();
  const myReqId = speechRequestId;
  const lines = (loc.dialogues || []).filter(d => d && d.en);
  for (let i = 0; i < lines.length; i++) {
    if (myReqId !== speechRequestId) return;
    const role = getCinemaTurnRole(loc, lines[i], i);
    const target = role === 'player' ? 'player' : loc.id;
    const chosenVoice = role === 'player' ? getPlayerVoiceForNpc(loc.voice) : loc.voice;
    await playSingleUtterance(lines[i].en, slow, chosenVoice, myReqId, target);
  }
  const statusEl = document.getElementById('voice-status');
  if (myReqId === speechRequestId && statusEl) statusEl.classList.add('hidden');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add('hidden'), 2800);
}

/* ===========================================================================
   6. CHARGEMENT DYNAMIQUE DE ./lessons.json (SANS MODIFIER SON CONTENU)
   =========================================================================== */
function normalizeLessonDialogues(item, fallbackNpcName) {
  if (Array.isArray(item.dialogues) && item.dialogues.length > 0) {
    return item.dialogues
      .map(d => {
        if (typeof d === 'string') return { speaker: fallbackNpcName, en: d, phonetic: '', fr: '' };
        return {
          speaker: d.speaker || fallbackNpcName,
          en: d.en || d.sentenceEn || d.text || '',
          phonetic: d.phonetic || '',
          fr: d.fr || d.sentenceFr || ''
        };
      })
      .filter(d => d.en);
  }
  if (item.dialogue && typeof item.dialogue === 'object' && (item.dialogue.en || item.dialogue.sentenceEn)) {
    return [{
      speaker: item.dialogue.speaker || fallbackNpcName,
      en: item.dialogue.en || item.dialogue.sentenceEn,
      phonetic: item.dialogue.phonetic || '',
      fr: item.dialogue.fr || item.dialogue.sentenceFr || ''
    }];
  }
  if (item.dialogueEn || item.sentenceEn) {
    return [{
      speaker: fallbackNpcName,
      en: item.dialogueEn || item.sentenceEn,
      phonetic: item.phonetic || '',
      fr: item.dialogueFr || item.sentenceFr || ''
    }];
  }
  return null;
}

function normalizeLessonGrammar(item) {
  const raw = item.grammar || item.grammarPoints;
  if (!raw) return null;
  if (Array.isArray(raw) && raw.length > 0) {
    return raw.map((g, i) => {
      if (typeof g === 'string') {
        return { title: `Point de grammaire ${i + 1}`, explanation: g, examples: [] };
      }
      const examples = Array.isArray(g.examples)
        ? g.examples
            .map(ex => (typeof ex === 'string' ? { en: ex, fr: '' } : { en: ex.en || '', fr: ex.fr || '' }))
            .filter(ex => ex.en)
        : [];
      return {
        title: g.title || g.name || `Point de grammaire ${i + 1}`,
        explanation: g.explanation || g.rule || g.description || '',
        examples
      };
    });
  }
  if (typeof raw === 'string') {
    return [{ title: 'Grammaire', explanation: raw, examples: [] }];
  }
  return null;
}

function normalizeLessonVocab(item) {
  const raw = item.vocab || item.vocabulary;
  if (!Array.isArray(raw) || raw.length === 0) return null;
  return raw
    .map(v => {
      if (typeof v === 'string') return { en: v, phonetic: '', fr: '' };
      return {
        en: v.en || v.word || v.term || '',
        phonetic: v.phonetic || v.ipa || '',
        fr: v.fr || v.translation || v.meaning || ''
      };
    })
    .filter(v => v.en);
}

function normalizeLessonQuizzes(item) {
  const rawList = Array.isArray(item.quizzes)
    ? item.quizzes
    : Array.isArray(item.exercises)
      ? item.exercises
      : item.quiz
        ? [item.quiz]
        : null;
  if (!rawList || rawList.length === 0) return null;

  const parsed = rawList
    .map(q => {
      if (!q || !q.question || !Array.isArray(q.options) || q.options.length === 0) return null;
      const options = q.options
        .map(opt => {
          if (typeof opt === 'string') return { text: opt, correct: false };
          return {
            text: opt.text || opt.label || '',
            correct: Boolean(opt.correct)
          };
        })
        .filter(opt => opt.text);
      if (options.length === 0) return null;
      return {
        question: q.question,
        options,
        explanation: q.explanation || ''
      };
    })
    .filter(Boolean);

  return parsed.length > 0 ? parsed : null;
}

async function loadLessonsFromJson() {
  try {
    const res = await fetch('./lessons.json', { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    const items = Array.isArray(data)
      ? data
      : (data.units || data.lessons || data.modules || []);
    if (!Array.isArray(items) || items.length === 0) return;

    items.forEach((item, idx) => {
      if (!item || typeof item !== 'object') return;
      const unitNum = Number(item.unit);
      let target = Number.isInteger(unitNum)
        ? NEIGHBORHOOD_DATA.find(loc => loc.unit === unitNum)
        : null;
      if (!target && item.id) {
        target = NEIGHBORHOOD_DATA.find(loc => loc.id === item.id);
      }
      if (!target && idx < NEIGHBORHOOD_DATA.length) {
        target = NEIGHBORHOOD_DATA[idx];
      }
      if (!target) return;

      if (item.title || item.unitTitle) target.unitTitle = item.title || item.unitTitle;
      if (item.theme || item.category) target.theme = item.theme || item.category;
      if (item.placeName) target.placeName = item.placeName;
      if (item.npcName) target.npcName = item.npcName;
      if (item.tip) target.tip = item.tip;

      const dialogues = normalizeLessonDialogues(item, target.npcName);
      if (dialogues) target.dialogues = dialogues;

      const grammar = normalizeLessonGrammar(item);
      if (grammar) target.grammar = grammar;

      const vocab = normalizeLessonVocab(item);
      if (vocab) target.vocab = vocab;

      const quizzes = normalizeLessonQuizzes(item);
      if (quizzes) target.quizzes = quizzes;
    });
  } catch (e) {
    // Repli silencieux sur les données intégrées si lessons.json est indisponible
  }
}

/* ===========================================================================
   7. SCÈNE 3D THREE.JS — QUARTIER DU BURKINA FASO & PERSONNAGES STYLE DUOLINGO
   =========================================================================== */
let scene, camera, renderer, raycaster, mouse;
let playerGroup, playerParts, playerAnim;
let burkinaFlagPivot = null;
const npcEntities = [];
const clickableMeshes = [];
const worldColliders = [];
const backgroundCitizens = [];
const trafficVehicles = [];
let clock = null;
let stepTimer = 0;

let _camGoalVec = null;
let _camLookVec = null;
let _camTargetLookVec = null;
let _labelVec = null;

const PLAYER_RADIUS = 0.56;
const NPC_RADIUS = 0.62;
const WORLD_BOUNDS = { minX: -28.0, maxX: 28.0, minZ: -17.5, maxZ: 29.2 };

function addCircleCollider(x, z, r, tag = 'obstacle', npcId = null) {
  worldColliders.push({ type: 'circle', x, z, r, tag, npcId });
}

function addBoxCollider(x, z, hx, hz, rotY = 0, tag = 'building') {
  worldColliders.push({ type: 'box', x, z, hx, hz, rotY, tag });
}

function lerpAngle(current, target, factor) {
  let diff = target - current;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return current + diff * factor;
}

/**
 * Résout proprement toutes les collisions (cercles et boîtes orientées OBB)
 * avec glissement fluide le long des murs et respect des limites du quartier.
 */
function resolveCollisions(pos, radius = PLAYER_RADIUS, ignoreNpcId = null) {
  let collided = false;
  for (let iter = 0; iter < 3; iter++) {
    for (let i = 0; i < worldColliders.length; i++) {
      const c = worldColliders[i];
      if (ignoreNpcId && c.npcId === ignoreNpcId) continue;

      if (c.type === 'circle') {
        const dx = pos.x - c.x;
        const dz = pos.z - c.z;
        const minDist = radius + c.r;
        const distSq = dx * dx + dz * dz;
        if (distSq < minDist * minDist) {
          const dist = Math.sqrt(distSq);
          if (dist > 0.0001) {
            const push = minDist - dist;
            pos.x += (dx / dist) * push;
            pos.z += (dz / dist) * push;
          } else {
            pos.z += minDist;
          }
          collided = true;
        }
      } else if (c.type === 'box') {
        const relX = pos.x - c.x;
        const relZ = pos.z - c.z;
        const cos = Math.cos(-c.rotY);
        const sin = Math.sin(-c.rotY);
        const lx = relX * cos - relZ * sin;
        const lz = relX * sin + relZ * cos;

        const clampedX = Math.max(-c.hx, Math.min(c.hx, lx));
        const clampedZ = Math.max(-c.hz, Math.min(c.hz, lz));
        const dx = lx - clampedX;
        const dz = lz - clampedZ;
        const distSq = dx * dx + dz * dz;

        if (distSq < radius * radius) {
          let pushLx = 0;
          let pushLz = 0;
          if (distSq > 0.000001) {
            const dist = Math.sqrt(distSq);
            const push = radius - dist;
            pushLx = (dx / dist) * push;
            pushLz = (dz / dist) * push;
          } else {
            // Centre à l'intérieur de la boîte : expulser vers le bord le plus proche
            const penX = c.hx - Math.abs(lx);
            const penZ = c.hz - Math.abs(lz);
            if (penX < penZ) {
              pushLx = (lx >= 0 ? 1 : -1) * (penX + radius);
            } else {
              pushLz = (lz >= 0 ? 1 : -1) * (penZ + radius);
            }
          }
          const cosBack = Math.cos(c.rotY);
          const sinBack = Math.sin(c.rotY);
          pos.x += pushLx * cosBack - pushLz * sinBack;
          pos.z += pushLx * sinBack + pushLz * cosBack;
          collided = true;
        }
      }
    }

    // Limites strictes du quartier
    if (pos.x < WORLD_BOUNDS.minX) { pos.x = WORLD_BOUNDS.minX; collided = true; }
    if (pos.x > WORLD_BOUNDS.maxX) { pos.x = WORLD_BOUNDS.maxX; collided = true; }
    if (pos.z < WORLD_BOUNDS.minZ) { pos.z = WORLD_BOUNDS.minZ; collided = true; }
    if (pos.z > WORLD_BOUNDS.maxZ) { pos.z = WORLD_BOUNDS.maxZ; collided = true; }
  }
  return collided;
}

function isSpotClear(x, z, radius = PLAYER_RADIUS, ignoreNpcId = null) {
  const probe = { x, z };
  const hit = resolveCollisions(probe, radius, ignoreNpcId);
  return !hit;
}

function findClearStandPosition(loc, preferredFromPos = null) {
  const dist = 2.35;
  const fromX = preferredFromPos ? preferredFromPos.x : 0;
  const fromZ = preferredFromPos ? preferredFromPos.z : 2;
  const baseAngle = Math.atan2(fromX - loc.pos.x, fromZ - loc.pos.z);
  const plazaAngle = Math.atan2(0 - loc.pos.x, 2 - loc.pos.z);
  const candidateAngles = [
    baseAngle,
    plazaAngle,
    baseAngle + 0.55,
    baseAngle - 0.55,
    plazaAngle + 0.7,
    plazaAngle - 0.7,
    0, Math.PI / 2, Math.PI, -Math.PI / 2
  ];

  for (const ang of candidateAngles) {
    const cx = loc.pos.x + Math.sin(ang) * dist;
    const cz = loc.pos.z + Math.cos(ang) * dist;
    if (isSpotClear(cx, cz, PLAYER_RADIUS + 0.08, null)) {
      return { x: cx, z: cz };
    }
  }

  const fallback = {
    x: loc.pos.x + Math.sin(plazaAngle) * dist,
    z: loc.pos.z + Math.cos(plazaAngle) * dist
  };
  resolveCollisions(fallback, PLAYER_RADIUS + 0.05, null);
  return fallback;
}

function getDefaultCameraDistance() {
  if (window.innerWidth < 640 && window.innerHeight > window.innerWidth) return 17;
  if (window.innerHeight < 500) return 13.5;
  return 14.5;
}

function updateCameraForViewport() {
  if (!camera || !renderer) return;
  const container = document.getElementById('canvas-container');
  const w = container.clientWidth || window.innerWidth;
  const h = container.clientHeight || window.innerHeight;
  const isMobilePortrait = w < 640 && h > w;
  camera.fov = isMobilePortrait ? 56 : 50;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(w, h);
}

/* ===========================================================================
   7A. RENDU CEL-SHADING (TOON) & TEXTURES PROCÉDURALES LÉGÈRES (<canvas>)
   =========================================================================== */
let _toonGradientMap = null;
let _toonOutlineMat = null;
const _toonMatCache = new Map();
const SCENE_TEX = {
  laterite: null,
  asphalt: null,
  sidewalk: null,
  stucco: null,
  corrugated: null,
  window: null,
  fasoFabric: null,
  glowSprite: null
};

function getToonGradientMap() {
  if (_toonGradientMap) return _toonGradientMap;
  if (typeof THREE === 'undefined' || typeof THREE.DataTexture !== 'function') return null;
  try {
    // Dégradé cel-shading net en 3 tons (ombre douce, ton moyen, lumière vive)
    const tones = new Uint8Array([146, 214, 255]);
    const format = THREE.LuminanceFormat !== undefined ? THREE.LuminanceFormat : THREE.RedFormat;
    const tex = new THREE.DataTexture(tones, 3, 1, format);
    if (THREE.NearestFilter !== undefined) {
      tex.minFilter = THREE.NearestFilter;
      tex.magFilter = THREE.NearestFilter;
    }
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    _toonGradientMap = tex;
    return tex;
  } catch (_) {
    return null;
  }
}

function createToonMaterial(colorHex) {
  const key = String(colorHex);
  if (_toonMatCache.has(key)) return _toonMatCache.get(key);
  let mat;
  const gradMap = getToonGradientMap();
  if (typeof THREE.MeshToonMaterial === 'function') {
    mat = new THREE.MeshToonMaterial({ color: colorHex, gradientMap: gradMap });
  } else {
    mat = new THREE.MeshLambertMaterial({ color: colorHex });
  }
  _toonMatCache.set(key, mat);
  return mat;
}

function getToonOutlineMaterial() {
  if (_toonOutlineMat) return _toonOutlineMat;
  _toonOutlineMat = new THREE.MeshBasicMaterial({
    color: 0x1f1714,
    side: THREE.BackSide
  });
  return _toonOutlineMat;
}

function addToonOutline(parent, sourceMesh, scaleFactor = 1.06) {
  if (!parent || !sourceMesh || !sourceMesh.geometry) return null;
  const outline = new THREE.Mesh(sourceMesh.geometry, getToonOutlineMaterial());
  outline.position.copy ? outline.position.copy(sourceMesh.position) : outline.position.set(sourceMesh.position.x, sourceMesh.position.y, sourceMesh.position.z);
  outline.rotation.set(sourceMesh.rotation.x, sourceMesh.rotation.y, sourceMesh.rotation.z);
  outline.scale.set(
    sourceMesh.scale.x * scaleFactor,
    sourceMesh.scale.y * scaleFactor,
    sourceMesh.scale.z * scaleFactor
  );
  parent.add(outline);
  return outline;
}

function makeProceduralCanvasTexture(w, h, drawFn, repeatX = 1, repeatY = 1) {
  try {
    if (typeof document === 'undefined' || typeof THREE.CanvasTexture !== 'function') return null;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext && c.getContext('2d');
    if (!ctx) return null;
    drawFn(ctx, w, h);
    const tex = new THREE.CanvasTexture(c);
    if (THREE.RepeatWrapping !== undefined) {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
    }
    if (tex.repeat && typeof tex.repeat.set === 'function') {
      tex.repeat.set(repeatX, repeatY);
    }
    tex.needsUpdate = true;
    return tex;
  } catch (_) {
    return null;
  }
}

function buildProceduralTextures() {
  // 1. Terre de latérite rouge-ocre du Burkina Faso (inspirée photo aérienne)
  SCENE_TEX.laterite = makeProceduralCanvasTexture(128, 128, (ctx, w, h) => {
    ctx.fillStyle = '#ba6c3e';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 420; i++) {
      const x = (i * 37) % w;
      const y = (i * 53) % h;
      const r = 1 + (i % 4);
      ctx.fillStyle = i % 3 === 0 ? '#a3582f' : (i % 3 === 1 ? '#ce8352' : '#d6976a');
      ctx.globalAlpha = 0.32;
      ctx.fillRect(x, y, r * 2, r);
    }
    ctx.globalAlpha = 1;
  }, 28, 28);

  // 2. Bitume de boulevard texturé (poussière chaude + grain fin satiné)
  SCENE_TEX.asphalt = makeProceduralCanvasTexture(128, 128, (ctx, w, h) => {
    ctx.fillStyle = '#605c58';
    ctx.fillRect(0, 0, w, h);
    // Traces de roulement très subtiles
    ctx.fillStyle = 'rgba(42, 40, 38, 0.22)';
    ctx.fillRect(0, 18, w, 24);
    ctx.fillRect(0, 84, w, 24);
    for (let i = 0; i < 520; i++) {
      const x = (i * 29) % w;
      const y = (i * 47) % h;
      ctx.fillStyle = i % 2 === 0 ? '#77716a' : '#4b4845';
      ctx.globalAlpha = 0.35;
      ctx.fillRect(x, y, 2, 2);
    }
    ctx.globalAlpha = 1;
  }, 16, 2);

  // 3. Trottoirs dallés sable-ocre
  SCENE_TEX.sidewalk = makeProceduralCanvasTexture(128, 128, (ctx, w, h) => {
    ctx.fillStyle = '#d8ba98';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(135, 102, 74, 0.32)';
    ctx.lineWidth = 2;
    for (let y = 0; y < h; y += 32) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    for (let x = 0; x < w; x += 32) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let i = 0; i < 160; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,244,225,0.22)' : 'rgba(165,120,82,0.18)';
      ctx.fillRect((i * 43) % w, (i * 61) % h, 3, 3);
    }
  }, 18, 1);

  // 4. Crépi de façade chaud subtil (remplace l'aspect blocs plats)
  SCENE_TEX.stucco = makeProceduralCanvasTexture(128, 128, (ctx, w, h) => {
    ctx.fillStyle = '#f3ede4';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 360; i++) {
      const x = (i * 41) % w;
      const y = (i * 23) % h;
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.25)' : 'rgba(120,90,65,0.12)';
      ctx.fillRect(x, y, 4, 2);
    }
    // Légère bande de soubassement chaleureuse
    ctx.fillStyle = 'rgba(135, 92, 58, 0.14)';
    ctx.fillRect(0, h - 18, w, 18);
  }, 2, 2);

  // 5. Tôle ondulée métallique légère
  SCENE_TEX.corrugated = makeProceduralCanvasTexture(64, 64, (ctx, w, h) => {
    ctx.fillStyle = '#9aa3ac';
    ctx.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 8) {
      ctx.fillStyle = 'rgba(255,255,255,0.28)';
      ctx.fillRect(x, 0, 3, h);
      ctx.fillStyle = 'rgba(55,64,74,0.26)';
      ctx.fillRect(x + 4, 0, 3, h);
    }
  }, 3, 1);

  // 6. Fenêtre architecturale encadrée avec reflets chauds intérieurs
  SCENE_TEX.window = makeProceduralCanvasTexture(128, 128, (ctx, w, h) => {
    // Cadre extérieur crème-brun
    ctx.fillStyle = '#e8dfd1';
    ctx.fillRect(0, 0, w, h);
    // Vitre avec dégradé reflet chaud fin d'après-midi
    const g = ctx.createLinearGradient(8, 8, w - 8, h - 8);
    g.addColorStop(0, '#2a435a');
    g.addColorStop(0.45, '#4c687c');
    g.addColorStop(0.75, '#d99e5b');
    g.addColorStop(1, '#f4c77b');
    ctx.fillStyle = g;
    ctx.fillRect(8, 8, w - 16, h - 16);
    // Reflet diagonal doux
    ctx.fillStyle = 'rgba(255, 246, 220, 0.26)';
    ctx.beginPath();
    ctx.moveTo(14, 14); ctx.lineTo(54, 14); ctx.lineTo(24, h - 14); ctx.lineTo(14, h - 14);
    ctx.closePath();
    ctx.fill();
    // Croisillons nets
    ctx.fillStyle = '#334155';
    ctx.fillRect(w / 2 - 3, 8, 6, h - 16);
    ctx.fillRect(8, h / 2 - 3, w - 16, 6);
  }, 1, 1);

  // 7. Motif tissé Faso Dan Fani coloré
  SCENE_TEX.fasoFabric = makeProceduralCanvasTexture(128, 64, (ctx, w, h) => {
    ctx.fillStyle = '#d62828';
    ctx.fillRect(0, 0, w, h);
    const stripes = ['#fcd116', '#146334', '#f8fafc', '#1e4d7b', '#fcd116', '#ea580c'];
    stripes.forEach((col, i) => {
      ctx.fillStyle = col;
      ctx.fillRect(0, i * 10 + 2, w, 5);
    });
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    for (let x = 0; x < w; x += 8) ctx.fillRect(x, 0, 2, h);
  }, 1, 1);

  // 8. Sprite radial doux pour halos chauds de lampadaires et enseignes
  SCENE_TEX.glowSprite = makeProceduralCanvasTexture(64, 64, (ctx, w, h) => {
    const cx = w / 2;
    const cy = h / 2;
    const rad = ctx.createRadialGradient(cx, cy, 2, cx, cy, cx);
    rad.addColorStop(0.0, 'rgba(255, 244, 198, 0.92)');
    rad.addColorStop(0.35, 'rgba(255, 206, 102, 0.45)');
    rad.addColorStop(0.7, 'rgba(255, 174, 66, 0.14)');
    rad.addColorStop(1.0, 'rgba(255, 160, 50, 0.0)');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, w, h);
  }, 1, 1);
}

function createGlowSprite(size = 1.6, opacity = 0.65) {
  if (typeof THREE.Sprite === 'function' && typeof THREE.SpriteMaterial === 'function' && SCENE_TEX.glowSprite) {
    const mat = new THREE.SpriteMaterial({
      map: SCENE_TEX.glowSprite,
      transparent: true,
      opacity,
      depthWrite: false
    });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(size, size, 1);
    return sprite;
  }
  const fallback = new THREE.Mesh(
    new THREE.SphereGeometry(size * 0.24, 7, 6),
    new THREE.MeshBasicMaterial({ color: 0xffe08a, transparent: true, opacity: opacity * 0.35, depthWrite: false })
  );
  return fallback;
}

function createReadableSignboard(title, subtitle, width = 3.2, height = 0.86, opts = {}) {
  const {
    bg = '#fffdf7',
    border = '#c8372d',
    header = '#1e4d7b',
    text = '#2b2b2b'
  } = opts;

  const signGroup = new THREE.Group();
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(width + 0.14, height + 0.14, 0.12),
    new THREE.MeshLambertMaterial({ color: border })
  );
  signGroup.add(frame);

  const signTex = makeProceduralCanvasTexture(256, 80, (ctx, w, h) => {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = header;
    ctx.fillRect(0, 0, w, 14);
    ctx.fillStyle = border;
    ctx.fillRect(0, h - 8, w, 8);

    ctx.fillStyle = text;
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(title, w / 2, 37, w - 18);

    if (subtitle) {
      ctx.fillStyle = header;
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(subtitle, w / 2, 60, w - 20);
    }
  }, 1, 1);

  const faceMat = signTex
    ? new THREE.MeshBasicMaterial({ map: signTex })
    : new THREE.MeshLambertMaterial({ color: bg });
  const face = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.14), faceMat);
  signGroup.add(face);

  // Petite lueur chaude au-dessus de l'enseigne de boutique
  const signGlow = createGlowSprite(1.35, 0.42);
  signGlow.position.set(0, height * 0.55, 0.25);
  signGroup.add(signGlow);

  return signGroup;
}

function initThreeScene() {
  if (typeof THREE === 'undefined') return false;
  worldColliders.length = 0;
  npcEntities.length = 0;
  clickableMeshes.length = 0;
  backgroundCitizens.length = 0;
  trafficVehicles.length = 0;
  _toonMatCache.clear();
  clock = new THREE.Clock();
  _camGoalVec = new THREE.Vector3();
  _camLookVec = new THREE.Vector3(0, 1.4, 7.6);
  _camTargetLookVec = new THREE.Vector3();
  _labelVec = new THREE.Vector3();
  const container = document.getElementById('canvas-container');
  scene = new THREE.Scene();

  buildProceduralTextures();

  // Ambiance cinématographique fin d'après-midi : ciel doux + brume exponentielle dorée à l'horizon
  scene.background = new THREE.Color(0x9bc4e2);
  if (typeof THREE.FogExp2 === 'function') {
    scene.fog = new THREE.FogExp2(0xe6c39c, 0.0088);
  } else {
    scene.fog = new THREE.Fog(0xe6c39c, 46, 126);
  }

  state.cameraDistance = getDefaultCameraDistance();
  const initialFov = (window.innerWidth < 640 && window.innerHeight > window.innerWidth) ? 56 : 50;
  camera = new THREE.PerspectiveCamera(initialFov, container.clientWidth / container.clientHeight, 0.1, 210);

  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'default' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(container.clientWidth, container.clientHeight);
  if (renderer.shadowMap) {
    renderer.shadowMap.enabled = true;
    if (THREE.PCFSoftShadowMap !== undefined) {
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
  }
  container.appendChild(renderer.domElement);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Éclairage naturel chaud fin d'après-midi : ciel doré + rebond terre de latérite
  const hemiLight = new THREE.HemisphereLight(0xfff1d6, 0xb06a3c, 0.94);
  hemiLight.position.set(0, 38, 0);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xffd79b, 1.18);
  sunLight.position.set(36, 28, -28);
  sunLight.castShadow = true;
  if (sunLight.shadow && sunLight.shadow.mapSize) {
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    if (sunLight.shadow.camera) {
      sunLight.shadow.camera.near = 5;
      sunLight.shadow.camera.far = 115;
      sunLight.shadow.camera.left = -36;
      sunLight.shadow.camera.right = 36;
      sunLight.shadow.camera.top = 38;
      sunLight.shadow.camera.bottom = -38;
    }
    sunLight.shadow.bias = -0.0008;
  }
  scene.add(sunLight);

  // Contre-jour bleu ciel très doux pour sculpter les visages cel-shaded
  const fillLight = new THREE.DirectionalLight(0xbcdbff, 0.30);
  fillLight.position.set(-24, 18, 28);
  scene.add(fillLight);

  buildSkyAndSun();
  buildNeighborhoodGround();
  buildBurkinaFlagMonument();
  buildMonumentDesMartyrs();
  buildEnvironmentDecor();
  buildAllLocationsAndNPCs();
  buildBackgroundPopulation();
  buildRoadTraffic();
  buildPlayerAvatar();

  setupCanvasEvents(renderer.domElement);
  window.addEventListener('resize', updateCameraForViewport);
  window.addEventListener('orientationchange', () => setTimeout(updateCameraForViewport, 120));
  return true;
}

function buildSkyAndSun() {
  // Dôme de ciel dégradé léger (bleu doux au zénith -> doré/orangé doux à l'horizon)
  try {
    if (typeof document !== 'undefined' && typeof THREE.CanvasTexture === 'function') {
      const skyCanvas = document.createElement('canvas');
      skyCanvas.width = 2;
      skyCanvas.height = 128;
      const ctx = skyCanvas.getContext && skyCanvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createLinearGradient(0, 0, 0, 128);
        grad.addColorStop(0.0, '#5a9ed6');
        grad.addColorStop(0.34, '#8ec0e6');
        grad.addColorStop(0.50, '#e9cfa9');
        grad.addColorStop(0.60, '#f3ba7d');
        grad.addColorStop(1.0, '#d89a64');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 2, 128);
        const skyTex = new THREE.CanvasTexture(skyCanvas);
        const skyDome = new THREE.Mesh(
          new THREE.SphereGeometry(165, 16, 12),
          new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false, depthWrite: false })
        );
        scene.add(skyDome);
      }
    }
  } catch (_) {
    // Repli automatique sur scene.background si CanvasTexture indisponible
  }

  // Soleil bas de fin d'après-midi avec halo doré chaleureux
  const sunGroup = new THREE.Group();
  const sunCore = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3.5, 1),
    new THREE.MeshBasicMaterial({ color: 0xfff4c2, fog: false })
  );
  const sunHaloInner = new THREE.Mesh(
    new THREE.IcosahedronGeometry(6.0, 1),
    new THREE.MeshBasicMaterial({ color: 0xffd17a, transparent: true, opacity: 0.24, fog: false })
  );
  const sunHaloOuter = new THREE.Mesh(
    new THREE.IcosahedronGeometry(9.2, 1),
    new THREE.MeshBasicMaterial({ color: 0xf7a859, transparent: true, opacity: 0.11, fog: false })
  );
  sunGroup.add(sunCore, sunHaloInner, sunHaloOuter);
  sunGroup.position.set(52, 24, -64);
  scene.add(sunGroup);

  // Nuages légers légèrement dorés par le soleil couchant
  const cloudMat = new THREE.MeshLambertMaterial({ color: 0xfff3e2 });
  const cloudCoords = [
    [-40, 23, -34], [-14, 25, -44], [18, 24, -38], [44, 22, -24],
    [-34, 24, 18], [34, 23, 24]
  ];
  cloudCoords.forEach(([x, y, z], i) => {
    const cloud = new THREE.Group();
    for (let j = 0; j < 3; j++) {
      const puff = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.6 + (j === 1 ? 0.55 : 0), 1),
        cloudMat
      );
      puff.scale.set(1.4, 0.58, 0.95);
      puff.position.set((j - 1) * 1.65, j === 1 ? 0.22 : 0, 0);
      cloud.add(puff);
    }
    cloud.position.set(x, y + (i % 2) * 1.4, z);
    scene.add(cloud);
  });
}

function buildNeighborhoodGround() {
  const lateriteMat = new THREE.MeshLambertMaterial({
    color: SCENE_TEX.laterite ? 0xffffff : 0xb86a3e,
    map: SCENE_TEX.laterite || null
  });
  const lateriteGround = new THREE.Mesh(
    new THREE.PlaneGeometry(190, 190),
    lateriteMat
  );
  lateriteGround.rotation.x = -Math.PI / 2;
  lateriteGround.receiveShadow = true;
  scene.add(lateriteGround);

  const warmSandMat = new THREE.MeshLambertMaterial({ color: 0xc98556 });
  const dustyBeigeMat = new THREE.MeshLambertMaterial({ color: 0xc5a687 });
  const dirtPatches = [
    [-15, -10, 8.8, warmSandMat],
    [15, -10, 8.8, warmSandMat],
    [-15, 13, 8.2, warmSandMat],
    [15, 13, 8.8, dustyBeigeMat],
    [-14, 23, 8.5, warmSandMat],
    [14, 23, 8.5, dustyBeigeMat]
  ];
  dirtPatches.forEach(([x, z, r, mat]) => {
    const patch = new THREE.Mesh(new THREE.CircleGeometry(r, 12), mat);
    patch.rotation.x = -Math.PI / 2;
    patch.position.set(x, 0.008, z);
    scene.add(patch);
  });

  const dryGrassMat = new THREE.MeshLambertMaterial({ color: 0x9b8b42 });
  const savannaMat = new THREE.MeshLambertMaterial({ color: 0xac9548 });
  const lawnGreenMat = new THREE.MeshLambertMaterial({ color: 0x668b38 });
  const grassZones = [
    [-7.8, -13.6, 3.6, lawnGreenMat],
    [7.8, -13.6, 3.6, lawnGreenMat],
    [-7.5, -21.5, 4.8, lawnGreenMat],
    [7.5, -21.5, 4.8, lawnGreenMat],
    [-23.5, -9.0, 5.2, dryGrassMat],
    [23.5, -9.0, 5.0, savannaMat],
    [-24.0, 12.0, 4.8, dryGrassMat],
    [24.0, 12.0, 4.8, dryGrassMat],
    [-9.2, 15.6, 3.2, lawnGreenMat],
    [9.2, 15.6, 3.2, lawnGreenMat],
    [-25.5, 22.8, 5.5, savannaMat],
    [25.5, 22.8, 5.5, dryGrassMat],
    [-8.8, 30.2, 4.0, lawnGreenMat],
    [8.8, 30.2, 4.0, dryGrassMat]
  ];
  grassZones.forEach(([x, z, r, mat]) => {
    const tuft = new THREE.Mesh(new THREE.CircleGeometry(r, 9), mat);
    tuft.rotation.x = -Math.PI / 2;
    tuft.position.set(x, 0.015, z);
    scene.add(tuft);
  });

  const sidewalkMat = new THREE.MeshLambertMaterial({
    color: SCENE_TEX.sidewalk ? 0xffffff : 0xd8b896,
    map: SCENE_TEX.sidewalk || null
  });
  const esplanadeMat = new THREE.MeshLambertMaterial({ color: 0xc9a380, map: SCENE_TEX.stucco || null });
  const paverMat = new THREE.MeshLambertMaterial({ color: 0xa69482, map: SCENE_TEX.stucco || null });

  [-1.7, 5.7].forEach(z => {
    const sw = new THREE.Mesh(new THREE.BoxGeometry(86, 0.12, 1.7), sidewalkMat);
    sw.position.set(0, 0.06, z);
    sw.receiveShadow = true;
    scene.add(sw);
  });

  [-3.7, 3.7].forEach(x => {
    const sw = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.12, 36), sidewalkMat);
    sw.position.set(x, 0.06, 10.5);
    sw.receiveShadow = true;
    scene.add(sw);
  });

  // Chaussée bitumée texturée légèrement satinée sous le soleil de fin d'après-midi
  const asphaltMat = typeof THREE.MeshStandardMaterial === 'function'
    ? new THREE.MeshStandardMaterial({
      color: SCENE_TEX.asphalt ? 0xffffff : 0x67625d,
      map: SCENE_TEX.asphalt || null,
      roughness: 0.58,
      metalness: 0.08
    })
    : new THREE.MeshLambertMaterial({ color: 0x67625d, map: SCENE_TEX.asphalt || null });

  const roadH = new THREE.Mesh(new THREE.BoxGeometry(86, 0.08, 5.8), asphaltMat);
  roadH.position.set(0, 0.04, 2);
  roadH.receiveShadow = true;
  scene.add(roadH);

  const roadV = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.08, 35), asphaltMat);
  roadV.position.set(0, 0.04, 10.5);
  roadV.receiveShadow = true;
  scene.add(roadV);

  // Lignes de rive jaune-crème inspirées du grand boulevard de la photo
  const edgeLineMat = new THREE.MeshBasicMaterial({ color: 0xf4dca4 });
  [-0.62, 4.62].forEach(z => {
    const edgeL = new THREE.Mesh(new THREE.BoxGeometry(31, 0.088, 0.12), edgeLineMat);
    edgeL.position.set(-24.5, 0.046, z);
    const edgeR = new THREE.Mesh(new THREE.BoxGeometry(31, 0.088, 0.12), edgeLineMat);
    edgeR.position.set(24.5, 0.046, z);
    scene.add(edgeL, edgeR);
  });

  const curbRedMat = new THREE.MeshLambertMaterial({ color: 0xc05e36 });
  const curbCreamMat = new THREE.MeshLambertMaterial({ color: 0xeae0ce });
  const curbGeoH = new THREE.BoxGeometry(1.4, 0.14, 0.22);
  const curbGeoV = new THREE.BoxGeometry(0.22, 0.14, 1.4);

  for (let x = -28; x <= 28; x += 2.8) {
    if (Math.abs(x) < 8.8) continue;
    const mat = Math.floor((x + 30) / 2.8) % 2 === 0 ? curbRedMat : curbCreamMat;
    const cTop = new THREE.Mesh(curbGeoH, mat);
    cTop.position.set(x, 0.08, -0.92);
    const cBot = new THREE.Mesh(curbGeoH, mat);
    cBot.position.set(x, 0.08, 4.92);
    scene.add(cTop, cBot);
  }
  for (let z = 11.4; z <= 25.4; z += 2.8) {
    const mat = Math.floor(z / 2.8) % 2 === 0 ? curbRedMat : curbCreamMat;
    const cL = new THREE.Mesh(curbGeoV, mat);
    cL.position.set(-2.92, 0.08, z);
    const cR = new THREE.Mesh(curbGeoV, mat);
    cR.position.set(2.92, 0.08, z);
    scene.add(cL, cR);
  }

  const stripeMat = new THREE.MeshBasicMaterial({ color: 0xf1ece2 });
  for (let x = -38; x <= 38; x += 4.5) {
    if (Math.abs(x) < 9.2) continue;
    const dash = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.09, 0.18), stripeMat);
    dash.position.set(x, 0.05, 2);
    scene.add(dash);
  }
  for (let z = 11.5; z <= 25; z += 4.0) {
    const dash = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.09, 2.0), stripeMat);
    dash.position.set(0, 0.05, z);
    scene.add(dash);
  }

  for (let s = -2.0; s <= 2.0; s += 0.8) {
    const zSouth = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.09, 1.35), stripeMat);
    zSouth.position.set(s, 0.05, 10.4);
    scene.add(zSouth);

    const zWest = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.09, 0.38), stripeMat);
    zWest.position.set(-9.2, 0.05, 2 + s);
    scene.add(zWest);

    const zEast = zWest.clone();
    zEast.position.x = 9.2;
    scene.add(zEast);
  }

  const plazaBase = new THREE.Mesh(
    new THREE.CylinderGeometry(8.2, 8.5, 0.14, 24),
    new THREE.MeshLambertMaterial({ color: 0xd6b08c })
  );
  plazaBase.position.set(0, 0.07, 2);
  scene.add(plazaBase);

  const plazaGreenRing = new THREE.Mesh(
    new THREE.RingGeometry(2.45, 3.65, 24),
    new THREE.MeshBasicMaterial({ color: 0x628935, side: THREE.DoubleSide })
  );
  plazaGreenRing.rotation.x = -Math.PI / 2;
  plazaGreenRing.position.set(0, 0.146, 2);
  scene.add(plazaGreenRing);

  const plazaBrickRing = new THREE.Mesh(
    new THREE.RingGeometry(5.8, 6.45, 24),
    new THREE.MeshBasicMaterial({ color: 0xb85e38, side: THREE.DoubleSide })
  );
  plazaBrickRing.rotation.x = -Math.PI / 2;
  plazaBrickRing.position.set(0, 0.145, 2);
  scene.add(plazaBrickRing);

  const northEsplanade = new THREE.Mesh(new THREE.BoxGeometry(11.4, 0.12, 11.4), paverMat);
  northEsplanade.position.set(0, 0.06, -10.2);
  scene.add(northEsplanade);

  const monumentWalk = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.12, 9.0), esplanadeMat);
  monumentWalk.position.set(0, 0.06, -18.8);
  scene.add(monumentWalk);

  const marketPaving = new THREE.Mesh(new THREE.BoxGeometry(10.0, 0.1, 7.2), paverMat);
  marketPaving.position.set(15.5, 0.05, 11.4);
  scene.add(marketPaving);

  const southEsplanade = new THREE.Mesh(new THREE.BoxGeometry(10.8, 0.12, 9.0), esplanadeMat);
  southEsplanade.position.set(0, 0.06, 29.4);
  scene.add(southEsplanade);
}

function createStarShape(outerR, innerR, points = 5) {
  const shape = new THREE.Shape();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = (i * Math.PI) / points + Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

function buildBurkinaFlagMonument() {
  const monument = new THREE.Group();
  monument.position.set(0, 0, 2);

  const step1 = new THREE.Mesh(
    new THREE.CylinderGeometry(2.25, 2.45, 0.28, 12),
    new THREE.MeshLambertMaterial({ color: 0xe3d4bc })
  );
  step1.position.y = 0.22;
  monument.add(step1);

  const step2 = new THREE.Mesh(
    new THREE.CylinderGeometry(1.3, 1.5, 0.46, 12),
    new THREE.MeshLambertMaterial({ color: 0xb85e38 })
  );
  step2.position.y = 0.56;
  monument.add(step2);

  const goldRing = new THREE.Mesh(
    new THREE.CylinderGeometry(1.35, 1.35, 0.09, 12),
    new THREE.MeshLambertMaterial({ color: 0xfcd116 })
  );
  goldRing.position.y = 0.79;
  monument.add(goldRing);

  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.075, 0.105, 7.8, 8),
    new THREE.MeshLambertMaterial({ color: 0xf1f5f9 })
  );
  pole.position.y = 4.68;
  monument.add(pole);

  const finial = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 8, 8),
    new THREE.MeshLambertMaterial({ color: 0xfcd116 })
  );
  finial.position.y = 8.65;
  monument.add(finial);

  burkinaFlagPivot = new THREE.Group();
  burkinaFlagPivot.position.set(0.06, 7.45, 0);

  const flagW = 2.8;
  const flagHalfH = 0.92;
  const flagThickness = 0.05;

  const redTop = new THREE.Mesh(
    new THREE.BoxGeometry(flagW, flagHalfH, flagThickness),
    new THREE.MeshLambertMaterial({ color: 0xef2b2d })
  );
  redTop.position.set(flagW / 2, flagHalfH / 2, 0);
  burkinaFlagPivot.add(redTop);

  const greenBottom = new THREE.Mesh(
    new THREE.BoxGeometry(flagW, flagHalfH, flagThickness),
    new THREE.MeshLambertMaterial({ color: 0x009e49 })
  );
  greenBottom.position.set(flagW / 2, -flagHalfH / 2, 0);
  burkinaFlagPivot.add(greenBottom);

  const starGeom = new THREE.ExtrudeGeometry(createStarShape(0.40, 0.16, 5), {
    depth: 0.09,
    bevelEnabled: false
  });
  const starMesh = new THREE.Mesh(
    starGeom,
    new THREE.MeshBasicMaterial({ color: 0xfcd116 })
  );
  starMesh.position.set(flagW / 2, 0, -0.045);
  burkinaFlagPivot.add(starMesh);

  monument.add(burkinaFlagPivot);
  scene.add(monument);
  addCircleCollider(0, 2, 2.55, 'monument');
}

function buildMonumentDesMartyrs() {
  const m = new THREE.Group();
  m.position.set(0, 0, -23.5);

  const creamMat = new THREE.MeshLambertMaterial({ color: 0xeae0cc });
  const ochreMat = new THREE.MeshLambertMaterial({ color: 0xd9933c });
  const greenMat = new THREE.MeshLambertMaterial({ color: 0x2d6e3e });
  const darkWinMat = new THREE.MeshLambertMaterial({ color: 0x252a30 });
  const flameRedMat = new THREE.MeshLambertMaterial({ color: 0xd93829 });
  const lawnMat = new THREE.MeshLambertMaterial({ color: 0x658a36 });
  const terraceMat = new THREE.MeshLambertMaterial({ color: 0xc98c63 });

  const terrace = new THREE.Mesh(new THREE.CylinderGeometry(8.8, 9.2, 0.24, 16), terraceMat);
  terrace.position.y = 0.12;
  m.add(terrace);

  const lawn = new THREE.Mesh(new THREE.CylinderGeometry(7.2, 7.4, 0.28, 16), lawnMat);
  lawn.position.y = 0.16;
  m.add(lawn);

  const innerDome = new THREE.Mesh(
    new THREE.SphereGeometry(2.35, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
    ochreMat
  );
  innerDome.scale.set(1, 0.92, 1);
  innerDome.position.y = 0.3;
  m.add(innerDome);

  const domeBand = new THREE.Mesh(new THREE.CylinderGeometry(1.95, 2.08, 0.34, 12), darkWinMat);
  domeBand.position.y = 1.45;
  m.add(domeBand);

  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    const legGroup = new THREE.Group();
    legGroup.rotation.y = angle;

    const leg = new THREE.Mesh(new THREE.BoxGeometry(1.45, 7.6, 1.15), creamMat);
    leg.position.set(0, 3.3, 4.1);
    leg.rotation.x = -0.52;
    legGroup.add(leg);

    const greenRidge = new THREE.Mesh(new THREE.BoxGeometry(0.42, 7.7, 0.25), greenMat);
    greenRidge.position.set(0, 3.4, 4.65);
    greenRidge.rotation.x = -0.52;
    legGroup.add(greenRidge);

    m.add(legGroup);
  }

  const obsRing = new THREE.Mesh(new THREE.CylinderGeometry(3.75, 3.55, 1.55, 18), ochreMat);
  obsRing.position.y = 6.7;
  m.add(obsRing);

  const obsGlass = new THREE.Mesh(new THREE.CylinderGeometry(3.8, 3.74, 0.42, 18), darkWinMat);
  obsGlass.position.y = 6.75;
  m.add(obsGlass);

  const upperShaft = new THREE.Mesh(new THREE.CylinderGeometry(1.85, 2.35, 4.6, 12), creamMat);
  upperShaft.position.y = 9.7;
  m.add(upperShaft);

  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    const finGroup = new THREE.Group();
    finGroup.rotation.y = angle;

    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.75, 4.8, 0.9), greenMat);
    fin.position.set(0, 9.8, 1.85);
    fin.rotation.x = 0.14;
    finGroup.add(fin);

    const petal = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.4, 1.15), creamMat);
    petal.position.set(0, 12.15, 2.05);
    petal.rotation.x = 0.48;
    finGroup.add(petal);

    m.add(finGroup);
  }

  const crownCap = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.3, 0.95, 12), ochreMat);
  crownCap.position.y = 12.25;
  m.add(crownCap);

  const cupola = new THREE.Mesh(
    new THREE.SphereGeometry(1.25, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2),
    greenMat
  );
  cupola.position.y = 12.7;
  m.add(cupola);

  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.32, 1.15, 7), flameRedMat);
  flame.position.y = 14.35;
  m.add(flame);

  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, 1.4, 5), creamMat);
  spire.position.y = 15.1;
  m.add(spire);

  const lampPoleMat = new THREE.MeshLambertMaterial({ color: 0x9aa3ab });
  const lampHeadMat = new THREE.MeshLambertMaterial({ color: 0xc2904a });
  [[-5.8, 6.2], [5.8, 6.2], [-7.2, 2.2], [7.2, 2.2]].forEach(([lx, lz]) => {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 4.4, 6), lampPoleMat);
    p.position.set(lx, 2.2, lz);
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.12, 0.36, 7), lampHeadMat);
    head.position.set(lx, 4.5, lz);
    m.add(p, head);
  });

  // Colonnes jumelles aux poings levés + étoile dorée (inspirées directement de la photo du Monument des Martyrs)
  const stoneMat = new THREE.MeshLambertMaterial({ color: 0xd6cfc0, map: SCENE_TEX.stucco || null });
  const bronzeGoldMat = new THREE.MeshLambertMaterial({ color: 0xd9a126 });

  [[-1.35, 5.2, 6.2], [1.35, 5.2, 5.3]].forEach(([px, pz, ph]) => {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(1.45, ph, 0.95), stoneMat);
    pillar.position.set(px, ph / 2 + 0.2, pz);
    pillar.castShadow = true;
    m.add(pillar);

    // Corniche supérieure + poing levé stylisé low-poly
    const collar = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.22, 1.1), bronzeGoldMat);
    collar.position.set(px, ph + 0.22, pz);
    const fistBase = new THREE.Mesh(new THREE.BoxGeometry(1.52, 1.15, 1.02), stoneMat);
    fistBase.position.set(px, ph + 0.92, pz);
    const thumb = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.34, 0.36), stoneMat);
    thumb.position.set(px, ph + 0.72, pz + 0.45);
    m.add(collar, fistBase, thumb);
  });

  // Grande étoile dorée à 5 branches entre les deux colonnes (comme sur la photo)
  const monumentStarGeom = new THREE.ExtrudeGeometry(createStarShape(0.85, 0.34, 5), {
    depth: 0.18,
    bevelEnabled: false
  });
  const monumentStar = new THREE.Mesh(monumentStarGeom, bronzeGoldMat);
  monumentStar.position.set(0.05, 3.65, 5.72);
  m.add(monumentStar);

  scene.add(m);
  addCircleCollider(0, -23.5, 9.1, 'monument');
}

function createMangoTree(scale = 1) {
  const tree = new THREE.Group();
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(2.35, 10),
    new THREE.MeshBasicMaterial({ color: 0x452613, transparent: true, opacity: 0.22 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.025;
  tree.add(shadow);

  const barkMat = new THREE.MeshLambertMaterial({ color: 0x624028 });
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.38, 2.25, 7), barkMat);
  trunk.position.y = 1.12;
  tree.add(trunk);

  const leafMats = [
    new THREE.MeshLambertMaterial({ color: 0x2b5c27 }),
    new THREE.MeshLambertMaterial({ color: 0x396e2f }),
    new THREE.MeshLambertMaterial({ color: 0x4b8036 })
  ];
  const crownSpecs = [
    [0, 3.25, 0, 1.55, 1.22, 1.55, 0],
    [-1.05, 2.85, 0.5, 1.1, 0.92, 1.1, 1],
    [1.05, 2.9, -0.45, 1.12, 0.92, 1.12, 1],
    [0.15, 2.95, 0.95, 1.0, 0.85, 1.0, 2],
    [-0.2, 3.85, -0.25, 1.05, 0.8, 1.05, 2]
  ];
  crownSpecs.forEach(([x, y, z, sx, sy, sz, mIdx]) => {
    const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 1), leafMats[mIdx]);
    puff.scale.set(sx, sy, sz);
    puff.position.set(x, y, z);
    tree.add(puff);
  });

  const mangoMat = new THREE.MeshLambertMaterial({ color: 0xe6951a });
  [[-0.8, 2.35, 0.7], [0.95, 2.4, 0.4], [0.2, 2.3, -0.95], [-0.4, 2.55, -0.8]].forEach(([mx, my, mz]) => {
    const mango = new THREE.Mesh(new THREE.IcosahedronGeometry(0.14, 0), mangoMat);
    mango.position.set(mx, my, mz);
    tree.add(mango);
  });

  tree.scale.setScalar(scale);
  return tree;
}

function createBaobabTree(scale = 1) {
  const tree = new THREE.Group();
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(3.2, 10),
    new THREE.MeshBasicMaterial({ color: 0x452613, transparent: true, opacity: 0.22 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.025;
  tree.add(shadow);

  const barkMat = new THREE.MeshLambertMaterial({ color: 0x7b6352 });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.02, 1.35, 0.8, 8), barkMat);
  base.position.y = 0.4;
  tree.add(base);

  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 1.05, 3.5, 8), barkMat);
  trunk.position.y = 2.45;
  tree.add(trunk);

  const leafMat1 = new THREE.MeshLambertMaterial({ color: 0x486e31 });
  const leafMat2 = new THREE.MeshLambertMaterial({ color: 0x5c803b });

  const branchAngles = [0, 1.25, 2.5, 3.75, 5.0];
  branchAngles.forEach((angle, i) => {
    const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.26, 2.0, 6), barkMat);
    const bx = Math.cos(angle) * 0.85;
    const bz = Math.sin(angle) * 0.85;
    branch.position.set(bx, 4.45, bz);
    branch.rotation.z = -Math.cos(angle) * 0.65;
    branch.rotation.x = Math.sin(angle) * 0.65;
    tree.add(branch);

    const cluster = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.05, 1),
      i % 2 === 0 ? leafMat1 : leafMat2
    );
    cluster.scale.set(1.35, 0.55, 1.35);
    cluster.position.set(Math.cos(angle) * 1.65, 5.25 + (i % 2) * 0.25, Math.sin(angle) * 1.65);
    tree.add(cluster);
  });

  const topCluster = new THREE.Mesh(new THREE.IcosahedronGeometry(1.15, 1), leafMat2);
  topCluster.scale.set(1.4, 0.58, 1.4);
  topCluster.position.set(0, 5.6, 0);
  tree.add(topCluster);

  tree.scale.setScalar(scale);
  return tree;
}

function createSolarLamp(rotY = 0) {
  const lamp = new THREE.Group();
  const poleMat = new THREE.MeshLambertMaterial({ color: 0x7c8691 });
  const frameMat = new THREE.MeshLambertMaterial({ color: 0xdbe2e8 });
  const panelMat = new THREE.MeshLambertMaterial({ color: 0x1e40af });
  const bulbMat = new THREE.MeshBasicMaterial({ color: 0xfef3c7 });

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 0.36, 6), poleMat);
  base.position.y = 0.18;
  lamp.add(base);

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.085, 4.6, 6), poleMat);
  pole.position.y = 2.45;
  lamp.add(pole);

  const elbow = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.72), poleMat);
  elbow.position.set(0, 4.82, 0.32);
  elbow.rotation.x = -0.34;
  lamp.add(elbow);

  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.75), poleMat);
  arm.position.set(0, 4.94, 0.92);
  lamp.add(arm);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.1, 0.52), frameMat);
  head.position.set(0, 4.91, 1.24);
  lamp.add(head);

  const led = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.05, 0.38), bulbMat);
  led.position.set(0, 4.84, 1.24);
  lamp.add(led);

  // Lueur chaude de fin d'après-midi (sprite léger, zéro PointLight coûteuse)
  const lampHalo = createGlowSprite(1.85, 0.68);
  lampHalo.position.set(0, 4.74, 1.24);
  lamp.add(lampHalo);

  const solarFrame = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.06, 0.54), frameMat);
  solarFrame.position.set(0, 4.95, 0);
  solarFrame.rotation.x = 0.32;
  lamp.add(solarFrame);

  const solarPanel = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.07, 0.46), panelMat);
  solarPanel.position.set(0, 4.96, 0);
  solarPanel.rotation.x = 0.32;
  lamp.add(solarPanel);

  lamp.rotation.y = rotY;
  return lamp;
}

function createYStreetLamp(rotY = 0) {
  const lamp = new THREE.Group();
  const poleMat = new THREE.MeshLambertMaterial({ color: 0x9aa4ae });
  const headMat = new THREE.MeshLambertMaterial({ color: 0xe2e8f0 });
  const bulbMat = new THREE.MeshBasicMaterial({ color: 0xfef3c7 });

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 4.5, 6), poleMat);
  pole.position.y = 2.25;
  lamp.add(pole);

  [-1, 1].forEach(side => {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.07, 0.07), poleMat);
    arm.position.set(side * 0.48, 4.68, 0);
    arm.rotation.z = side * 0.42;
    lamp.add(arm);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.1, 0.24), headMat);
    head.position.set(side * 0.98, 4.92, 0);
    const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.05, 0.16), bulbMat);
    bulb.position.set(side * 0.98, 4.86, 0);
    const halo = createGlowSprite(1.65, 0.62);
    halo.position.set(side * 0.98, 4.78, 0);
    lamp.add(head, bulb, halo);
  });

  lamp.rotation.y = rotY;
  return lamp;
}

function createMotorbike(bodyColor = 0xb91c1c, rotY = 0) {
  const moto = new THREE.Group();
  const tireMat = new THREE.MeshLambertMaterial({ color: 0x1f242b });
  const bodyMat = new THREE.MeshLambertMaterial({ color: bodyColor });
  const chromeMat = new THREE.MeshLambertMaterial({ color: 0xcbd5e1 });

  const wheelGeo = new THREE.TorusGeometry(0.28, 0.08, 6, 10);
  const wFront = new THREE.Mesh(wheelGeo, tireMat);
  wFront.position.set(0.56, 0.32, 0);
  const wBack = new THREE.Mesh(wheelGeo, tireMat);
  wBack.position.set(-0.56, 0.32, 0);

  const frame = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.34, 0.32), bodyMat);
  frame.position.set(-0.04, 0.64, 0);

  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.14, 0.30), tireMat);
  seat.position.set(-0.22, 0.86, 0);

  const fork = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.65, 0.12), chromeMat);
  fork.position.set(0.45, 0.68, 0);
  fork.rotation.z = 0.28;

  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.62), chromeMat);
  handle.position.set(0.36, 0.98, 0);

  moto.add(wFront, wBack, frame, seat, fork, handle);
  moto.rotation.y = rotY;
  return moto;
}

function createTelecomTower() {
  const tower = new THREE.Group();
  const redMat = new THREE.MeshLambertMaterial({ color: 0xc23a2b });
  const whiteMat = new THREE.MeshLambertMaterial({ color: 0xeae5dc });
  const segments = 6;
  for (let i = 0; i < segments; i++) {
    const bottomR = 0.9 - i * 0.12;
    const topR = 0.78 - i * 0.12;
    const seg = new THREE.Mesh(
      new THREE.CylinderGeometry(topR, bottomR, 3.2, 4),
      i % 2 === 0 ? whiteMat : redMat
    );
    seg.position.y = 1.6 + i * 3.2;
    tower.add(seg);
  }
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.1, 3.0, 5), redMat);
  mast.position.y = segments * 3.2 + 1.5;
  tower.add(mast);
  return tower;
}

function createBoulevardGantry() {
  const gantry = new THREE.Group();
  const steelMat = new THREE.MeshLambertMaterial({ color: 0xc4cbd2 });
  const boardMat = new THREE.MeshLambertMaterial({ color: 0xd9dde2 });

  [-4.1, 4.1].forEach(pz => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.32, 5.4, 0.32), steelMat);
    post.position.set(0, 2.7, pz);
    gantry.add(post);
  });
  const beam = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.34, 8.8), steelMat);
  beam.position.set(0, 5.15, 0);
  gantry.add(beam);

  [-2.0, 2.0].forEach(bz => {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.15, 2.5), boardMat);
    panel.position.set(0, 5.45, bz);
    gantry.add(panel);
  });
  return gantry;
}

function createPublicBench(rotY = 0) {
  const bench = new THREE.Group();
  const woodMat = new THREE.MeshLambertMaterial({ color: 0x8f552b });
  const metalMat = new THREE.MeshLambertMaterial({ color: 0x3b424c });

  const seat = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.12, 0.56), woodMat);
  seat.position.y = 0.52;
  bench.add(seat);

  const back = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.44, 0.1), woodMat);
  back.position.set(0, 0.84, -0.24);
  back.rotation.x = -0.15;
  bench.add(back);

  [-0.78, 0.78].forEach(lx => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.52, 0.5), metalMat);
    leg.position.set(lx, 0.26, 0);
    bench.add(leg);
  });

  bench.rotation.y = rotY;
  return bench;
}

function buildEnvironmentDecor() {
  const mangoSpots = [
    [-7.8, -13.5, 0.95], [7.8, -13.5, 1.0],
    [-23.5, -8.8, 1.08], [23.5, -8.8, 1.05],
    [-23.8, 11.8, 1.0], [23.8, 11.8, 0.95],
    [-9.2, 15.6, 0.88], [9.2, 15.6, 0.88],
    [-8.8, 30.2, 1.05], [8.8, 30.2, 0.98],
    [-11.5, -21.5, 1.05], [11.5, -21.5, 1.02]
  ];
  mangoSpots.forEach(([x, z, s]) => {
    const tree = createMangoTree(s);
    tree.position.set(x, 0, z);
    scene.add(tree);
    addCircleCollider(x, z, 0.62 * s, 'tree');
  });

  const baobabSpots = [
    [-24.8, -17.5, 1.1], [24.8, -17.5, 1.05],
    [-25.5, 22.8, 1.15], [25.5, 22.8, 1.08],
    [-16.5, -26.5, 1.12], [16.5, -26.5, 1.1]
  ];
  baobabSpots.forEach(([x, z, s]) => {
    const baobab = createBaobabTree(s);
    baobab.position.set(x, 0, z);
    scene.add(baobab);
    addCircleCollider(x, z, 1.42 * s, 'baobab');
  });

  const yLampSpecs = [
    [-5.8, -3.5, 0.7], [5.8, -3.5, -0.7],
    [-5.8, 7.5, 2.4], [5.8, 7.5, -2.4]
  ];
  yLampSpecs.forEach(([x, z, r]) => {
    const lamp = createYStreetLamp(r);
    lamp.position.set(x, 0, z);
    scene.add(lamp);
    addCircleCollider(x, z, 0.34, 'lamp');
  });

  const lampSpecs = [
    [-19.5, -1.8, 0], [19.5, -1.8, 0],
    [-19.5, 5.8, Math.PI], [19.5, 5.8, Math.PI],
    [-4.2, 16.5, Math.PI / 2], [4.2, 16.5, -Math.PI / 2],
    [-4.2, 25.0, Math.PI / 2], [4.2, 25.0, -Math.PI / 2]
  ];
  lampSpecs.forEach(([x, z, r]) => {
    const lamp = createSolarLamp(r);
    lamp.position.set(x, 0, z);
    scene.add(lamp);
    addCircleCollider(x, z, 0.36, 'lamp');
  });

  const gantry = createBoulevardGantry();
  gantry.position.set(22.5, 0, 2);
  scene.add(gantry);
  addCircleCollider(22.5, 2 - 4.1, 0.44, 'gantry');
  addCircleCollider(22.5, 2 + 4.1, 0.44, 'gantry');

  const towerL = createTelecomTower();
  towerL.position.set(-12.5, 0, -37.5);
  const towerR = createTelecomTower();
  towerR.position.set(14.0, 0, -35.5);
  scene.add(towerL, towerR);
  addCircleCollider(-12.5, -37.5, 1.15, 'tower');
  addCircleCollider(14.0, -35.5, 1.15, 'tower');

  const benchSpecs = [
    [-5.8, 2.0, Math.PI / 2],
    [5.8, 2.0, -Math.PI / 2],
    [-4.0, -4.2, 0.55],
    [4.0, -4.2, -0.55],
    [-5.8, 15.5, Math.PI / 2],
    [5.8, 15.5, -Math.PI / 2]
  ];
  benchSpecs.forEach(([x, z, r]) => {
    const bench = createPublicBench(r);
    bench.position.set(x, 0, z);
    scene.add(bench);
    addBoxCollider(x, z, 1.05, 0.4, r, 'bench');
  });
}

/**
 * Personnages 3D arrondis et expressifs façon Duolingo (100% low-poly fluide)
 * Tête sphérique, corps stylisé en capsule/cylindre, yeux expressifs & sourire visible,
 * couleurs et accessoires cohérents avec chaque portrait 2D.
 */
function createCharacterMesh(locOrConfig, isPlayer = false) {
  const cfg = locOrConfig || {};
  const group = new THREE.Group();
  const isFemale = !isPlayer && cfg.gender === 'female';
  const skinColor = isPlayer ? 0x7a482b : (cfg.skinColor || 0x6e3f22);
  const shirtColor = isPlayer ? 0x58cc02 : (cfg.shirtColor || 0x1cb0f6);
  const trimColor = isPlayer ? 0xff9600 : (cfg.trimColor || 0xfcd116);
  const skirtColor = cfg.skirtColor || shirtColor;
  const headwrapColor = isPlayer ? null : (cfg.headwrapColor || null);
  const hairStyle = isPlayer ? 'short' : (cfg.hairStyle || (headwrapColor ? 'headwrap' : 'short'));
  const outfitStyle = isPlayer ? 'tunic' : (cfg.outfitStyle || (isFemale ? 'dress' : 'tunic'));
  const accessory = isPlayer ? 'none' : (cfg.accessory || 'none');

  const skinMat = createToonMaterial(skinColor);
  const shirtMat = createToonMaterial(shirtColor);
  const skirtMat = createToonMaterial(skirtColor);
  const trimMat = createToonMaterial(trimColor);
  const pantsMat = createToonMaterial(
    isPlayer ? 0x2b3a4a : (cfg.pantsColor || (isFemale ? 0x2c2430 : 0x334155))
  );
  const shoeMat = createToonMaterial(isPlayer ? 0xffffff : (isFemale ? 0x3a2018 : 0x1f2937));
  const hairMat = createToonMaterial(0x1a1715);
  const whiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x141414 });
  const mouthInsideMat = new THREE.MeshBasicMaterial({ color: 0x3a1216 });
  const lipMat = createToonMaterial(isFemale ? 0xb54454 : 0x9b3b3b);
  const blushMat = new THREE.MeshBasicMaterial({ color: 0xff8b8b, transparent: true, opacity: isFemale ? 0.50 : 0.36 });

  const markShadow = (mesh) => {
    mesh.castShadow = true;
    return mesh;
  };

  // Ombre douce au sol
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(isFemale ? 0.54 : 0.58, 12),
    new THREE.MeshBasicMaterial({ color: 0x3b1f0e, transparent: true, opacity: 0.22 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.03;
  group.add(shadow);

  // Jambes articulées (Hanche -> Cuisse -> Genou -> Mollet -> Chaussure)
  const hipX = isFemale ? 0.135 : 0.16;
  const thighRTop = isFemale ? 0.095 : 0.115;
  const thighRBot = isFemale ? 0.082 : 0.10;
  const shinRBot = isFemale ? 0.068 : 0.085;
  const legSkinMat = (isFemale && (outfitStyle === 'dress' || outfitStyle === 'pagne-skirt')) ? skinMat : pantsMat;

  const buildLeg = (xPos) => {
    const hipPivot = new THREE.Group();
    hipPivot.position.set(xPos, 0.72, 0);

    const thigh = markShadow(new THREE.Mesh(
      new THREE.CylinderGeometry(thighRTop, thighRBot, 0.34, 9),
      isFemale ? skirtMat : pantsMat
    ));
    thigh.position.y = -0.17;
    hipPivot.add(thigh);

    const kneePivot = new THREE.Group();
    kneePivot.position.set(0, -0.34, 0);
    hipPivot.add(kneePivot);

    const kneeCap = new THREE.Mesh(new THREE.SphereGeometry(thighRBot * 0.96, 8, 6), legSkinMat);
    kneePivot.add(kneeCap);

    const shin = markShadow(new THREE.Mesh(
      new THREE.CylinderGeometry(thighRBot * 0.9, shinRBot, 0.32, 9),
      legSkinMat
    ));
    shin.position.y = -0.16;
    kneePivot.add(shin);

    const shoe = markShadow(new THREE.Mesh(new THREE.SphereGeometry(isFemale ? 0.115 : 0.132, 9, 7), shoeMat));
    shoe.scale.set(0.92, 0.6, 1.35);
    shoe.position.set(0, -0.34, 0.04);
    kneePivot.add(shoe);

    return { hipPivot, kneePivot };
  };

  const leftLegBuilt = buildLeg(-hipX);
  const rightLegBuilt = buildLeg(hipX);
  const leftLeg = leftLegBuilt.hipPivot;
  const rightLeg = rightLegBuilt.hipPivot;
  const leftKnee = leftLegBuilt.kneePivot;
  const rightKnee = rightLegBuilt.kneePivot;
  group.add(leftLeg, rightLeg);

  // Pivot du haut du corps (respiration + balancement naturel)
  const bodyPivot = new THREE.Group();
  bodyPivot.position.y = 0.72;
  group.add(bodyPivot);

  const torsoGroup = new THREE.Group();
  bodyPivot.add(torsoGroup);

  let skirtMesh = null;

  if (isFemale) {
    // Silhouette féminine affinée : épaules douces, taille marquée, robe ou pagne Faso Dan Fani
    const upperBodice = markShadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.185, 0.42, 12),
      shirtMat
    ));
    upperBodice.position.y = 0.45;
    torsoGroup.add(upperBodice);
    addToonOutline(torsoGroup, upperBodice, 1.055);

    const shoulderCap = markShadow(new THREE.Mesh(new THREE.SphereGeometry(0.235, 10, 8), shirtMat));
    shoulderCap.scale.set(1.02, 0.5, 0.86);
    shoulderCap.position.y = 0.65;
    torsoGroup.add(shoulderCap);

    // Taille marquée + ceinture Faso Dan Fani
    const waist = markShadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.185, 0.25, 0.22, 12),
      shirtMat
    ));
    waist.position.y = 0.14;
    torsoGroup.add(waist);
    addToonOutline(torsoGroup, waist, 1.055);

    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.205, 0.215, 0.09, 12), trimMat);
    belt.position.y = 0.23;
    torsoGroup.add(belt);

    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.032, 6, 12), trimMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = 0.73;
    torsoGroup.add(collar);

    // Jupe / Pagne / Robe évasée inspirée du Faso Dan Fani
    const skirtHeight = outfitStyle === 'dress' ? 0.60 : 0.52;
    const skirtGroup = new THREE.Group();
    skirtGroup.position.y = 0.08;

    const skirtBody = markShadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.235, 0.39, skirtHeight, 12),
      outfitStyle === 'dress' ? shirtMat : skirtMat
    ));
    skirtBody.position.y = -skirtHeight / 2;
    skirtGroup.add(skirtBody);
    addToonOutline(skirtGroup, skirtBody, 1.05);

    // Bande tissée colorée en bas du pagne / robe
    const hemTrim = new THREE.Mesh(
      new THREE.CylinderGeometry(0.355, 0.395, 0.10, 12),
      trimMat
    );
    hemTrim.position.y = -skirtHeight + 0.07;
    skirtGroup.add(hemTrim);

    // Motif géométrique discret sur le pagne
    const midStripe = new THREE.Mesh(
      new THREE.CylinderGeometry(0.29, 0.325, 0.055, 12),
      trimMat
    );
    midStripe.position.y = -skirtHeight * 0.45;
    skirtGroup.add(midStripe);

    bodyPivot.add(skirtGroup);
    skirtMesh = skirtGroup;
  } else {
    // Silhouette masculine arrondie style animé / Duolingo
    const torsoCyl = markShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.275, 0.33, 0.68, 12), shirtMat));
    torsoCyl.position.y = 0.34;
    torsoGroup.add(torsoCyl);
    addToonOutline(torsoGroup, torsoCyl, 1.055);

    const torsoTop = markShadow(new THREE.Mesh(new THREE.SphereGeometry(0.275, 10, 8), shirtMat));
    torsoTop.scale.set(1, 0.54, 0.9);
    torsoTop.position.y = 0.66;
    torsoGroup.add(torsoTop);
    addToonOutline(torsoGroup, torsoTop, 1.055);

    const torsoBottom = new THREE.Mesh(new THREE.SphereGeometry(0.33, 10, 8), shirtMat);
    torsoBottom.scale.set(1, 0.38, 0.9);
    torsoBottom.position.y = 0.0;
    torsoGroup.add(torsoBottom);

    const trimBand = new THREE.Mesh(new THREE.CylinderGeometry(0.318, 0.335, 0.12, 12), trimMat);
    trimBand.position.y = 0.12;
    torsoGroup.add(trimBand);

    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.038, 6, 12), trimMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = 0.75;
    torsoGroup.add(collar);
  }

  // Bras articulés (Épaule -> Bras supérieur -> Coude -> Avant-bras -> Main)
  const shoulderX = isFemale ? 0.32 : 0.385;
  const upperArmR = isFemale ? 0.082 : 0.102;
  const foreArmR = isFemale ? 0.068 : 0.082;

  const buildArm = (xPos) => {
    const shoulderPivot = new THREE.Group();
    shoulderPivot.position.set(xPos, isFemale ? 0.61 : 0.63, 0);

    const shoulder = new THREE.Mesh(new THREE.SphereGeometry(upperArmR * 1.15, 8, 6), shirtMat);
    shoulderPivot.add(shoulder);

    const upperArm = markShadow(new THREE.Mesh(
      new THREE.CylinderGeometry(upperArmR, upperArmR * 0.9, 0.28, 8),
      shirtMat
    ));
    upperArm.position.y = -0.14;
    shoulderPivot.add(upperArm);

    const elbowPivot = new THREE.Group();
    elbowPivot.position.set(0, -0.28, 0);
    shoulderPivot.add(elbowPivot);

    const elbowJoint = new THREE.Mesh(new THREE.SphereGeometry(foreArmR * 1.02, 7, 6), skinMat);
    elbowPivot.add(elbowJoint);

    const forearm = markShadow(new THREE.Mesh(
      new THREE.CylinderGeometry(foreArmR, foreArmR * 0.88, 0.25, 8),
      skinMat
    ));
    forearm.position.y = -0.13;
    elbowPivot.add(forearm);

    const hand = new THREE.Mesh(new THREE.SphereGeometry(isFemale ? 0.078 : 0.09, 8, 6), skinMat);
    hand.position.y = -0.27;
    elbowPivot.add(hand);

    return { shoulderPivot, elbowPivot, hand };
  };

  const leftArmBuilt = buildArm(-shoulderX);
  const rightArmBuilt = buildArm(shoulderX);
  const leftArmPivot = leftArmBuilt.shoulderPivot;
  const rightArmPivot = rightArmBuilt.shoulderPivot;
  const leftElbow = leftArmBuilt.elbowPivot;
  const rightElbow = rightArmBuilt.elbowPivot;
  bodyPivot.add(leftArmPivot, rightArmPivot);

  // Cou + Tête sphérique chaleureuse avec contour animé net
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(isFemale ? 0.095 : 0.11, isFemale ? 0.11 : 0.13, 0.18, 9), skinMat);
  neck.position.y = isFemale ? 0.80 : 0.82;
  bodyPivot.add(neck);

  const headGroup = new THREE.Group();
  headGroup.position.y = isFemale ? 1.13 : 1.16;

  const headRadius = isFemale ? 0.335 : 0.355;
  const head = markShadow(new THREE.Mesh(new THREE.SphereGeometry(headRadius, 14, 12), skinMat));
  head.scale.set(isFemale ? 0.98 : 1.02, 1.0, 0.98);
  headGroup.add(head);
  addToonOutline(headGroup, head, 1.06);

  // Oreilles + boucles d'oreilles discrètes
  const earOffset = headRadius * 0.96;
  [-earOffset, earOffset].forEach(ex => {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.068, 7, 6), skinMat);
    ear.position.set(ex, -0.02, 0);
    headGroup.add(ear);

    if (accessory === 'earrings' || isFemale) {
      const hoop = new THREE.Mesh(
        new THREE.TorusGeometry(accessory === 'earrings' ? 0.048 : 0.032, 0.011, 6, 10),
        trimMat
      );
      hoop.position.set(ex * 1.05, -0.09, 0);
      headGroup.add(hoop);
    }
  });

  // Grands yeux style animé expressifs (pupilles + double reflet blanc + sourcils dynamiques)
  const eyeZ = headRadius * 0.86;
  const buildEye = (ex) => {
    const eyeGroup = new THREE.Group();
    eyeGroup.position.set(ex, 0.04, eyeZ);

    const sclera = new THREE.Mesh(new THREE.SphereGeometry(0.068, 10, 8), whiteMat);
    sclera.scale.set(1.02, 1.12, 0.55);
    eyeGroup.add(sclera);

    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.041, 8, 8), pupilMat);
    pupil.scale.set(1, 1.08, 0.6);
    pupil.position.set(0, 0, 0.034);
    eyeGroup.add(pupil);

    // Double reflet lumineux style animé
    const glint = new THREE.Mesh(new THREE.SphereGeometry(0.016, 6, 6), whiteMat);
    glint.position.set(0.016, 0.020, 0.058);
    eyeGroup.add(glint);

    const glintSecondary = new THREE.Mesh(new THREE.SphereGeometry(0.0085, 6, 5), whiteMat);
    glintSecondary.position.set(-0.015, -0.013, 0.056);
    eyeGroup.add(glintSecondary);

    if (isFemale) {
      const lash = new THREE.Mesh(new THREE.BoxGeometry(0.072, 0.017, 0.016), hairMat);
      lash.position.set(ex < 0 ? -0.047 : 0.047, 0.051, 0.030);
      lash.rotation.z = ex < 0 ? -0.35 : 0.35;
      eyeGroup.add(lash);
    }

    const baseBrowZ = ex < 0 ? 0.12 : -0.12;
    const brow = new THREE.Mesh(new THREE.BoxGeometry(isFemale ? 0.098 : 0.114, isFemale ? 0.019 : 0.025, 0.022), hairMat);
    brow.position.set(ex, 0.142, eyeZ + 0.012);
    brow.rotation.z = baseBrowZ;
    brow.userData = { baseY: 0.142, baseZ: baseBrowZ };
    headGroup.add(brow);

    return { eyeGroup, brow };
  };

  const leftEyeBuilt = buildEye(-0.118);
  const rightEyeBuilt = buildEye(0.118);
  const leftEyeGroup = leftEyeBuilt.eyeGroup;
  const rightEyeGroup = rightEyeBuilt.eyeGroup;
  const leftBrow = leftEyeBuilt.brow;
  const rightBrow = rightEyeBuilt.brow;
  headGroup.add(leftEyeGroup, rightEyeGroup);

  // Joues rosées subtiles
  [-0.18, 0.18].forEach(cx => {
    const cheek = new THREE.Mesh(new THREE.CircleGeometry(0.045, 8), blushMat);
    cheek.position.set(cx, -0.048, eyeZ + 0.008);
    cheek.rotation.y = cx < 0 ? -0.45 : 0.45;
    headGroup.add(cheek);
  });

  // Bouche au repos : sourire chaleureux
  const mouthClosed = new THREE.Mesh(new THREE.TorusGeometry(0.086, 0.02, 6, 10, Math.PI), whiteMat);
  mouthClosed.rotation.z = Math.PI;
  mouthClosed.position.set(0, -0.064, eyeZ + 0.016);
  headGroup.add(mouthClosed);

  // Bouche parlante animée (Lip-Sync)
  const mouthOpen = new THREE.Group();
  mouthOpen.position.set(0, -0.096, eyeZ + 0.016);
  mouthOpen.visible = false;

  const mouthCavity = new THREE.Mesh(new THREE.SphereGeometry(0.078, 10, 8), mouthInsideMat);
  mouthCavity.scale.set(1.1, 0.86, 0.45);
  mouthOpen.add(mouthCavity);

  const upperTeeth = new THREE.Mesh(new THREE.BoxGeometry(0.102, 0.024, 0.028), whiteMat);
  upperTeeth.position.set(0, 0.033, 0.024);
  mouthOpen.add(upperTeeth);

  const lowerLip = new THREE.Mesh(new THREE.TorusGeometry(0.074, 0.016, 6, 10, Math.PI), lipMat);
  lowerLip.rotation.z = Math.PI;
  lowerLip.position.set(0, -0.014, 0.022);
  mouthOpen.add(lowerLip);

  headGroup.add(mouthOpen);

  // Coiffures variées stylisées avec contours animés subtils
  if (hairStyle === 'bun') {
    const hairCap = new THREE.Mesh(
      new THREE.SphereGeometry(headRadius * 1.05, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.56),
      hairMat
    );
    hairCap.position.y = 0.04;
    headGroup.add(hairCap);
    addToonOutline(headGroup, hairCap, 1.05);

    // Chignon haut élégant + bandeau coloré
    const bun = markShadow(new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), hairMat));
    bun.position.set(0, headRadius + 0.09, -0.06);
    headGroup.add(bun);
    addToonOutline(headGroup, bun, 1.06);

    const bandMat = headwrapColor ? createToonMaterial(headwrapColor) : trimMat;
    const headband = new THREE.Mesh(new THREE.TorusGeometry(headRadius * 0.97, 0.036, 6, 14), bandMat);
    headband.rotation.x = Math.PI / 2 - 0.2;
    headband.position.y = 0.14;
    headGroup.add(headband);
  } else if (hairStyle === 'braids' || hairStyle === 'braids-wrap') {
    if (headwrapColor) {
      const wrapMat = createToonMaterial(headwrapColor);
      const wrapCrown = new THREE.Mesh(
        new THREE.SphereGeometry(headRadius * 1.08, 12, 9, 0, Math.PI * 2, 0, Math.PI * 0.54),
        wrapMat
      );
      wrapCrown.position.y = 0.06;
      headGroup.add(wrapCrown);
      addToonOutline(headGroup, wrapCrown, 1.055);

      const wrapBand = new THREE.Mesh(new THREE.TorusGeometry(headRadius * 0.99, 0.04, 6, 14), trimMat);
      wrapBand.rotation.x = Math.PI / 2 - 0.12;
      wrapBand.position.y = 0.13;
      headGroup.add(wrapBand);
    } else {
      const hairCap = new THREE.Mesh(
        new THREE.SphereGeometry(headRadius * 1.05, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55),
        hairMat
      );
      hairCap.position.y = 0.04;
      headGroup.add(hairCap);
      addToonOutline(headGroup, hairCap, 1.05);
    }

    // Tresses longues descendant sur les côtés et la nuque (low-poly)
    const braidSpecs = [
      [-0.27, -0.18, -0.05, 0.44],
      [0.27, -0.18, -0.05, 0.44],
      [-0.20, -0.22, -0.22, 0.48],
      [0.20, -0.22, -0.22, 0.48],
      [0, -0.24, -0.28, 0.50]
    ];
    braidSpecs.forEach(([bx, by, bz, len]) => {
      const braid = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.032, len, 6), hairMat);
      braid.position.set(bx, by, bz);
      headGroup.add(braid);

      const bead = new THREE.Mesh(new THREE.SphereGeometry(0.036, 6, 5), trimMat);
      bead.position.set(bx, by - len / 2 - 0.01, bz);
      headGroup.add(bead);
    });
  } else if (headwrapColor || hairStyle === 'headwrap') {
    const wrapMat = createToonMaterial(headwrapColor || 0xef4444);
    const wrapCrown = markShadow(new THREE.Mesh(
      new THREE.SphereGeometry(headRadius * 1.1, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.56),
      wrapMat
    ));
    wrapCrown.position.y = 0.06;
    headGroup.add(wrapCrown);
    addToonOutline(headGroup, wrapCrown, 1.055);

    const wrapBand = new THREE.Mesh(new THREE.TorusGeometry(headRadius * 1.01, 0.044, 6, 14), trimMat);
    wrapBand.rotation.x = Math.PI / 2 - 0.12;
    wrapBand.position.y = 0.14;
    headGroup.add(wrapBand);

    const wrapKnot = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8), wrapMat);
    wrapKnot.position.set(0.22, 0.30, 0.05);
    headGroup.add(wrapKnot);
    addToonOutline(headGroup, wrapKnot, 1.07);
  } else if (accessory === 'cap') {
    const capDome = new THREE.Mesh(
      new THREE.SphereGeometry(headRadius * 1.07, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.52),
      shirtMat
    );
    capDome.position.y = 0.05;
    headGroup.add(capDome);
    addToonOutline(headGroup, capDome, 1.055);

    const visor = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.04, 10, 1, false, -0.8, 1.6), trimMat);
    visor.position.set(0, 0.14, 0.24);
    visor.rotation.x = 0.15;
    headGroup.add(visor);
  } else {
    const hairCap = new THREE.Mesh(
      new THREE.SphereGeometry(headRadius * 1.05, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.52),
      hairMat
    );
    hairCap.position.y = 0.045;
    headGroup.add(hairCap);
    addToonOutline(headGroup, hairCap, 1.05);
  }

  if (accessory === 'beard') {
    const beardMesh = new THREE.Mesh(
      new THREE.SphereGeometry(headRadius * 0.95, 10, 8, 0, Math.PI * 2, Math.PI * 0.62, Math.PI * 0.36),
      hairMat
    );
    beardMesh.position.set(0, -0.02, 0.04);
    headGroup.add(beardMesh);
  }

  if (accessory === 'glasses') {
    const frameMat = createToonMaterial(0x1e293b);
    [-0.118, 0.118].forEach(gx => {
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.082, 0.014, 6, 12), frameMat);
      rim.position.set(gx, 0.04, eyeZ + 0.045);
      headGroup.add(rim);
    });
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.018, 0.018), frameMat);
    bridge.position.set(0, 0.05, eyeZ + 0.045);
    headGroup.add(bridge);
  }

  bodyPivot.add(headGroup);

  return {
    group,
    parts: {
      bodyPivot,
      torsoGroup,
      skirtMesh,
      leftLeg,
      rightLeg,
      leftKnee,
      rightKnee,
      leftArmPivot,
      rightArmPivot,
      leftElbow,
      rightElbow,
      leftHand: leftArmBuilt.hand,
      rightHand: rightArmBuilt.hand,
      head: headGroup,
      leftEyeGroup,
      rightEyeGroup,
      leftBrow,
      rightBrow,
      mouthClosed,
      mouthOpen
    }
  };
}

function createAnimState(phase = 0) {
  return {
    phase,
    nextBlinkAt: 2.0 + (phase * 1.37) % 3.2,
    blinkTimer: 0,
    mouthLevel: 0,
    walkCycle: phase
  };
}

/**
 * Contrôleur d'animation articulée réaliste (genoux, coudes, buste, tête, yeux, sourcils & bouche) :
 * Supporte : marche articulée, repos vivant, salut, parole (lip-sync), écoute,
 * lecture assise, smartphone assis/debout, cycliste qui pédale et motard.
 */
function updateCharacterAnimation(parts, anim, opts, elapsed, dt) {
  if (!parts || !anim) return;
  const {
    pose = 'default', // 'default' | 'sit-book' | 'sit-phone' | 'stand-phone' | 'cycle' | 'moto'
    isMoving = false,
    moveSpeed = 1,
    isSpeaking = false,
    isListening = false,
    isGreeting = false,
    headLookYaw = 0,
    pedalPhase = 0
  } = opts;

  const t = elapsed + anim.phase;
  const lerpK = Math.min(1, dt * 11);

  // 1. Respiration subtile & léger balancement naturel
  const breath = Math.sin(t * 2.1);
  parts.torsoGroup.scale.set(1 + breath * 0.017, 1 + breath * 0.022, 1 + breath * 0.017);

  // 2. Clignements d'yeux occasionnels
  anim.nextBlinkAt -= dt;
  if (anim.nextBlinkAt <= 0 && anim.blinkTimer <= 0) {
    anim.blinkTimer = 0.14;
    anim.nextBlinkAt = 2.6 + Math.random() * 3.4;
  }
  let eyeScaleY = 1;
  if (anim.blinkTimer > 0) {
    anim.blinkTimer = Math.max(0, anim.blinkTimer - dt);
    const p = anim.blinkTimer / 0.14;
    eyeScaleY = 0.12 + Math.abs(p - 0.5) * 1.76;
  }
  parts.leftEyeGroup.scale.y = eyeScaleY;
  parts.rightEyeGroup.scale.y = eyeScaleY;

  // 3. Angles cibles articulés (hanches, genoux, épaules, coudes, buste, tête)
  let targetLeftLegX = 0;
  let targetRightLegX = 0;
  let targetLeftKneeX = 0.06;
  let targetRightKneeX = 0.06;
  let targetLeftArmX = 0;
  let targetRightArmX = 0;
  let targetLeftArmZ = 0.08;
  let targetRightArmZ = -0.08;
  let targetLeftElbowX = -0.18;
  let targetRightElbowX = -0.18;
  let targetBodyY = 0.72 + breath * 0.012;
  let targetBodyPitch = 0;
  let targetBodySwayZ = isMoving ? 0 : Math.sin(t * 1.15) * 0.022;
  let targetHeadX = Math.sin(t * 1.3) * 0.025;
  let targetHeadY = headLookYaw;
  let targetHeadZ = Math.cos(t * 1.05) * 0.02;

  if (pose === 'sit-book') {
    targetLeftLegX = -1.45;
    targetRightLegX = -1.45;
    targetLeftKneeX = 1.48;
    targetRightKneeX = 1.48;
    targetBodyY = 0.56 + breath * 0.01;
    targetBodyPitch = 0.14;
    targetLeftArmX = -0.68;
    targetRightArmX = -0.68;
    targetLeftArmZ = -0.18;
    targetRightArmZ = 0.18;
    targetLeftElbowX = -0.92;
    targetRightElbowX = -0.92;
    targetHeadX = 0.34 + Math.sin(t * 1.1) * 0.04;
    targetHeadY = Math.sin(t * 0.85) * 0.16;
  } else if (pose === 'sit-phone') {
    targetLeftLegX = -1.42;
    targetRightLegX = -1.35;
    targetLeftKneeX = 1.46;
    targetRightKneeX = 1.38;
    targetBodyY = 0.56 + breath * 0.01;
    targetBodyPitch = 0.12;
    targetLeftArmX = -0.58;
    targetLeftArmZ = -0.18;
    targetLeftElbowX = -1.05;
    targetRightArmX = -0.56 + Math.sin(t * 3.4) * 0.05;
    targetRightArmZ = 0.22;
    targetRightElbowX = -1.08 + Math.sin(t * 4.2) * 0.09;
    targetHeadX = 0.36 + Math.sin(t * 1.5) * 0.035;
    targetHeadZ = Math.sin(t * 0.9) * 0.05;
  } else if (pose === 'stand-phone') {
    targetLeftLegX = -0.05;
    targetRightLegX = 0.05;
    targetLeftArmX = -0.52;
    targetLeftArmZ = -0.16;
    targetLeftElbowX = -1.12;
    targetRightArmX = -0.50 + Math.sin(t * 3.2) * 0.05;
    targetRightArmZ = 0.20;
    targetRightElbowX = -1.14 + Math.sin(t * 4.5) * 0.11;
    targetHeadX = 0.32 + Math.sin(t * 1.4) * 0.03;
    targetHeadZ = Math.sin(t * 0.8) * 0.04;
  } else if (pose === 'cycle') {
    // Jambes qui pédalent réellement en phase opposée
    const lPhase = pedalPhase;
    const rPhase = pedalPhase + Math.PI;
    targetLeftLegX = -0.82 - Math.sin(lPhase) * 0.42;
    targetRightLegX = -0.82 - Math.sin(rPhase) * 0.42;
    targetLeftKneeX = 0.92 + Math.cos(lPhase) * 0.46;
    targetRightKneeX = 0.92 + Math.cos(rPhase) * 0.46;
    targetBodyY = 0.66 + Math.sin(pedalPhase * 2) * 0.015;
    targetBodyPitch = 0.24;
    targetBodySwayZ = Math.sin(pedalPhase) * 0.04;
    targetLeftArmX = -0.95;
    targetRightArmX = -0.95;
    targetLeftArmZ = 0.06;
    targetRightArmZ = -0.06;
    targetLeftElbowX = -0.35;
    targetRightElbowX = -0.35;
    targetHeadX = -0.14;
  } else if (pose === 'moto') {
    targetLeftLegX = -1.12;
    targetRightLegX = -1.12;
    targetLeftKneeX = 1.25;
    targetRightKneeX = 1.25;
    targetBodyY = 0.64 + Math.sin(t * 18) * 0.008;
    targetBodyPitch = 0.18;
    targetBodySwayZ = 0;
    targetLeftArmX = -0.92;
    targetRightArmX = -0.92;
    targetLeftArmZ = 0.12;
    targetRightArmZ = -0.12;
    targetLeftElbowX = -0.38;
    targetRightElbowX = -0.38;
    targetHeadX = -0.10;
  } else if (isMoving) {
    // Marche articulée réaliste : genoux et coudes se plient naturellement
    anim.walkCycle += dt * (8.2 + moveSpeed * 3.4);
    const c = anim.walkCycle;
    const stride = Math.sin(c);
    targetLeftLegX = stride * 0.56;
    targetRightLegX = -stride * 0.56;
    // Genou se plie vers l'arrière quand la jambe avance/décolle du sol
    targetLeftKneeX = Math.max(0.06, (-Math.cos(c) * 0.5 + 0.42) * 0.78);
    targetRightKneeX = Math.max(0.06, (Math.cos(c) * 0.5 + 0.42) * 0.78);
    targetLeftArmX = -stride * 0.48;
    targetRightArmX = stride * 0.48;
    targetLeftElbowX = -0.26 - Math.max(0, stride) * 0.32;
    targetRightElbowX = -0.26 - Math.max(0, -stride) * 0.32;
    targetBodyY = 0.72 + Math.abs(Math.sin(c)) * 0.042;
    targetBodyPitch = 0.06;
    targetBodySwayZ = Math.sin(c) * 0.032;
    targetHeadZ = -Math.sin(c) * 0.025;
  } else if (isSpeaking) {
    // Gestes naturels de conversation avec coudes pliés
    targetLeftArmX = -0.45 + Math.sin(t * 4.8) * 0.18;
    targetRightArmX = -0.50 + Math.cos(t * 4.3 + 0.8) * 0.22;
    targetLeftArmZ = 0.22 + Math.sin(t * 3.2) * 0.10;
    targetRightArmZ = -0.22 - Math.cos(t * 3.6) * 0.10;
    targetLeftElbowX = -0.88 + Math.sin(t * 5.6) * 0.24;
    targetRightElbowX = -0.92 + Math.cos(t * 5.0) * 0.26;
    targetHeadX = Math.sin(t * 6.0) * 0.075;
    targetHeadZ = Math.sin(t * 3.0) * 0.065;
  } else if (isGreeting) {
    // Salut chaleureux avec coude plié naturel
    targetRightArmZ = -2.05 + Math.sin(elapsed * 8.0) * 0.28;
    targetRightArmX = -0.22;
    targetRightElbowX = -0.55 + Math.sin(elapsed * 8.0) * 0.18;
    targetLeftArmZ = 0.10;
    targetHeadZ = 0.08;
  } else if (isListening) {
    targetLeftArmX = -0.08 + Math.sin(t * 1.5) * 0.03;
    targetRightArmX = -0.08 - Math.sin(t * 1.5) * 0.03;
    targetLeftElbowX = -0.28;
    targetRightElbowX = -0.28;
    const nodPulse = Math.max(0, Math.sin(elapsed * 2.2));
    targetHeadX = Math.pow(nodPulse, 3) * 0.17;
    targetHeadZ = Math.sin(t * 1.4) * 0.04;
  } else {
    targetLeftArmX = Math.sin(t * 1.4) * 0.05;
    targetRightArmX = -Math.sin(t * 1.4) * 0.05;
    targetLeftElbowX = -0.18 - Math.sin(t * 1.4) * 0.04;
    targetRightElbowX = -0.18 + Math.sin(t * 1.4) * 0.04;
  }

  parts.leftLeg.rotation.x += (targetLeftLegX - parts.leftLeg.rotation.x) * lerpK;
  parts.rightLeg.rotation.x += (targetRightLegX - parts.rightLeg.rotation.x) * lerpK;
  if (parts.leftKnee) parts.leftKnee.rotation.x += (targetLeftKneeX - parts.leftKnee.rotation.x) * lerpK;
  if (parts.rightKnee) parts.rightKnee.rotation.x += (targetRightKneeX - parts.rightKnee.rotation.x) * lerpK;
  parts.leftArmPivot.rotation.x += (targetLeftArmX - parts.leftArmPivot.rotation.x) * lerpK;
  parts.rightArmPivot.rotation.x += (targetRightArmX - parts.rightArmPivot.rotation.x) * lerpK;
  parts.leftArmPivot.rotation.z += (targetLeftArmZ - parts.leftArmPivot.rotation.z) * lerpK;
  parts.rightArmPivot.rotation.z += (targetRightArmZ - parts.rightArmPivot.rotation.z) * lerpK;
  if (parts.leftElbow) parts.leftElbow.rotation.x += (targetLeftElbowX - parts.leftElbow.rotation.x) * lerpK;
  if (parts.rightElbow) parts.rightElbow.rotation.x += (targetRightElbowX - parts.rightElbow.rotation.x) * lerpK;

  parts.bodyPivot.position.y += (targetBodyY - parts.bodyPivot.position.y) * lerpK;
  parts.bodyPivot.rotation.x += (targetBodyPitch - parts.bodyPivot.rotation.x) * lerpK;
  parts.bodyPivot.rotation.z += (targetBodySwayZ - parts.bodyPivot.rotation.z) * lerpK;

  if (parts.skirtMesh) {
    const skirtLift = (pose === 'sit-book' || pose === 'sit-phone' || pose === 'cycle' || pose === 'moto') ? -0.42 : 0;
    parts.skirtMesh.rotation.x += (skirtLift - parts.skirtMesh.rotation.x) * lerpK;
  }

  parts.head.rotation.x += (targetHeadX - parts.head.rotation.x) * lerpK;
  parts.head.rotation.y += (targetHeadY - parts.head.rotation.y) * lerpK;
  parts.head.rotation.z += (targetHeadZ - parts.head.rotation.z) * lerpK;

  // 4. Bouche animée (Lip-Sync fluide pendant la parole, refermée dès la fin)
  let targetMouth = 0;
  if (isSpeaking) {
    const syllable =
      0.52 +
      0.28 * Math.sin(elapsed * 16.5) +
      0.20 * Math.sin(elapsed * 25.3 + 1.1) +
      0.12 * Math.cos(elapsed * 9.2);
    targetMouth = Math.max(0.18, Math.min(1.0, syllable));
  }
  anim.mouthLevel += (targetMouth - anim.mouthLevel) * Math.min(1, dt * 22);

  if (anim.mouthLevel > 0.07) {
    parts.mouthClosed.visible = false;
    parts.mouthOpen.visible = true;
    parts.mouthOpen.scale.set(
      0.88 + anim.mouthLevel * 0.24,
      0.32 + anim.mouthLevel * 0.92,
      1
    );
  } else {
    parts.mouthOpen.visible = false;
    parts.mouthClosed.visible = true;
  }

  // 5. Sourcils animés selon l'émotion (joyeux, concentré, attentif, neutre)
  if (parts.leftBrow && parts.rightBrow) {
    const lbBaseY = (parts.leftBrow.userData && parts.leftBrow.userData.baseY) || 0.142;
    const rbBaseY = (parts.rightBrow.userData && parts.rightBrow.userData.baseY) || 0.142;
    const lbBaseZ = (parts.leftBrow.userData && parts.leftBrow.userData.baseZ) || 0.12;
    const rbBaseZ = (parts.rightBrow.userData && parts.rightBrow.userData.baseZ) || -0.12;

    let browLift = breath * 0.002;
    let browTiltDelta = 0;

    if (isSpeaking) {
      // Expression vive et enjouée qui suit le rythme de la parole
      browLift = 0.017 + Math.sin(t * 5.6) * 0.007;
      browTiltDelta = 0.07;
    } else if (isGreeting) {
      // Sourcils relevés chaleureusement lors du salut
      browLift = 0.022 + Math.sin(elapsed * 6.0) * 0.004;
      browTiltDelta = 0.09;
    } else if (pose === 'sit-book' || pose === 'sit-phone' || pose === 'stand-phone' || pose === 'cycle' || pose === 'moto') {
      // Regard concentré (lecture, smartphone, conduite)
      browLift = -0.011;
      browTiltDelta = -0.11;
    } else if (isListening) {
      // Écoute attentive
      browLift = 0.009 + Math.max(0, Math.sin(elapsed * 2.2)) * 0.005;
      browTiltDelta = 0.03;
    }

    const targetLeftY = lbBaseY + browLift;
    const targetRightY = rbBaseY + browLift;
    const targetLeftZ = lbBaseZ + browTiltDelta;
    const targetRightZ = rbBaseZ - browTiltDelta;

    parts.leftBrow.position.y += (targetLeftY - parts.leftBrow.position.y) * lerpK;
    parts.rightBrow.position.y += (targetRightY - parts.rightBrow.position.y) * lerpK;
    parts.leftBrow.rotation.z += (targetLeftZ - parts.leftBrow.rotation.z) * lerpK;
    parts.rightBrow.rotation.z += (targetRightZ - parts.rightBrow.rotation.z) * lerpK;
  }
}

function createCorrugatedRoof(width, depth, color = 0x9aa3ab, slopeX = 0.16) {
  const roof = new THREE.Group();
  const baseMat = new THREE.MeshLambertMaterial({ color, map: SCENE_TEX.corrugated || null });
  const ribMat = new THREE.MeshLambertMaterial({ color: 0x7d8790 });
  const sheet = new THREE.Mesh(new THREE.BoxGeometry(width, 0.08, depth), baseMat);
  sheet.castShadow = true;
  roof.add(sheet);
  const ribs = Math.max(3, Math.floor(width / 0.85));
  for (let i = 0; i < ribs; i++) {
    const x = -width / 2 + 0.35 + (i * (width - 0.7)) / Math.max(1, ribs - 1);
    const rib = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, depth + 0.04), ribMat);
    rib.position.x = x;
    roof.add(rib);
  }
  roof.rotation.x = slopeX;
  return roof;
}

function createCurvedMarketTarp(width, depth, color = 0x1e4d7b) {
  const tarp = new THREE.Group();
  const mat = new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide });
  const dome = new THREE.Mesh(
    new THREE.CylinderGeometry(depth * 0.58, depth * 0.62, width, 8, 1, false, 0, Math.PI),
    mat
  );
  dome.rotation.z = Math.PI / 2;
  dome.scale.set(1, 0.65, 1);
  tarp.add(dome);
  return tarp;
}

function createShopSignboard(width, height, bgColor = 0xf4f1ea, borderColor = 0xc8372d, stripeColor = 0x1e4d7b) {
  const sign = new THREE.Group();
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(width + 0.14, height + 0.14, 0.12),
    new THREE.MeshLambertMaterial({ color: borderColor })
  );
  const face = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, 0.14),
    new THREE.MeshLambertMaterial({ color: bgColor })
  );
  const barTop = new THREE.Mesh(
    new THREE.BoxGeometry(width - 0.3, height * 0.24, 0.16),
    new THREE.MeshLambertMaterial({ color: stripeColor })
  );
  barTop.position.y = height * 0.16;
  const barBot = new THREE.Mesh(
    new THREE.BoxGeometry(width - 0.6, height * 0.14, 0.16),
    new THREE.MeshLambertMaterial({ color: borderColor })
  );
  barBot.position.y = -height * 0.18;
  sign.add(frame, face, barTop, barBot);
  return sign;
}

function createBuildingMesh(loc) {
  const b = new THREE.Group();
  const stuccoMap = SCENE_TEX.stucco || null;
  const windowMap = SCENE_TEX.window || null;
  const wallMat = new THREE.MeshLambertMaterial({ color: loc.wallColor || 0xd6965c, map: stuccoMap });
  const creamMat = new THREE.MeshLambertMaterial({ color: 0xeae0cc, map: stuccoMap });
  const terracottaMat = new THREE.MeshLambertMaterial({ color: 0xb05936, map: stuccoMap });
  const brickMat = new THREE.MeshLambertMaterial({ color: 0x9e5437, map: stuccoMap });
  const goldMat = new THREE.MeshLambertMaterial({ color: 0xfcd116 });
  const bfGreenMat = new THREE.MeshLambertMaterial({ color: 0x146334 });
  const bfRedMat = new THREE.MeshLambertMaterial({ color: 0xd62828 });
  const glassMat = new THREE.MeshLambertMaterial({ color: windowMap ? 0xffffff : 0x3b5064, map: windowMap });
  const doorMat = new THREE.MeshLambertMaterial({ color: 0x5c341d });
  const darkMat = new THREE.MeshLambertMaterial({ color: 0x2f353d });

  const markBldgShadow = (mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  };

  if (loc.buildingType === 'plaza') {
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.24, 5.2), creamMat);
    plinth.position.set(0, 0.12, -0.4);
    plinth.receiveShadow = true;
    b.add(plinth);

    [-3.4, -1.9, 1.9, 3.4].forEach(px => {
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.22, 0.56), creamMat);
      base.position.set(px, 0.24, 1.45);
      const col = markBldgShadow(new THREE.Mesh(new THREE.BoxGeometry(0.32, 2.05, 0.32), bfGreenMat));
      col.position.set(px, 1.32, 1.45);
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), goldMat);
      ball.position.set(px, 2.48, 1.45);
      b.add(base, col, ball);
    });

    [-2.65, 2.65].forEach(cx => {
      const chain = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.06, 0.06), creamMat);
      chain.position.set(cx, 1.35, 1.45);
      b.add(chain);
    });

    const wingRed = new THREE.Mesh(new THREE.BoxGeometry(3.55, 0.62, 0.14), bfRedMat);
    wingRed.position.set(0, 1.62, 1.45);
    const wingGreen = new THREE.Mesh(new THREE.BoxGeometry(3.55, 0.62, 0.14), bfGreenMat);
    wingGreen.position.set(0, 1.0, 1.45);
    const trimTop = new THREE.Mesh(new THREE.BoxGeometry(3.62, 0.08, 0.18), goldMat);
    trimTop.position.set(0, 1.96, 1.45);
    const trimBot = trimTop.clone();
    trimBot.position.y = 0.66;
    const medallion = new THREE.Mesh(new THREE.CylinderGeometry(0.76, 0.76, 0.22, 14), creamMat);
    medallion.rotation.x = Math.PI / 2;
    medallion.position.set(0, 1.32, 1.45);
    const shield = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.56, 0.26), bfRedMat);
    shield.position.set(0, 1.32, 1.45);
    const shieldBar = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.14, 0.29), creamMat);
    shieldBar.position.set(0, 1.34, 1.45);
    b.add(wingRed, wingGreen, trimTop, trimBot, medallion, shield, shieldBar);

    const plazaSign = createReadableSignboard('PLACE DE LA NATION', 'OUAGADOUGOU • UNIT 1', 3.4, 0.82, {
      bg: '#fffdf7',
      border: '#146334',
      header: '#d62828',
      text: '#1f2937'
    });
    plazaSign.position.set(0, 2.52, 1.46);
    b.add(plazaSign);

    const obBase = markBldgShadow(new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.65, 1.7), terracottaMat));
    obBase.position.set(0, 0.52, -1.35);
    const obColumn = markBldgShadow(new THREE.Mesh(new THREE.BoxGeometry(1.05, 4.4, 1.05), creamMat));
    obColumn.position.set(0, 3.0, -1.35);
    const obPlaque = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.12, 10), goldMat);
    obPlaque.rotation.x = Math.PI / 2;
    obPlaque.position.set(0, 3.85, -0.80);
    const obTorch = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, 0), terracottaMat);
    obTorch.scale.set(0.9, 1.35, 0.9);
    obTorch.position.set(0, 5.65, -1.35);
    b.add(obBase, obColumn, obPlaque, obTorch);

  } else if (loc.buildingType === 'busstop') {
    const platform = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.2, 3.2), creamMat);
    platform.position.y = 0.1;
    platform.receiveShadow = true;
    b.add(platform);

    const backWall = markBldgShadow(new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.5, 0.26), terracottaMat));
    backWall.position.set(0, 1.42, -1.1);
    b.add(backWall);

    [-2.6, 0, 2.6].forEach(px => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 2.85, 6), darkMat);
      post.position.set(px, 1.52, 1.0);
      b.add(post);
    });

    const roof = createCorrugatedRoof(6.4, 3.0, 0x9aa3ab, -0.1);
    roof.position.set(0, 2.98, 0);
    b.add(roof);

    const bench = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.35, 0.65), doorMat);
    bench.position.set(-0.3, 0.56, -0.5);
    b.add(bench);

    const billPostL = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 3.6, 6), darkMat);
    billPostL.position.set(3.4, 1.8, 0.4);
    const billBoard = createReadableSignboard('GARE ROUTIÈRE', 'DÉPARTS • UNIT 5', 2.65, 1.05, {
      bg: '#f4fbf6',
      border: '#eab308',
      header: '#146334',
      text: '#14532d'
    });
    billBoard.position.set(3.4, 3.35, 0.4);
    b.add(billPostL, billBoard);

    const bus = new THREE.Group();
    const busBody = markBldgShadow(new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.65, 1.7), new THREE.MeshLambertMaterial({ color: 0x0ea5e9 })));
    busBody.position.y = 1.12;
    const busRoof = new THREE.Mesh(new THREE.BoxGeometry(3.55, 0.14, 1.65), creamMat);
    busRoof.position.y = 1.98;
    const busStripe = new THREE.Mesh(new THREE.BoxGeometry(3.64, 0.22, 1.74), creamMat);
    busStripe.position.y = 0.85;
    const busWin = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.52, 1.74), glassMat);
    busWin.position.y = 1.48;
    bus.add(busBody, busRoof, busStripe, busWin);
    [[-1.1, 0.84], [1.1, 0.84], [-1.1, -0.84], [1.1, -0.84]].forEach(([wx, wz]) => {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.22, 8), darkMat);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(wx, 0.32, wz);
      bus.add(wheel);
    });
    bus.position.set(-4.9, 0, 0.6);
    b.add(bus);

  } else if (loc.buildingType === 'courtyard') {
    const house = markBldgShadow(new THREE.Mesh(new THREE.BoxGeometry(4.8, 2.95, 3.4), wallMat));
    house.position.set(0, 1.48, -1.2);
    b.add(house);

    const roof = createCorrugatedRoof(5.4, 4.1, 0x9fa7af, 0.12);
    roof.position.set(0, 3.16, -1.15);
    b.add(roof);

    const verandaRoof = createCorrugatedRoof(4.6, 1.65, 0xb05936, 0.18);
    verandaRoof.position.set(0, 2.38, 1.05);
    b.add(verandaRoof);

    const courtyardSign = createReadableSignboard('COUR FAMILIALE', 'QUARTIER • UNIT 6', 2.85, 0.72, {
      bg: '#fff8ee',
      border: '#b05936',
      header: '#d97706',
      text: '#451a03'
    });
    courtyardSign.position.set(0, 2.86, 1.84);
    b.add(courtyardSign);

    [-2.0, 2.0].forEach(px => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 2.25, 6), doorMat);
      post.position.set(px, 1.12, 1.7);
      b.add(post);
    });

    const door = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.85, 0.14), doorMat);
    door.position.set(0, 0.92, 0.52);
    b.add(door);

    [-1.5, 1.5].forEach(wx => {
      const win = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.85, 0.14), glassMat);
      win.position.set(wx, 1.65, 0.52);
      b.add(win);
    });

    const wallH = 1.15;
    const sideL = markBldgShadow(new THREE.Mesh(new THREE.BoxGeometry(0.26, wallH, 4.4), wallMat));
    sideL.position.set(-2.9, wallH / 2, 0.8);
    const sideR = sideL.clone();
    sideR.position.x = 2.9;
    const frontL = markBldgShadow(new THREE.Mesh(new THREE.BoxGeometry(1.85, wallH, 0.26), wallMat));
    frontL.position.set(-2.05, wallH / 2, 2.9);
    const frontR = frontL.clone();
    frontR.position.x = 2.05;
    const capL = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.1, 0.32), creamMat);
    capL.position.set(-2.05, wallH + 0.05, 2.9);
    const capR = capL.clone();
    capR.position.x = 2.05;
    b.add(sideL, sideR, frontL, frontR, capL, capR);

    const canari = new THREE.Mesh(new THREE.SphereGeometry(0.36, 8, 6), terracottaMat);
    canari.position.set(-1.85, 0.36, 1.55);
    b.add(canari);

    const bike = new THREE.Group();
    const wheelGeo = new THREE.TorusGeometry(0.32, 0.05, 6, 12);
    const w1 = new THREE.Mesh(wheelGeo, darkMat);
    w1.position.set(-0.52, 0.34, 0);
    const w2 = new THREE.Mesh(wheelGeo, darkMat);
    w2.position.set(0.52, 0.34, 0);
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.08, 0.08), bfRedMat);
    frame.position.set(0, 0.62, 0);
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.42), darkMat);
    handle.position.set(0.42, 0.82, 0);
    bike.add(w1, w2, frame, handle);
    bike.position.set(1.75, 0, 1.85);
    bike.rotation.y = -0.3;
    b.add(bike);

  } else if (loc.buildingType === 'market') {
    const h = 4.3;
    const w = 6.2;
    const d = 4.4;

    const groundFloor = markBldgShadow(new THREE.Mesh(new THREE.BoxGeometry(w, 2.3, d), creamMat));
    groundFloor.position.y = 1.15;
    const upperFacade = markBldgShadow(new THREE.Mesh(
      new THREE.BoxGeometry(w, 2.0, d),
      new THREE.MeshLambertMaterial({ color: 0xc8743e, map: stuccoMap })
    ));
    upperFacade.position.y = 3.3;
    b.add(groundFloor, upperFacade);

    const parapetStrip = new THREE.Mesh(new THREE.BoxGeometry(w - 0.5, 0.28, 0.14), goldMat);
    parapetStrip.position.set(0, 4.02, d / 2 + 0.06);
    const cornice = new THREE.Mesh(new THREE.BoxGeometry(w + 0.24, 0.22, d + 0.24), brickMat);
    cornice.position.y = h + 0.1;
    b.add(parapetStrip, cornice);

    const blueTarp = createCurvedMarketTarp(2.9, 1.45, 0x1e4d7b);
    blueTarp.position.set(-1.45, 2.32, d / 2 + 0.62);
    b.add(blueTarp);

    const creamTarp = createCorrugatedRoof(2.85, 1.55, 0xebe4d6, 0.26);
    creamTarp.position.set(1.52, 2.36, d / 2 + 0.72);
    const redTrim = new THREE.Mesh(new THREE.BoxGeometry(2.86, 0.14, 0.08), bfRedMat);
    redTrim.position.set(1.52, 2.15, d / 2 + 1.48);
    b.add(creamTarp, redTrim);

    const shopSign = createReadableSignboard('FASO DAN FANI', 'BOUTIQUE TISSUS • UNIT 4', 3.15, 0.86, {
      bg: '#fffdf7',
      border: '#c8372d',
      header: '#1e4d7b',
      text: '#1f2937'
    });
    shopSign.position.set(1.35, 3.05, d / 2 + 0.14);
    b.add(shopSign);

    const door = new THREE.Mesh(new THREE.BoxGeometry(1.25, 1.95, 0.15), darkMat);
    door.position.set(0, 0.98, d / 2 + 0.06);
    b.add(door);

    const fabricColors = [0xd62828, 0xfcd116, 0x146334, 0x1e4d7b, 0xc2410c];
    fabricColors.forEach((fc, i) => {
      const roll = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 1.1, 7),
        new THREE.MeshLambertMaterial({ color: fc, map: SCENE_TEX.fasoFabric || null })
      );
      roll.position.set(-2.35 + i * 0.45, 0.58, d / 2 + 0.72);
      b.add(roll);
    });

    const moto1 = createMotorbike(0xb91c1c, 0.65);
    moto1.position.set(-3.4, 0, d / 2 + 1.65);
    const moto2 = createMotorbike(0x1d4ed8, 0.5);
    moto2.position.set(-4.35, 0, d / 2 + 1.45);
    b.add(moto1, moto2);

    const signPost = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 2.6, 6), darkMat);
    signPost.position.set(3.5, 1.3, d / 2 + 1.2);
    const signRim = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.08, 12), bfRedMat);
    signRim.rotation.x = Math.PI / 2;
    signRim.position.set(3.5, 2.45, d / 2 + 1.2);
    const signCore = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.1, 12), new THREE.MeshLambertMaterial({ color: 0x1e4d7b }));
    signCore.rotation.x = Math.PI / 2;
    signCore.position.set(3.5, 2.45, d / 2 + 1.2);
    b.add(signPost, signRim, signCore);

  } else if (loc.buildingType === 'maquis') {
    const h = 3.5;
    const w = 5.8;
    const d = 4.2;

    const body = markBldgShadow(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), brickMat));
    body.position.y = h / 2;
    const cornice = new THREE.Mesh(new THREE.BoxGeometry(w + 0.26, 0.28, d + 0.26), creamMat);
    cornice.position.y = h + 0.14;
    b.add(body, cornice);

    const shade = createCorrugatedRoof(w + 0.4, 2.3, 0x9aa3ab, 0.14);
    shade.position.set(0, 2.55, d / 2 + 1.05);
    b.add(shade);

    [-2.5, 0, 2.5].forEach(px => {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 2.35, 6), doorMat);
      p.position.set(px, 1.18, d / 2 + 2.05);
      b.add(p);
    });

    const maquisSign = createReadableSignboard('MAQUIS LE FASO', 'GRILLADES & CAFÉ • UNIT 3', 3.3, 0.82, {
      bg: '#fffdf5',
      border: '#d62828',
      header: '#146334',
      text: '#14532d'
    });
    maquisSign.position.set(0, 3.28, d / 2 + 0.16);
    b.add(maquisSign);

    const door = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.95, 0.15), doorMat);
    door.position.set(0, 0.98, d / 2 + 0.06);
    b.add(door);

    [-1.8, 1.8].forEach(wx => {
      const win = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.95, 0.15), glassMat);
      win.position.set(wx, 1.55, d / 2 + 0.06);
      b.add(win);
    });

    [-1.4, 1.4].forEach(tx => {
      const tbl = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.08, 8), creamMat);
      tbl.position.set(tx, 0.74, d / 2 + 1.35);
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.74, 6), darkMat);
      leg.position.set(tx, 0.37, d / 2 + 1.35);
      b.add(tbl, leg);
    });

    const moto = createMotorbike(0x0f766e, -0.5);
    moto.position.set(3.45, 0, d / 2 + 1.2);
    b.add(moto);

  } else if (loc.buildingType === 'campus') {
    const h = 4.6;
    const w = 5.8;
    const d = 4.2;

    const body = markBldgShadow(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), terracottaMat));
    body.position.y = h / 2;
    b.add(body);

    [-2.6, -0.9, 0.9, 2.6].forEach(px => {
      const pilaster = new THREE.Mesh(new THREE.BoxGeometry(0.28, h, 0.22), creamMat);
      pilaster.position.set(px, h / 2, d / 2 + 0.08);
      b.add(pilaster);
    });
    [2.35, 4.45].forEach(ly => {
      const ledge = new THREE.Mesh(new THREE.BoxGeometry(w + 0.35, 0.22, d + 0.35), creamMat);
      ledge.position.y = ly;
      b.add(ledge);
    });

    const awning = createCurvedMarketTarp(3.2, 1.2, 0x1e4d7b);
    awning.position.set(0, 2.25, d / 2 + 0.55);
    b.add(awning);

    const campusSign = createReadableSignboard('LIBRAIRIE / CAMPUS', 'COURS & LIVRES • UNIT 2', 3.4, 0.82, {
      bg: '#fffdf7',
      border: '#1e4d7b',
      header: '#d97706',
      text: '#1e293b'
    });
    campusSign.position.set(0, h + 0.62, d / 2 - 0.12);
    b.add(campusSign);

    const door = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.95, 0.15), doorMat);
    door.position.set(0, 0.98, d / 2 + 0.06);
    b.add(door);

    [-1.75, 1.75].forEach(wx => {
      const win1 = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.95, 0.15), glassMat);
      win1.position.set(wx, 1.45, d / 2 + 0.06);
      const win2 = win1.clone();
      win2.position.y = 3.45;
      b.add(win1, win2);
    });
    const midWin = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.95, 0.15), glassMat);
    midWin.position.set(0, 3.45, d / 2 + 0.06);
    b.add(midWin);

  } else if (loc.buildingType === 'villa') {
    const h = 4.4;
    const w = 5.8;
    const d = 4.2;

    const body = markBldgShadow(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), creamMat));
    body.position.y = h / 2;
    const cornice = new THREE.Mesh(new THREE.BoxGeometry(w + 0.36, 0.34, d + 0.36), terracottaMat);
    cornice.position.y = h + 0.17;
    const accentBand = new THREE.Mesh(new THREE.BoxGeometry(w + 0.12, 0.3, d + 0.12), terracottaMat);
    accentBand.position.y = 2.42;
    b.add(body, cornice, accentBand);

    const villaSign = createReadableSignboard('VILLA OUAGA 2000', 'RÉSIDENCE • UNIT 7', 3.15, 0.78, {
      bg: '#fffdf7',
      border: '#b05936',
      header: '#1e4d7b',
      text: '#3b2618'
    });
    villaSign.position.set(0, h + 0.60, d / 2 - 0.1);
    b.add(villaSign);

    const balcony = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.16, 0.95), terracottaMat);
    balcony.position.set(0, 2.55, d / 2 + 0.45);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.55, 0.08), darkMat);
    rail.position.set(0, 2.9, d / 2 + 0.88);
    b.add(balcony, rail);

    const door = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.95, 0.15), doorMat);
    door.position.set(0, 0.98, d / 2 + 0.06);
    b.add(door);

    [-1.75, 1.75].forEach(wx => {
      const wLow = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.0, 0.15), glassMat);
      wLow.position.set(wx, 1.5, d / 2 + 0.06);
      const wHigh = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.9, 0.15), glassMat);
      wHigh.position.set(wx, 3.45, d / 2 + 0.06);
      b.add(wLow, wHigh);
    });
    const wMid = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 0.15), glassMat);
    wMid.position.set(0, 3.4, d / 2 + 0.06);
    b.add(wMid);

    const hedgeMat = new THREE.MeshLambertMaterial({ color: 0x4b772e });
    [-2.2, 2.2].forEach(hx => {
      const hedge = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.72, 0.45), hedgeMat);
      hedge.position.set(hx, 0.36, d / 2 + 1.15);
      b.add(hedge);
    });

  } else {
    const h = 5.0;
    const w = 6.2;
    const d = 4.4;

    const body = markBldgShadow(new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshLambertMaterial({ color: 0xd9a86c, map: stuccoMap })
    ));
    body.position.y = h / 2;
    const cornice = new THREE.Mesh(new THREE.BoxGeometry(w + 0.34, 0.36, d + 0.34), terracottaMat);
    cornice.position.y = h + 0.18;
    b.add(body, cornice);

    const sunshade = new THREE.Mesh(new THREE.BoxGeometry(w + 0.25, 0.2, 0.65), creamMat);
    sunshade.position.set(0, 2.65, d / 2 + 0.26);
    const awning = createCorrugatedRoof(w - 0.6, 1.25, 0x1d5f8a, 0.18);
    awning.position.set(0, 2.42, d / 2 + 0.62);
    b.add(sunshade, awning);

    const door = new THREE.Mesh(new THREE.BoxGeometry(1.25, 2.0, 0.15), darkMat);
    door.position.set(0, 1.0, d / 2 + 0.06);
    b.add(door);

    [-1.85, 1.85].forEach(wx => {
      const win = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.05, 0.15), glassMat);
      win.position.set(wx, 1.5, d / 2 + 0.06);
      b.add(win);
    });

    const bigWin = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.25, 0.15), glassMat);
    bigWin.position.set(0, 3.85, d / 2 + 0.06);
    b.add(bigWin);

    const techSign = createReadableSignboard('ATELIER TECH', 'BUREAU DIGITAL • UNIT 8', 3.3, 0.82, {
      bg: '#f5fbff',
      border: '#0e7490',
      header: '#1e40af',
      text: '#0f172a'
    });
    techSign.position.set(0, h + 0.66, d / 2 - 0.1);
    b.add(techSign);

    const solarMat = new THREE.MeshLambertMaterial({ color: 0x1e40af });
    [-1.45, 1.45].forEach(sx => {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.08, 1.3), solarMat);
      panel.position.set(sx, h + 0.65, -0.3);
      panel.rotation.x = 0.28;
      b.add(panel);
    });
  }

  return b;
}

function registerBuildingCollider(loc) {
  const bx = loc.buildingPos.x;
  const bz = loc.buildingPos.z;
  const rotY = loc.buildingRotY || 0;

  // Dimensions précises de chaque bâtiment + annexes (auvents, terrasses, murets, bus)
  if (loc.buildingType === 'plaza') {
    addBoxCollider(bx, bz - 0.3, 4.2, 2.75, rotY, 'building-plaza');
  } else if (loc.buildingType === 'busstop') {
    addBoxCollider(bx, bz, 3.35, 1.75, rotY, 'building-busstop');
    // Minibus garé à (-4.9, 0.6) en coordonnées locales du bâtiment
    const cos = Math.cos(rotY);
    const sin = Math.sin(rotY);
    const busWorldX = bx + (-4.9 * cos + 0.6 * sin);
    const busWorldZ = bz + (-4.9 * -sin + 0.6 * cos);
    addBoxCollider(busWorldX, busWorldZ, 1.95, 1.0, rotY, 'bus');
  } else if (loc.buildingType === 'courtyard') {
    addBoxCollider(bx, bz, 3.15, 3.15, rotY, 'building-courtyard');
  } else if (loc.buildingType === 'market') {
    addBoxCollider(bx, bz, 3.45, 2.75, rotY, 'building-market');
  } else if (loc.buildingType === 'maquis') {
    addBoxCollider(bx, bz, 3.15, 2.85, rotY, 'building-maquis');
  } else if (loc.buildingType === 'campus') {
    addBoxCollider(bx, bz, 3.05, 2.45, rotY, 'building-campus');
  } else if (loc.buildingType === 'villa') {
    addBoxCollider(bx, bz, 3.05, 2.65, rotY, 'building-villa');
  } else {
    addBoxCollider(bx, bz, 3.25, 2.55, rotY, 'building-tech');
  }
}

function buildAllLocationsAndNPCs() {
  const labelsLayer = document.getElementById('labels-layer');
  labelsLayer.innerHTML = '';

  NEIGHBORHOOD_DATA.forEach((loc, idx) => {
    const building = createBuildingMesh(loc);
    building.position.set(loc.buildingPos.x, 0, loc.buildingPos.z);
    building.rotation.y = loc.buildingRotY || 0;
    scene.add(building);
    registerBuildingCollider(loc);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.92, 1.28, 20),
      new THREE.MeshBasicMaterial({ color: loc.color, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(loc.pos.x, 0.09, loc.pos.z);
    scene.add(ring);

    const npc = createCharacterMesh(loc, false);
    npc.group.position.set(loc.pos.x, 0, loc.pos.z);
    npc.group.lookAt(0, 0, 2);
    const baseRotY = Math.atan2(0 - loc.pos.x, 2 - loc.pos.z);
    npc.group.rotation.set(0, baseRotY, 0);
    npc.group.userData = { npcId: loc.id };
    npc.group.traverse(obj => {
      if (obj.isMesh) {
        obj.userData = { npcId: loc.id };
        clickableMeshes.push(obj);
      }
    });
    scene.add(npc.group);
    addCircleCollider(loc.pos.x, loc.pos.z, NPC_RADIUS, 'npc', loc.id);

    const labelEl = document.createElement('button');
    labelEl.type = 'button';
    labelEl.className = 'npc-label';
    labelEl.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudioFX();
      walkToAndTalk(loc);
    });
    labelsLayer.appendChild(labelEl);

    const entity = {
      data: loc,
      group: npc.group,
      parts: npc.parts,
      anim: createAnimState(idx * 0.9),
      baseRotY,
      ring,
      labelEl,
      phase: idx * 0.9
    };
    renderNpcLabel(entity);
    npcEntities.push(entity);
  });
}

function renderNpcLabel(entity) {
  const loc = entity.data;
  const quizDone = state.completedQuizIds.has(loc.id);
  const visited = state.visitedIds.has(loc.id);

  entity.labelEl.className = 'npc-label' + (quizDone ? ' is-completed' : visited ? ' is-visited' : '');
  entity.labelEl.setAttribute('aria-label', `Parler à ${loc.npcName}, Unité ${loc.unit}, ${loc.placeName}`);

  const checkBadge = quizDone
    ? `<span class="npc-label-check" title="Unité validée">${UI_ICONS.check}</span>`
    : '';

  entity.labelEl.innerHTML = `
    <span class="npc-label-avatar">${getNpcPortraitSVG(loc.id)}</span>
    <span class="npc-label-text">
      <span class="npc-label-top">
        <span class="npc-unit-tag">U${loc.unit}</span>
        <span>${loc.npcName}</span>
        ${checkBadge}
      </span>
      <span class="npc-label-place">${loc.placeName}</span>
    </span>
  `;
}

function buildPlayerAvatar() {
  const player = createCharacterMesh({}, true);
  playerGroup = player.group;
  playerParts = player.parts;
  playerAnim = createAnimState(0.3);
  playerGroup.position.set(0, 0, 7.6);
  playerGroup.rotation.y = Math.PI;
  resolveCollisions(playerGroup.position, PLAYER_RADIUS, null);
  scene.add(playerGroup);
}

/* ===========================================================================
   7B. POPULATION VIVANTE (10 HABITANTS DE FOND ACTIFS & CRÉDIBLES)
   =========================================================================== */
function createOpenBookProp() {
  const book = new THREE.Group();
  const coverMat = new THREE.MeshLambertMaterial({ color: 0x1cb0f6 });
  const pageMat = new THREE.MeshLambertMaterial({ color: 0xfffcf5 });

  const leftPage = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.025, 0.28), pageMat);
  leftPage.position.set(-0.095, 0.015, 0);
  leftPage.rotation.z = -0.24;
  const rightPage = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.025, 0.28), pageMat);
  rightPage.position.set(0.095, 0.015, 0);
  rightPage.rotation.z = 0.24;

  const leftCover = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.015, 0.295), coverMat);
  leftCover.position.set(-0.095, 0, 0);
  leftCover.rotation.z = -0.24;
  const rightCover = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.015, 0.295), coverMat);
  rightCover.position.set(0.095, 0, 0);
  rightCover.rotation.z = 0.24;

  book.add(leftCover, rightCover, leftPage, rightPage);
  return book;
}

function createSmartphoneProp() {
  const phone = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.11, 0.19, 0.018),
    new THREE.MeshLambertMaterial({ color: 0x1e293b })
  );
  const screen = new THREE.Mesh(
    new THREE.BoxGeometry(0.092, 0.155, 0.02),
    new THREE.MeshBasicMaterial({ color: 0x7dd3fc })
  );
  screen.position.z = 0.002;
  // Discret halo lumineux d'écran
  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.14, 0.21),
    new THREE.MeshBasicMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.26, depthWrite: false, side: THREE.DoubleSide })
  );
  glow.position.z = 0.015;
  phone.add(body, screen, glow);
  return phone;
}

function buildBackgroundPopulation() {
  // 1) 5 piétons autonomes marchant sur les trottoirs sans jamais traverser d'obstacles
  const pedestrianSpecs = [
    {
      cfg: { gender: 'female', hairStyle: 'braids', outfitStyle: 'dress', shirtColor: 0xea580c, trimColor: 0xfcd116, skinColor: 0x734124 },
      waypoints: [[-17.8, -1.55], [-9.4, -1.55], [-9.4, -2.2], [-17.8, -2.2]],
      speed: 1.55,
      phase: 0.4
    },
    {
      cfg: { gender: 'male', hairStyle: 'short', outfitStyle: 'tunic', shirtColor: 0x2563eb, trimColor: 0xfef08a, skinColor: 0x5c3317 },
      waypoints: [[9.4, -1.55], [17.8, -1.55], [17.8, -2.2], [9.4, -2.2]],
      speed: 1.72,
      phase: 1.7
    },
    {
      cfg: { gender: 'female', hairStyle: 'bun', outfitStyle: 'pagne-skirt', shirtColor: 0x16a34a, skirtColor: 0x14532d, trimColor: 0xfcd116, skinColor: 0x7a482b },
      waypoints: [[-17.8, 5.55], [-9.4, 5.55], [-9.4, 6.2], [-17.8, 6.2]],
      speed: 1.48,
      phase: 2.9
    },
    {
      cfg: { gender: 'female', hairStyle: 'headwrap', outfitStyle: 'dress', shirtColor: 0xf43f5e, headwrapColor: 0xf59e0b, trimColor: 0xfef08a, skinColor: 0x6b3b20 },
      waypoints: [[9.4, 5.55], [17.8, 5.55], [17.8, 6.2], [9.4, 6.2]],
      speed: 1.62,
      phase: 4.1
    },
    {
      cfg: { gender: 'male', hairStyle: 'short', outfitStyle: 'tunic', shirtColor: 0xd97706, trimColor: 0xffffff, skinColor: 0x62371e },
      waypoints: [[-3.38, 11.2], [-3.38, 22.8], [-3.72, 22.8], [-3.72, 11.2]],
      speed: 1.65,
      phase: 5.3
    }
  ];

  pedestrianSpecs.forEach((spec, idx) => {
    const built = createCharacterMesh(spec.cfg, false);
    const startPt = spec.waypoints[0];
    built.group.position.set(startPt[0], 0, startPt[1]);
    scene.add(built.group);

    backgroundCitizens.push({
      id: `bg-ped-${idx}`,
      kind: 'pedestrian',
      group: built.group,
      parts: built.parts,
      anim: createAnimState(spec.phase),
      waypoints: spec.waypoints,
      wpIndex: 1,
      speed: spec.speed,
      waitTimer: 0
    });
  });

  // 2) Personne assise sur le banc Ouest de la place centrale en train de LIRE UN LIVRE OUVERT
  const reader = createCharacterMesh({
    gender: 'female',
    hairStyle: 'bun',
    outfitStyle: 'dress',
    shirtColor: 0x9333ea,
    headwrapColor: 0xfcd116,
    trimColor: 0xfde047,
    skinColor: 0x784629
  }, false);
  reader.group.position.set(-5.64, 0.14, 2.0);
  reader.group.rotation.y = Math.PI / 2;
  const openBook = createOpenBookProp();
  openBook.position.set(0, 0.36, 0.44);
  openBook.rotation.x = 0.42;
  reader.parts.bodyPivot.add(openBook);
  scene.add(reader.group);
  backgroundCitizens.push({
    id: 'bg-reader',
    kind: 'sit-book',
    group: reader.group,
    parts: reader.parts,
    anim: createAnimState(1.2)
  });

  // 3) Personne assise sur le banc Est de la place centrale manipulant un SMARTPHONE lumineux
  const benchPhoneUser = createCharacterMesh({
    gender: 'male',
    hairStyle: 'short',
    outfitStyle: 'tunic',
    shirtColor: 0x0284c7,
    trimColor: 0xfbbf24,
    skinColor: 0x61361c
  }, false);
  benchPhoneUser.group.position.set(5.64, 0.14, 2.0);
  benchPhoneUser.group.rotation.y = -Math.PI / 2;
  const phone1 = createSmartphoneProp();
  phone1.position.set(-0.04, 0.36, 0.40);
  phone1.rotation.set(-0.55, 0.15, 0);
  benchPhoneUser.parts.bodyPivot.add(phone1);
  scene.add(benchPhoneUser.group);
  backgroundCitizens.push({
    id: 'bg-sit-phone',
    kind: 'sit-phone',
    group: benchPhoneUser.group,
    parts: benchPhoneUser.parts,
    anim: createAnimState(2.6)
  });

  // 4) Personne debout sur le trottoir Est consultant son SMARTPHONE
  const standPhoneUser = createCharacterMesh({
    gender: 'female',
    hairStyle: 'braids',
    outfitStyle: 'pagne-skirt',
    shirtColor: 0xff9600,
    skirtColor: 0x9a3412,
    trimColor: 0xfef08a,
    skinColor: 0x7c4a2d
  }, false);
  standPhoneUser.group.position.set(3.55, 0, 12.2);
  standPhoneUser.group.rotation.y = -Math.PI / 2;
  const phone2 = createSmartphoneProp();
  phone2.position.set(-0.04, 0.34, 0.38);
  phone2.rotation.set(-0.48, 0.12, 0);
  standPhoneUser.parts.bodyPivot.add(phone2);
  scene.add(standPhoneUser.group);
  addCircleCollider(3.55, 12.2, 0.52, 'citizen');
  backgroundCitizens.push({
    id: 'bg-stand-phone',
    kind: 'stand-phone',
    group: standPhoneUser.group,
    parts: standPhoneUser.parts,
    anim: createAnimState(3.5)
  });

  // 5) Deux habitants près du Maquis Le Faso en train de DISCUTER ensemble (gestes & hochements alternés)
  const chatA = createCharacterMesh({
    gender: 'male',
    hairStyle: 'short',
    outfitStyle: 'tunic',
    shirtColor: 0x15803d,
    trimColor: 0xfcd116,
    skinColor: 0x5c3317
  }, false);
  chatA.group.position.set(-10.8, 0, -6.4);
  chatA.group.rotation.y = Math.PI / 2;
  scene.add(chatA.group);
  addCircleCollider(-10.8, -6.4, 0.52, 'citizen');

  const chatB = createCharacterMesh({
    gender: 'female',
    hairStyle: 'headwrap',
    outfitStyle: 'dress',
    shirtColor: 0xe11d48,
    headwrapColor: 0x1cb0f6,
    trimColor: 0xfcd116,
    skinColor: 0x734124
  }, false);
  chatB.group.position.set(-9.35, 0, -6.4);
  chatB.group.rotation.y = -Math.PI / 2;
  scene.add(chatB.group);
  addCircleCollider(-9.35, -6.4, 0.52, 'citizen');

  backgroundCitizens.push(
    { id: 'bg-chat-a', kind: 'chat', chatSlot: 0, group: chatA.group, parts: chatA.parts, anim: createAnimState(0.8) },
    { id: 'bg-chat-b', kind: 'chat', chatSlot: 1, group: chatB.group, parts: chatB.parts, anim: createAnimState(2.1) }
  );
}

function updateBackgroundPopulation(elapsed, dt) {
  const pPos = playerGroup ? playerGroup.position : null;

  backgroundCitizens.forEach(cit => {
    if (cit.kind === 'pedestrian') {
      const targetPt = cit.waypoints[cit.wpIndex];
      const dx = targetPt[0] - cit.group.position.x;
      const dz = targetPt[1] - cit.group.position.z;
      const distToWp = Math.hypot(dx, dz);

      // Éviter poliment le joueur s'il est juste devant
      let blockedByPlayer = false;
      let headYaw = 0;
      if (pPos) {
        const pdx = pPos.x - cit.group.position.x;
        const pdz = pPos.z - cit.group.position.z;
        const pDist = Math.hypot(pdx, pdz);
        if (pDist < 1.55) {
          blockedByPlayer = true;
          const toPlayer = Math.atan2(pdx, pdz);
          let diff = toPlayer - cit.group.rotation.y;
          while (diff > Math.PI) diff -= Math.PI * 2;
          while (diff < -Math.PI) diff += Math.PI * 2;
          headYaw = Math.max(-0.55, Math.min(0.55, diff));
        }
      }

      if (blockedByPlayer) {
        updateCharacterAnimation(cit.parts, cit.anim, {
          pose: 'default',
          isMoving: false,
          headLookYaw: headYaw
        }, elapsed, dt);
      } else if (distToWp < 0.25) {
        cit.wpIndex = (cit.wpIndex + 1) % cit.waypoints.length;
        updateCharacterAnimation(cit.parts, cit.anim, { pose: 'default', isMoving: true, moveSpeed: 0.6 }, elapsed, dt);
      } else {
        const step = Math.min(distToWp, cit.speed * dt);
        cit.group.position.x += (dx / distToWp) * step;
        cit.group.position.z += (dz / distToWp) * step;
        resolveCollisions(cit.group.position, 0.44, null);

        const desiredYaw = Math.atan2(dx, dz);
        cit.group.rotation.y = lerpAngle(cit.group.rotation.y, desiredYaw, Math.min(1, dt * 8));

        updateCharacterAnimation(cit.parts, cit.anim, {
          pose: 'default',
          isMoving: true,
          moveSpeed: cit.speed / 2.2
        }, elapsed, dt);
      }
    } else if (cit.kind === 'sit-book') {
      updateCharacterAnimation(cit.parts, cit.anim, { pose: 'sit-book' }, elapsed, dt);
    } else if (cit.kind === 'sit-phone') {
      updateCharacterAnimation(cit.parts, cit.anim, { pose: 'sit-phone' }, elapsed, dt);
    } else if (cit.kind === 'stand-phone') {
      updateCharacterAnimation(cit.parts, cit.anim, { pose: 'stand-phone' }, elapsed, dt);
    } else if (cit.kind === 'chat') {
      const turn = Math.floor(elapsed / 4.2) % 2;
      const isSpeaking = turn === cit.chatSlot;
      updateCharacterAnimation(cit.parts, cit.anim, {
        pose: 'default',
        isSpeaking,
        isListening: !isSpeaking
      }, elapsed, dt);
    }
  });
}

/* ===========================================================================
   7C. CIRCULATION ROUTIÈRE FLUIDE (2 MOTOS, 2 VÉLOS, 2 VOITURES SUR CHAUSSÉES)
   =========================================================================== */
function buildClosedRoadPath(points) {
  const segs = [];
  let totalLen = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (len > 0.001) {
      segs.push({ ax: a[0], az: a[1], bx: b[0], bz: b[1], len, start: totalLen });
      totalLen += len;
    }
  }
  return { segs, totalLen };
}

function sampleClosedRoadPath(pathData, dist) {
  const total = pathData.totalLen;
  let d = ((dist % total) + total) % total;
  for (let i = 0; i < pathData.segs.length; i++) {
    const s = pathData.segs[i];
    if (d <= s.start + s.len || i === pathData.segs.length - 1) {
      const u = Math.max(0, Math.min(1, (d - s.start) / s.len));
      const x = s.ax + (s.bx - s.ax) * u;
      const z = s.az + (s.bz - s.az) * u;
      const yaw = Math.atan2(s.bx - s.ax, s.bz - s.az);
      return { x, z, yaw };
    }
  }
  return { x: 0, z: 2, yaw: 0 };
}

function buildMainBoulevardCircuit() {
  const pts = [];
  const rRound = 4.68;
  // Voie Sud (direction Est) avant le rond-point
  pts.push([-32.5, 3.35], [-18.0, 3.35], [-6.5, 3.35]);
  // Contournement Sud du rond-point central (0, 2)
  for (let i = 0; i <= 8; i++) {
    const a = Math.PI - 0.30 - (i / 8) * (Math.PI - 0.60);
    pts.push([Math.cos(a) * rRound, 2.0 + Math.sin(a) * rRound]);
  }
  // Voie Sud (direction Est) après le rond-point
  pts.push([6.5, 3.35], [18.0, 3.35], [32.5, 3.35]);
  // Demi-tour doux hors zone Est
  for (let i = 1; i <= 5; i++) {
    const a = Math.PI / 2 - (i / 6) * Math.PI;
    pts.push([32.5 + Math.cos(a) * 1.35, 2.0 + Math.sin(a) * 1.35]);
  }
  // Voie Nord (direction Ouest) avant le rond-point
  pts.push([32.5, 0.65], [18.0, 0.65], [6.5, 0.65]);
  // Contournement Nord du rond-point central (0, 2)
  for (let i = 0; i <= 8; i++) {
    const a = -0.30 - (i / 8) * (Math.PI - 0.60);
    pts.push([Math.cos(a) * rRound, 2.0 + Math.sin(a) * rRound]);
  }
  // Voie Nord (direction Ouest) après le rond-point
  pts.push([-6.5, 0.65], [-18.0, 0.65], [-32.5, 0.65]);
  // Demi-tour doux hors zone Ouest
  for (let i = 1; i <= 5; i++) {
    const a = -Math.PI / 2 - (i / 6) * Math.PI;
    pts.push([-32.5 + Math.cos(a) * 1.35, 2.0 + Math.sin(a) * 1.35]);
  }
  return buildClosedRoadPath(pts);
}

function buildSouthAvenueCircuit() {
  const pts = [];
  // Voie Ouest vers le Sud
  pts.push([-1.45, 9.4], [-1.45, 16.0], [-1.45, 22.4]);
  // Demi-tour Sud sur la chaussée
  for (let i = 1; i <= 5; i++) {
    const a = Math.PI - (i / 6) * Math.PI;
    pts.push([Math.cos(a) * 1.45, 22.4 + Math.sin(a) * 1.45]);
  }
  // Voie Est vers le Nord
  pts.push([1.45, 22.4], [1.45, 16.0], [1.45, 9.4]);
  // Demi-tour Nord sur la chaussée
  for (let i = 1; i <= 5; i++) {
    const a = -(i / 6) * Math.PI;
    pts.push([Math.cos(a) * 1.45, 9.4 + Math.sin(a) * 1.45]);
  }
  return buildClosedRoadPath(pts);
}

function createStylizedCar(bodyColor = 0x16a34a, roofColor = 0xfefce8) {
  const car = new THREE.Group();
  const bodyMat = new THREE.MeshLambertMaterial({ color: bodyColor });
  const roofMat = new THREE.MeshLambertMaterial({ color: roofColor });
  const glassMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
  const tireMat = new THREE.MeshLambertMaterial({ color: 0x1e242b });
  const rimMat = new THREE.MeshLambertMaterial({ color: 0xdbe2e8 });
  const headMat = new THREE.MeshBasicMaterial({ color: 0xfff3b0 });
  const tailMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

  // Ombre douce au sol
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.85, 3.25),
    new THREE.MeshBasicMaterial({ color: 0x261810, transparent: true, opacity: 0.25 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.05;
  car.add(shadow);

  // Carrosserie orientée vers +Z (avant = +Z)
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.56, 2.86), bodyMat);
  chassis.position.y = 0.56;
  chassis.castShadow = true;
  car.add(chassis);

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.54, 1.50), roofMat);
  cabin.position.set(0, 1.06, -0.14);
  cabin.castShadow = true;
  car.add(cabin);

  const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.40, 1.54), glassMat);
  windshield.position.set(0, 1.04, -0.14);
  car.add(windshield);

  const sideWindows = new THREE.Mesh(new THREE.BoxGeometry(1.39, 0.36, 1.24), glassMat);
  sideWindows.position.set(0, 1.04, -0.14);
  car.add(sideWindows);

  // Phares avant (+Z) & feux arrière (-Z)
  [-0.50, 0.50].forEach(lx => {
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.14, 0.08), headMat);
    hl.position.set(lx, 0.58, 1.44);
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.14, 0.08), tailMat);
    tl.position.set(lx, 0.58, -1.44);
    car.add(hl, tl);
  });

  // 4 roues qui tournent réellement autour de X
  const wheels = [];
  const wheelCoords = [[-0.78, 0.30, 0.88], [0.78, 0.30, 0.88], [-0.78, 0.30, -0.88], [0.78, 0.30, -0.88]];
  wheelCoords.forEach(([wx, wy, wz]) => {
    const wPivot = new THREE.Group();
    wPivot.position.set(wx, wy, wz);
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.20, 10), tireMat);
    tire.rotation.z = Math.PI / 2;
    const rim = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.08), rimMat);
    wPivot.add(tire, rim);
    car.add(wPivot);
    wheels.push(wPivot);
  });

  return { group: car, wheels, rider: null };
}

function createTrafficMotorbike(bodyColor, riderCfg) {
  const moto = new THREE.Group();
  const tireMat = new THREE.MeshLambertMaterial({ color: 0x1f242b });
  const rimMat = new THREE.MeshLambertMaterial({ color: 0xcbd5e1 });
  const bodyMat = new THREE.MeshLambertMaterial({ color: bodyColor });
  const headMat = new THREE.MeshBasicMaterial({ color: 0xfff3b0 });
  const tailMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

  // Orientée vers +Z (avant = +Z)
  const wheels = [];
  [0.58, -0.58].forEach(wz => {
    const wPivot = new THREE.Group();
    wPivot.position.set(0, 0.31, wz);
    const tire = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.075, 6, 12), tireMat);
    tire.rotation.y = Math.PI / 2;
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.44, 0.05), rimMat);
    wPivot.add(tire, spoke);
    moto.add(wPivot);
    wheels.push(wPivot);
  });

  const frame = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 1.06), bodyMat);
  frame.position.set(0, 0.62, -0.02);
  frame.castShadow = true;
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.14, 0.62), tireMat);
  seat.position.set(0, 0.84, -0.20);
  const fork = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.64, 0.10), rimMat);
  fork.position.set(0, 0.68, 0.46);
  fork.rotation.x = -0.28;
  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.08, 0.08), rimMat);
  handle.position.set(0, 0.98, 0.36);

  const headlight = new THREE.Mesh(new THREE.SphereGeometry(0.10, 8, 6), headMat);
  headlight.position.set(0, 0.86, 0.56);
  const taillight = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.06), tailMat);
  taillight.position.set(0, 0.72, -0.58);
  moto.add(frame, seat, fork, handle, headlight, taillight);

  // Conducteur articulé assis sur la moto
  const rider = createCharacterMesh(riderCfg, false);
  rider.group.position.set(0, 0.28, -0.18);
  moto.add(rider.group);

  return { group: moto, wheels, rider: { parts: rider.parts, anim: createAnimState(1.1) } };
}

function createTrafficBicycle(frameColor, riderCfg) {
  const bike = new THREE.Group();
  const tireMat = new THREE.MeshLambertMaterial({ color: 0x1f242b });
  const rimMat = new THREE.MeshLambertMaterial({ color: 0xdbe2e8 });
  const frameMat = new THREE.MeshLambertMaterial({ color: frameColor });

  // Orienté vers +Z (avant = +Z)
  const wheels = [];
  [0.54, -0.54].forEach(wz => {
    const wPivot = new THREE.Group();
    wPivot.position.set(0, 0.32, wz);
    const tire = new THREE.Mesh(new THREE.TorusGeometry(0.30, 0.045, 6, 12), tireMat);
    tire.rotation.y = Math.PI / 2;
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.54, 0.03), rimMat);
    wPivot.add(tire, spoke);
    bike.add(wPivot);
    wheels.push(wPivot);
  });

  const topBar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.92), frameMat);
  topBar.position.set(0, 0.66, 0);
  const seatPost = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.44, 6), frameMat);
  seatPost.position.set(0, 0.62, -0.22);
  const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.07, 0.28), tireMat);
  saddle.position.set(0, 0.85, -0.24);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.54, 6), rimMat);
  stem.position.set(0, 0.68, 0.42);
  stem.rotation.x = -0.22;
  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.05, 0.05), tireMat);
  handle.position.set(0, 0.94, 0.34);
  bike.add(topBar, seatPost, saddle, stem, handle);

  // Cycliste articulé qui pédale réellement
  const rider = createCharacterMesh(riderCfg, false);
  rider.group.position.set(0, 0.26, -0.20);
  bike.add(rider.group);

  return { group: bike, wheels, rider: { parts: rider.parts, anim: createAnimState(2.4) } };
}

function buildRoadTraffic() {
  const mainCircuit = buildMainBoulevardCircuit();
  const southCircuit = buildSouthAvenueCircuit();

  const specs = [
    // 2 voitures stylisées sur le grand boulevard + rond-point
    {
      kind: 'car',
      circuit: mainCircuit,
      circuitId: 'main',
      startFrac: 0.04,
      cruiseSpeed: 5.2,
      radius: 1.18,
      minGap: 9.0,
      built: createStylizedCar(0x16a34a, 0xfefce8)
    },
    {
      kind: 'car',
      circuit: mainCircuit,
      circuitId: 'main',
      startFrac: 0.54,
      cruiseSpeed: 5.0,
      radius: 1.18,
      minGap: 9.0,
      built: createStylizedCar(0x2563eb, 0xf8fafc)
    },
    // 1 moto + 1 vélo sur le grand boulevard
    {
      kind: 'moto',
      circuit: mainCircuit,
      circuitId: 'main',
      startFrac: 0.28,
      cruiseSpeed: 5.6,
      radius: 0.82,
      minGap: 7.2,
      built: createTrafficMotorbike(0xdc2626, {
        gender: 'male', hairStyle: 'short', shirtColor: 0x0ea5e9, trimColor: 0xfcd116, skinColor: 0x5c3317
      })
    },
    {
      kind: 'bicycle',
      circuit: mainCircuit,
      circuitId: 'main',
      startFrac: 0.78,
      cruiseSpeed: 3.5,
      radius: 0.72,
      minGap: 6.0,
      built: createTrafficBicycle(0x0d9488, {
        gender: 'female', hairStyle: 'braids', outfitStyle: 'pagne-skirt',
        shirtColor: 0xf59e0b, skirtColor: 0x0f766e, trimColor: 0xfef08a, skinColor: 0x7a482b
      })
    },
    // 1 moto + 1 vélo sur l'avenue Nord-Sud
    {
      kind: 'moto',
      circuit: southCircuit,
      circuitId: 'south',
      startFrac: 0.05,
      cruiseSpeed: 4.5,
      radius: 0.82,
      minGap: 7.0,
      built: createTrafficMotorbike(0xea580c, {
        gender: 'male', accessory: 'cap', shirtColor: 0x15803d, trimColor: 0xfde047, skinColor: 0x62371e
      })
    },
    {
      kind: 'bicycle',
      circuit: southCircuit,
      circuitId: 'south',
      startFrac: 0.55,
      cruiseSpeed: 3.2,
      radius: 0.72,
      minGap: 6.0,
      built: createTrafficBicycle(0xdc2626, {
        gender: 'male', hairStyle: 'short', shirtColor: 0x0891b2, trimColor: 0xffffff, skinColor: 0x6c3d21
      })
    }
  ];

  specs.forEach(s => {
    const startDist = s.startFrac * s.circuit.totalLen;
    const pose = sampleClosedRoadPath(s.circuit, startDist);
    s.built.group.position.set(pose.x, 0, pose.z);
    s.built.group.rotation.y = pose.yaw;
    scene.add(s.built.group);

    trafficVehicles.push({
      kind: s.kind,
      circuit: s.circuit,
      circuitId: s.circuitId,
      dist: startDist,
      cruiseSpeed: s.cruiseSpeed,
      speed: s.cruiseSpeed,
      radius: s.radius,
      minGap: s.minGap,
      pedalPhase: Math.random() * Math.PI * 2,
      group: s.built.group,
      wheels: s.built.wheels,
      rider: s.built.rider
    });
  });
}

function updateRoadTraffic(elapsed, dt) {
  const pPos = playerGroup ? playerGroup.position : null;

  trafficVehicles.forEach(v => {
    let targetSpeed = v.cruiseSpeed;

    // 1. Espacement propre entre véhicules sur le même circuit
    const total = v.circuit.totalLen;
    for (let i = 0; i < trafficVehicles.length; i++) {
      const other = trafficVehicles[i];
      if (other === v || other.circuitId !== v.circuitId) continue;
      let gap = ((other.dist - v.dist) % total + total) % total;
      if (gap < v.minGap) {
        targetSpeed = Math.min(targetSpeed, Math.max(0, other.speed * 0.65));
        if (gap < v.minGap * 0.58) targetSpeed = 0;
      }
    }

    // 2. Ralentir ou s'arrêter brièvement si le joueur traverse devant le véhicule
    if (pPos) {
      const fwdX = Math.sin(v.group.rotation.y);
      const fwdZ = Math.cos(v.group.rotation.y);
      const relX = pPos.x - v.group.position.x;
      const relZ = pPos.z - v.group.position.z;
      const forwardDist = relX * fwdX + relZ * fwdZ;
      const lateralDist = Math.abs(relX * fwdZ - relZ * fwdX);
      const stopZone = v.kind === 'car' ? 5.2 : 4.2;
      if (forwardDist > -0.4 && forwardDist < stopZone && lateralDist < v.radius + 1.05) {
        targetSpeed = 0;
      }
    }

    // Accélération / freinage progressifs fluides
    const accelRate = targetSpeed < v.speed ? 9.5 : 4.2;
    v.speed += (targetSpeed - v.speed) * Math.min(1, dt * accelRate);
    if (v.speed < 0.04 && targetSpeed === 0) v.speed = 0;

    v.dist = (v.dist + v.speed * dt) % total;
    const pose = sampleClosedRoadPath(v.circuit, v.dist);
    v.group.position.set(pose.x, 0, pose.z);
    v.group.rotation.y = lerpAngle(v.group.rotation.y, pose.yaw, Math.min(1, dt * 10));

    // Rotation réelle des roues proportionnelle à la distance parcourue
    const wheelSpin = (v.speed * dt) / 0.29;
    v.wheels.forEach(w => { w.rotation.x += wheelSpin; });

    // Animation du cycliste qui pédale ou du conducteur de moto
    if (v.rider) {
      if (v.kind === 'bicycle') {
        v.pedalPhase += v.speed * dt * 2.6;
        updateCharacterAnimation(v.rider.parts, v.rider.anim, {
          pose: 'cycle',
          pedalPhase: v.pedalPhase
        }, elapsed, dt);
      } else if (v.kind === 'moto') {
        updateCharacterAnimation(v.rider.parts, v.rider.anim, {
          pose: 'moto'
        }, elapsed, dt);
      }
    }
  });
}

function resolveVehicleCollisions(pos, radius = PLAYER_RADIUS) {
  let hit = false;
  for (let i = 0; i < trafficVehicles.length; i++) {
    const v = trafficVehicles[i];
    const dx = pos.x - v.group.position.x;
    const dz = pos.z - v.group.position.z;
    const minDist = radius + v.radius;
    const distSq = dx * dx + dz * dz;
    if (distSq < minDist * minDist) {
      const dist = Math.sqrt(distSq);
      if (dist > 0.0001) {
        const push = minDist - dist;
        pos.x += (dx / dist) * push;
        pos.z += (dz / dist) * push;
      } else {
        pos.z += minDist;
      }
      hit = true;
    }
  }
  return hit;
}

/* ===========================================================================
   8. CONTRÔLES CAMÉRA (SOURIS + TACTILE + PINCH-TO-ZOOM) & BOUCLE 3D
   =========================================================================== */
function setupCanvasEvents(dom) {
  let dragDistance = 0;
  let isPinching = false;
  let lastPinchDist = 0;
  let activeTouchTap = false;

  const onDown = (clientX, clientY, isTouch = false) => {
    initAudioFX();
    state.isDragging = true;
    activeTouchTap = isTouch;
    dragDistance = 0;
    state.lastPointer = { x: clientX, y: clientY };
  };

  const onMove = (clientX, clientY) => {
    if (!state.isDragging) return;
    const dx = clientX - state.lastPointer.x;
    const dy = clientY - state.lastPointer.y;
    dragDistance += Math.abs(dx) + Math.abs(dy);
    const sensitivity = activeTouchTap ? 0.008 : 0.0065;
    state.cameraYaw -= dx * sensitivity;
    state.cameraPitch = Math.max(0.22, Math.min(1.08, state.cameraPitch + dy * 0.0048));
    state.lastPointer = { x: clientX, y: clientY };
  };

  const onUp = (clientX, clientY) => {
    if (!state.isDragging) return;
    state.isDragging = false;
    const tapThreshold = activeTouchTap ? 14 : 8;
    if (dragDistance < tapThreshold) {
      const rect = dom.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(clickableMeshes, false);
      if (hits.length > 0 && hits[0].object.userData.npcId) {
        const loc = NEIGHBORHOOD_DATA.find(n => n.id === hits[0].object.userData.npcId);
        if (loc) walkToAndTalk(loc);
      }
    }
  };

  const getPinchDistance = (touches) => Math.hypot(
    touches[0].clientX - touches[1].clientX,
    touches[0].clientY - touches[1].clientY
  );

  dom.addEventListener('mousedown', e => {
    if (e.button === 0) onDown(e.clientX, e.clientY, false);
  });
  window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
  window.addEventListener('mouseup', e => onUp(e.clientX, e.clientY));

  dom.addEventListener('wheel', e => {
    e.preventDefault();
    state.cameraDistance = Math.max(8, Math.min(26, state.cameraDistance + e.deltaY * 0.01));
  }, { passive: false });

  dom.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      isPinching = false;
      onDown(e.touches[0].clientX, e.touches[0].clientY, true);
    } else if (e.touches.length === 2) {
      state.isDragging = false;
      isPinching = true;
      lastPinchDist = getPinchDistance(e.touches);
    }
  }, { passive: true });

  dom.addEventListener('touchmove', e => {
    if (isPinching && e.touches.length === 2) {
      e.preventDefault();
      const dist = getPinchDistance(e.touches);
      const delta = lastPinchDist - dist;
      state.cameraDistance = Math.max(8, Math.min(26, state.cameraDistance + delta * 0.04));
      lastPinchDist = dist;
    } else if (state.isDragging && e.touches.length === 1) {
      e.preventDefault();
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: false });

  dom.addEventListener('touchend', e => {
    if (isPinching && e.touches.length < 2) {
      isPinching = false;
    } else if (state.isDragging && e.changedTouches.length === 1) {
      onUp(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
  });

  dom.addEventListener('touchcancel', () => {
    state.isDragging = false;
    isPinching = false;
  });
}

function getCinemaTurnRole(loc, line, idx) {
  const sp = (line && line.speaker) ? String(line.speaker).trim() : '';
  if (sp === 'A') return 'npc';
  if (sp === 'B') return 'player';
  return idx % 2 === 0 ? 'npc' : 'player';
}

function getPlayerVoiceForNpc(npcVoice) {
  return npcVoice === 'en-US-GuyNeural' ? 'en-US-JennyNeural' : 'en-US-GuyNeural';
}

function updateBubbleSpeakingWaves(isSpeaking) {
  const npcWave = document.getElementById('npc-bubble-wave');
  const playerWave = document.getElementById('player-bubble-wave');
  if (!npcWave || !playerWave) return;
  const activeNpcSpeaking = isSpeaking && state.cinema.active && state.speakingTarget && state.speakingTarget !== 'player';
  const activePlayerSpeaking = isSpeaking && state.cinema.active && state.speakingTarget === 'player';
  npcWave.classList.toggle('hidden', !activeNpcSpeaking);
  playerWave.classList.toggle('hidden', !activePlayerSpeaking);
}

function hideFloatingSpeechBubbles() {
  const npcBubble = document.getElementById('npc-speech-bubble');
  const playerBubble = document.getElementById('player-speech-bubble');
  if (npcBubble) npcBubble.classList.add('hidden');
  if (playerBubble) playerBubble.classList.add('hidden');
  updateBubbleSpeakingWaves(false);
}

function projectSpeechBubble(el, worldX, worldY, worldZ) {
  if (!el || el.classList.contains('hidden') || !camera || !_labelVec) return;
  _labelVec.set(worldX, worldY, worldZ);
  _labelVec.project(camera);
  if (_labelVec.z >= 1) return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const rawX = (_labelVec.x * 0.5 + 0.5) * vw;
  const rawY = (-_labelVec.y * 0.5 + 0.5) * vh;

  const halfW = Math.min(165, (vw - 24) / 2);
  const clampedX = Math.max(halfW + 12, Math.min(vw - halfW - 12, rawX));
  const minTop = vw < 640 ? 275 : 245;
  const maxBottom = vh - (vw < 640 ? 132 : 108);
  const clampedY = Math.max(minTop, Math.min(maxBottom, rawY));

  el.style.left = `${clampedX}px`;
  el.style.top = `${clampedY}px`;
}

function updateCinemaControlsUI() {
  const loc = state.cinema.loc;
  if (!loc) return;
  const lines = loc.dialogues || [];
  const total = Math.max(1, lines.length);
  const idx = Math.min(state.cinema.turnIndex, total - 1);
  const isFinished = state.cinema.finished;
  const isLast = idx >= total - 1;

  document.getElementById('cinema-unit-pill').textContent = `Unité ${loc.unit} • ${idx + 1}/${total}`;

  const statusEl = document.getElementById('cinema-status-text');
  const nextBtn = document.getElementById('btn-cinema-next');
  const nextLabel = document.getElementById('cinema-next-label');
  const courseLabel = document.getElementById('cinema-course-label');
  const grammarBtn = document.getElementById('btn-cinema-grammar');

  if (isFinished) {
    statusEl.textContent = `Dialogue terminé avec ${loc.npcName} !`;
    nextLabel.textContent = 'Revoir';
    courseLabel.textContent = 'Passer au Quiz';
    grammarBtn.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
  } else {
    const speakerName = state.cinema.activeRole === 'player'
      ? (state.profile ? state.profile.name : 'Vous')
      : loc.npcName;
    statusEl.textContent = `${speakerName} parle...`;
    const nextRole = !isLast ? getCinemaTurnRole(loc, lines[idx + 1], idx + 1) : null;
    nextLabel.textContent = isLast ? 'Terminer' : (nextRole === 'player' ? 'Répondre' : 'Suivant');
    courseLabel.textContent = 'Ouvrir le cours & Quiz';
    grammarBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
  }
}

function startCinematicDialogue(loc) {
  if (!loc) return;
  stopCurrentSpeech();
  closeDialogue(true);
  state.autoWalkTarget = null;
  clearMovementKeys();
  playFX('open');

  // Enregistrer la visite (+10 XP la première fois)
  updateDailyStreak(false);
  if (!state.visitedIds.has(loc.id)) {
    state.visitedIds.add(loc.id);
    addXP(10);
  } else {
    saveProgress();
    syncProgressUI();
  }

  const npcEntity = npcEntities.find(e => e.data.id === loc.id) || null;
  const playerSpot = playerGroup ? findClearStandPosition(loc, playerGroup.position) : null;

  // Choisir le côté caméra le plus dégagé pour cadrer les deux personnages face à face
  let camSide = 1;
  if (playerSpot) {
    const dx = playerSpot.x - loc.pos.x;
    const dz = playerSpot.z - loc.pos.z;
    const len = Math.hypot(dx, dz) || 1;
    const midX = (playerSpot.x + loc.pos.x) * 0.5;
    const midZ = (playerSpot.z + loc.pos.z) * 0.5;
    const perpX = -dz / len;
    const perpZ = dx / len;
    const testPosA = { x: midX + perpX * 5.2, z: midZ + perpZ * 5.2 };
    const testPosB = { x: midX - perpX * 5.2, z: midZ - perpZ * 5.2 };
    const distA = Math.hypot(testPosA.x, testPosA.z - 2);
    const distB = Math.hypot(testPosB.x, testPosB.z - 2);
    camSide = distA <= distB ? 1 : -1;
  }

  state.cinema.active = true;
  state.cinema.loc = loc;
  state.cinema.npcEntity = npcEntity;
  state.cinema.turnIndex = 0;
  state.cinema.finished = false;
  state.cinema.activeRole = 'npc';
  state.cinema.playerSpot = playerSpot;
  state.cinema.camSide = camSide;

  // Masquer les contrôles d'exploration et les étiquettes pour libérer la scène 3D
  document.getElementById('dpad-controls').classList.add('hidden');
  document.getElementById('proximity-prompt').classList.add('hidden');
  document.getElementById('labels-layer').classList.add('hidden');
  document.getElementById('cinema-controls').classList.remove('hidden');

  if (!loc.dialogues || loc.dialogues.length === 0) {
    state.cinema.finished = true;
    updateCinemaControlsUI();
    return;
  }

  playCinemaTurn(0);
}

async function playCinemaTurn(idx) {
  const loc = state.cinema.loc;
  if (!state.cinema.active || !loc) return;
  const lines = loc.dialogues || [];
  if (idx < 0 || idx >= lines.length) {
    state.cinema.finished = true;
    updateCinemaControlsUI();
    return;
  }

  stopCurrentSpeech();
  const myReqId = speechRequestId;
  state.cinema.turnIndex = idx;
  state.cinema.finished = false;

  const line = lines[idx];
  const role = getCinemaTurnRole(loc, line, idx);
  state.cinema.activeRole = role;

  const npcBubble = document.getElementById('npc-speech-bubble');
  const playerBubble = document.getElementById('player-speech-bubble');
  const total = lines.length;

  if (role === 'player') {
    npcBubble.classList.add('hidden');
    document.getElementById('player-bubble-avatar').innerHTML = state.profile
      ? renderAvatarHTML(state.profile.avatarType, state.profile.avatarPresetId, state.profile.avatarDataUrl)
      : getPartnerPortraitSVG();
    document.getElementById('player-bubble-speaker').textContent = state.profile ? state.profile.name : 'Vous';
    document.getElementById('player-bubble-turn').textContent = `${idx + 1}/${total}`;
    document.getElementById('player-bubble-en').textContent = line.en;
    const frEl = document.getElementById('player-bubble-fr');
    frEl.textContent = line.fr || '';
    frEl.classList.toggle('hidden', !line.fr);
    playerBubble.classList.remove('hidden');
    // Position initiale centrée avant le prochain rafraîchissement 3D
    if (!playerGroup) {
      playerBubble.style.left = '50%';
      playerBubble.style.top = '52%';
    }
  } else {
    playerBubble.classList.add('hidden');
    document.getElementById('npc-bubble-avatar').innerHTML = getNpcPortraitSVG(loc.id);
    document.getElementById('npc-bubble-speaker').textContent = loc.npcName;
    document.getElementById('npc-bubble-turn').textContent = `${idx + 1}/${total}`;
    document.getElementById('npc-bubble-en').textContent = line.en;
    const frEl = document.getElementById('npc-bubble-fr');
    frEl.textContent = line.fr || '';
    frEl.classList.toggle('hidden', !line.fr);
    npcBubble.classList.remove('hidden');
    if (!state.cinema.npcEntity) {
      npcBubble.style.left = '50%';
      npcBubble.style.top = '48%';
    }
  }

  updateCinemaControlsUI();

  const speakerTarget = role === 'player' ? 'player' : loc.id;
  const chosenVoice = role === 'player' ? getPlayerVoiceForNpc(loc.voice) : loc.voice;

  await playSingleUtterance(line.en, false, chosenVoice, myReqId, speakerTarget);

  if (myReqId !== speechRequestId || !state.cinema.active) return;

  if (idx < lines.length - 1) {
    // Enchaînement fluide vers la réplique suivante (tour alterné habitant <-> joueur)
    state.cinema.autoAdvanceTimer = setTimeout(() => {
      state.cinema.autoAdvanceTimer = null;
      if (state.cinema.active && state.cinema.turnIndex === idx) {
        playCinemaTurn(idx + 1);
      }
    }, 850);
  } else {
    state.cinema.finished = true;
    updateCinemaControlsUI();
  }
}

function advanceCinemaTurn() {
  if (!state.cinema.active || !state.cinema.loc) return;
  playFX('click');
  const lines = state.cinema.loc.dialogues || [];
  if (state.cinema.finished) {
    playCinemaTurn(0);
    return;
  }
  const nextIdx = state.cinema.turnIndex + 1;
  if (nextIdx < lines.length) {
    playCinemaTurn(nextIdx);
  } else {
    stopCurrentSpeech();
    state.cinema.finished = true;
    updateCinemaControlsUI();
  }
}

function exitCinematicDialogue(restoreHud = true) {
  if (!state.cinema.active) return;
  stopCurrentSpeech();
  state.cinema.active = false;
  state.cinema.loc = null;
  state.cinema.npcEntity = null;
  state.cinema.playerSpot = null;
  state.cinema.finished = false;
  state.cinema.activeRole = null;

  hideFloatingSpeechBubbles();
  document.getElementById('cinema-controls').classList.add('hidden');
  document.getElementById('labels-layer').classList.remove('hidden');
  if (restoreHud) {
    document.getElementById('dpad-controls').classList.remove('hidden');
  }
}

function openCourseFromCinema(initialTab = 'dialogue') {
  const loc = state.cinema.loc;
  if (!loc) return;
  exitCinematicDialogue(false);
  openDialogue(loc, initialTab, false);
}

function walkToAndTalk(loc) {
  playFX('click');
  if (state.cinema.active) exitCinematicDialogue(true);
  closeDialogue(true);

  if (!playerGroup) {
    startCinematicDialogue(loc);
    return;
  }

  const distNow = Math.hypot(playerGroup.position.x - loc.pos.x, playerGroup.position.z - loc.pos.z);
  if (distNow < 3.4) {
    startCinematicDialogue(loc);
    return;
  }

  const spot = findClearStandPosition(loc, playerGroup.position);
  state.autoWalkTarget = {
    x: spot.x,
    z: spot.z,
    openNpc: loc,
    stuckTimer: 0,
    steerDir: 1
  };
  showToast(`Direction Unité ${loc.unit} — ${loc.placeName} (${loc.npcName})`);
}

let lastProximityNpcId = null;

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  const elapsed = clock.getElapsedTime();

  if (burkinaFlagPivot) {
    burkinaFlagPivot.rotation.y = 0.25 + Math.sin(elapsed * 2.3) * 0.16;
  }

  let moveX = 0;
  let moveZ = 0;
  const speed = 7.6;
  let playerIsMoving = false;

  if (!state.cinema.active) {
    if (state.keys.up) moveZ -= 1;
    if (state.keys.down) moveZ += 1;
    if (state.keys.left) moveX -= 1;
    if (state.keys.right) moveX += 1;

    const manualMove = (moveX !== 0 || moveZ !== 0);
    if (manualMove) {
      state.autoWalkTarget = null;
      const forwardX = -Math.sin(state.cameraYaw);
      const forwardZ = -Math.cos(state.cameraYaw);
      const rightX = Math.cos(state.cameraYaw);
      const rightZ = -Math.sin(state.cameraYaw);

      const vx = (forwardX * -moveZ + rightX * moveX);
      const vz = (forwardZ * -moveZ + rightZ * moveX);
      const len = Math.hypot(vx, vz) || 1;
      const prevX = playerGroup.position.x;
      const prevZ = playerGroup.position.z;

      playerGroup.position.x += (vx / len) * speed * dt;
      playerGroup.position.z += (vz / len) * speed * dt;
      resolveCollisions(playerGroup.position, PLAYER_RADIUS, null);

      const movedDist = Math.hypot(playerGroup.position.x - prevX, playerGroup.position.z - prevZ);
      playerIsMoving = movedDist > 0.004;
      const desiredRotY = Math.atan2(vx, vz);
      playerGroup.rotation.y = lerpAngle(playerGroup.rotation.y, desiredRotY, Math.min(1, dt * 14));
    } else if (state.autoWalkTarget) {
      const target = state.autoWalkTarget;
      const dx = target.x - playerGroup.position.x;
      const dz = target.z - playerGroup.position.z;
      const dist = Math.hypot(dx, dz);

      if (dist < 0.55) {
        const npcToOpen = target.openNpc;
        state.autoWalkTarget = null;
        if (npcToOpen) startCinematicDialogue(npcToOpen);
      } else {
        const prevX = playerGroup.position.x;
        const prevZ = playerGroup.position.z;
        let dirX = dx / dist;
        let dirZ = dz / dist;

        // Légère déviation tangentielle si un obstacle (mât, arbre, banc) se trouve sur le trajet
        if (target.stuckTimer > 0.12) {
          const perpX = -dirZ * target.steerDir;
          const perpZ = dirX * target.steerDir;
          dirX = dirX * 0.45 + perpX * 0.89;
          dirZ = dirZ * 0.45 + perpZ * 0.89;
          const norm = Math.hypot(dirX, dirZ) || 1;
          dirX /= norm;
          dirZ /= norm;
        }

        const stepLen = speed * 1.18 * dt;
        playerGroup.position.x += dirX * stepLen;
        playerGroup.position.z += dirZ * stepLen;
        const hitObstacle = resolveCollisions(playerGroup.position, PLAYER_RADIUS, null);

        const actualStep = Math.hypot(playerGroup.position.x - prevX, playerGroup.position.z - prevZ);
        if (hitObstacle && actualStep < stepLen * 0.55) {
          target.stuckTimer += dt;
          if (target.stuckTimer > 1.4) {
            target.steerDir *= -1;
            target.stuckTimer = 0.25;
          }
        } else {
          target.stuckTimer = Math.max(0, target.stuckTimer - dt * 2);
        }

        playerIsMoving = actualStep > 0.004;
        if (playerIsMoving) {
          const walkAngle = Math.atan2(playerGroup.position.x - prevX, playerGroup.position.z - prevZ);
          playerGroup.rotation.y = lerpAngle(playerGroup.rotation.y, walkAngle, Math.min(1, dt * 14));
        }
      }
    } else {
      resolveCollisions(playerGroup.position, PLAYER_RADIUS, null);
    }
  } else if (state.cinema.playerSpot && state.cinema.npcEntity) {
    // Placement cinématique fluide face à l'habitant sans aucun chevauchement
    const spot = state.cinema.playerSpot;
    const npcPos = state.cinema.npcEntity.group.position;
    const dxSpot = spot.x - playerGroup.position.x;
    const dzSpot = spot.z - playerGroup.position.z;
    const distSpot = Math.hypot(dxSpot, dzSpot);

    if (distSpot > 0.08) {
      const step = Math.min(distSpot, 6.2 * dt);
      playerGroup.position.x += (dxSpot / distSpot) * step;
      playerGroup.position.z += (dzSpot / distSpot) * step;
      resolveCollisions(playerGroup.position, PLAYER_RADIUS, null);
      playerIsMoving = true;
    }

    const faceNpcYaw = Math.atan2(npcPos.x - playerGroup.position.x, npcPos.z - playerGroup.position.z);
    playerGroup.rotation.y = lerpAngle(playerGroup.rotation.y, faceNpcYaw, Math.min(1, dt * 10));
  }

  // Mettre à jour la circulation routière & la population vivante du quartier
  updateRoadTraffic(elapsed, dt);
  if (!state.cinema.active) {
    if (resolveVehicleCollisions(playerGroup.position, PLAYER_RADIUS)) {
      resolveCollisions(playerGroup.position, PLAYER_RADIUS, null);
    }
  }
  updateBackgroundPopulation(elapsed, dt);

  if (playerIsMoving) {
    stepTimer += dt;
    if (stepTimer > 0.34) {
      stepTimer = 0;
      playFX('step');
    }
  }

  // Animer le personnage joueur (respiration, clignements, marche articulée, parole & écoute)
  const playerIsSpeaking = state.speakingTarget === 'player';
  const playerIsListening = state.cinema.active && Boolean(state.speakingTarget) && state.speakingTarget !== 'player';
  updateCharacterAnimation(
    playerParts,
    playerAnim,
    {
      pose: 'default',
      isMoving: playerIsMoving,
      moveSpeed: 1.0,
      isSpeaking: playerIsSpeaking,
      isListening: playerIsListening,
      isGreeting: false,
      headLookYaw: 0
    },
    elapsed,
    dt
  );

  // Animer les 8 habitants du quartier
  let closestNpc = null;
  let closestDist = 4.3;

  npcEntities.forEach(npc => {
    const dx = playerGroup.position.x - npc.group.position.x;
    const dz = playerGroup.position.z - npc.group.position.z;
    const dist = Math.hypot(dx, dz);

    npc.ring.scale.setScalar(1 + Math.sin(elapsed * 3 + npc.phase) * 0.07);

    const isCinemaNpc = state.cinema.active && state.cinema.npcEntity === npc;
    const isSpeaking = state.speakingTarget === npc.data.id;
    const isListening = isCinemaNpc && state.speakingTarget === 'player';
    const isGreeting = !state.cinema.active && !state.activeNpc && dist < 6.4;

    // Rotation douce vers le joueur lorsqu'il s'approche ou pendant la scène
    let headLookYaw = 0;
    if (isCinemaNpc || dist < 7.2) {
      const lookAngle = Math.atan2(dx, dz);
      npc.group.rotation.y = lerpAngle(npc.group.rotation.y, lookAngle, Math.min(1, dt * 6.5));
      let residual = lookAngle - npc.group.rotation.y;
      while (residual > Math.PI) residual -= Math.PI * 2;
      while (residual < -Math.PI) residual += Math.PI * 2;
      headLookYaw = Math.max(-0.45, Math.min(0.45, residual));
    } else {
      npc.group.rotation.y = lerpAngle(npc.group.rotation.y, npc.baseRotY, Math.min(1, dt * 2.5));
    }

    updateCharacterAnimation(
      npc.parts,
      npc.anim,
      {
        pose: 'default',
        isMoving: false,
        isSpeaking,
        isListening,
        isGreeting,
        headLookYaw
      },
      elapsed,
      dt
    );

    if (dist < closestDist) {
      closestDist = dist;
      closestNpc = npc.data;
    }

    if (!state.cinema.active) {
      _labelVec.set(npc.group.position.x, 2.75, npc.group.position.z);
      _labelVec.project(camera);
      if (_labelVec.z < 1) {
        const x = (_labelVec.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-_labelVec.y * 0.5 + 0.5) * window.innerHeight;
        npc.labelEl.style.left = `${x}px`;
        npc.labelEl.style.top = `${y}px`;
        npc.labelEl.style.opacity = dist < 38 ? '1' : '0.45';
        npc.labelEl.style.display = 'flex';
      } else {
        npc.labelEl.style.display = 'none';
      }
    }
  });

  state.nearbyNpc = closestNpc;
  const promptEl = document.getElementById('proximity-prompt');
  if (closestNpc && !state.activeNpc && !state.cinema.active) {
    if (lastProximityNpcId !== closestNpc.id) {
      lastProximityNpcId = closestNpc.id;
      document.getElementById('proximity-avatar').innerHTML = getNpcPortraitSVG(closestNpc.id);
    }
    const isSmallScreen = window.innerWidth < 640;
    document.getElementById('proximity-text').textContent = isSmallScreen
      ? `Parler à ${closestNpc.npcName}`
      : `Parler à ${closestNpc.npcName} — Unité ${closestNpc.unit}`;
    promptEl.classList.remove('hidden');
  } else {
    promptEl.classList.add('hidden');
  }

  // Caméra : cadrage film 2-plans pendant le dialogue 3D, sinon suivi tiers-personne amorti (damping fluide)
  const camDampPos = 1 - Math.exp(-7.5 * dt);
  const camDampLook = 1 - Math.exp(-10.5 * dt);

  if (state.cinema.active && state.cinema.npcEntity) {
    const npcPos = state.cinema.npcEntity.group.position;
    const pPos = playerGroup.position;
    const midX = (npcPos.x + pPos.x) * 0.5;
    const midZ = (npcPos.z + pPos.z) * 0.5;

    const dx = pPos.x - npcPos.x;
    const dz = pPos.z - npcPos.z;
    const len = Math.hypot(dx, dz) || 1;
    const perpX = (-dz / len) * state.cinema.camSide;
    const perpZ = (dx / len) * state.cinema.camSide;

    const isMobilePortrait = window.innerWidth < 640 && window.innerHeight > window.innerWidth;
    const camDist = isMobilePortrait ? 7.4 : 6.0;
    const camHeight = isMobilePortrait ? 2.65 : 2.35;

    _camGoalVec.set(midX + perpX * camDist, camHeight, midZ + perpZ * camDist);
    _camTargetLookVec.set(midX, 1.55, midZ);
    camera.position.lerp(_camGoalVec, 1 - Math.exp(-5.8 * dt));
    _camLookVec.lerp(_camTargetLookVec, 1 - Math.exp(-7.2 * dt));
    camera.lookAt(_camLookVec.x, _camLookVec.y, _camLookVec.z);

    projectSpeechBubble(
      document.getElementById('npc-speech-bubble'),
      npcPos.x,
      2.65,
      npcPos.z
    );
    projectSpeechBubble(
      document.getElementById('player-speech-bubble'),
      pPos.x,
      2.65,
      pPos.z
    );
  } else {
    const targetLookY = (state.activeNpc && window.innerWidth < 640) ? -0.35 : 1.45;
    state.lookAtY += (targetLookY - state.lookAtY) * (1 - Math.exp(-8.0 * dt));

    // Légère anticipation du regard dans le sens de marche pour un suivi tiers-personne cinématographique
    const leadDist = playerIsMoving ? 0.65 : 0;
    const leadX = Math.sin(playerGroup.rotation.y) * leadDist;
    const leadZ = Math.cos(playerGroup.rotation.y) * leadDist;

    const camX = playerGroup.position.x + Math.sin(state.cameraYaw) * Math.cos(state.cameraPitch) * state.cameraDistance;
    const camY = playerGroup.position.y + 1.85 + Math.sin(state.cameraPitch) * state.cameraDistance;
    const camZ = playerGroup.position.z + Math.cos(state.cameraYaw) * Math.cos(state.cameraPitch) * state.cameraDistance;

    _camGoalVec.set(camX, camY, camZ);
    _camTargetLookVec.set(playerGroup.position.x + leadX, playerGroup.position.y + state.lookAtY, playerGroup.position.z + leadZ);
    camera.position.lerp(_camGoalVec, camDampPos);
    _camLookVec.lerp(_camTargetLookVec, camDampLook);
    camera.lookAt(_camLookVec.x, _camLookVec.y, _camLookVec.z);
  }

  renderer.render(scene, camera);
}

/* ===========================================================================
   9. INTERFACE HUD, NAVIGATION RAPIDE & PANNEAUX PÉDAGOGIQUES
   =========================================================================== */
function buildQuickNav() {
  const nav = document.getElementById('quick-nav');
  nav.innerHTML = '';
  NEIGHBORHOOD_DATA.forEach(loc => {
    const visited = state.visitedIds.has(loc.id);
    const quizDone = state.completedQuizIds.has(loc.id);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.locId = loc.id;
    btn.className = 'unit-pill' + (quizDone ? ' is-completed' : visited ? ' is-visited' : '');
    const checkHTML = quizDone
      ? `<span class="unit-pill-check" title="Unité validée">${UI_ICONS.check}</span>`
      : '';

    btn.innerHTML = `
      <span class="unit-pill-avatar">${getNpcPortraitSVG(loc.id)}</span>
      <span class="unit-pill-num">U${loc.unit}</span>
      <span>${loc.shortName || loc.placeName}</span>
      ${checkHTML}
    `;

    btn.addEventListener('click', () => {
      initAudioFX();
      walkToAndTalk(loc);
    });
    nav.appendChild(btn);
  });
}

function syncProfileHUD() {
  const avatarEl = document.getElementById('hud-user-avatar');
  const nameEl = document.getElementById('hud-user-name');
  if (state.profile) {
    avatarEl.innerHTML = renderAvatarHTML(
      state.profile.avatarType,
      state.profile.avatarPresetId,
      state.profile.avatarDataUrl
    );
    nameEl.textContent = state.profile.name;
  } else {
    avatarEl.innerHTML = getPresetById('preset-1').svg;
    nameEl.textContent = 'Profil';
  }
}

function updateDialogueStatusBadges(loc) {
  if (!loc) return;
  const quizDone = state.completedQuizIds.has(loc.id);
  const badgeEl = document.getElementById('dlg-quiz-badge');
  const bannerEl = document.getElementById('quiz-completed-banner');
  const quizLabel = document.getElementById('tab-quiz-label');

  if (badgeEl) badgeEl.classList.toggle('hidden', !quizDone);
  if (bannerEl) bannerEl.classList.toggle('hidden', !quizDone);
  if (quizLabel) quizLabel.textContent = quizDone ? 'Quiz ✓' : 'Quiz';
}

function syncProgressUI() {
  const total = NEIGHBORHOOD_DATA.length;
  const visitedCount = state.visitedIds.size;
  const quizCount = state.completedQuizIds.size;
  const pct = Math.round(((visitedCount * 0.4 + quizCount * 0.6) / total) * 100);

  document.getElementById('units-progress-label').textContent = `${quizCount}/${total} unités`;
  document.getElementById('progress-bar-fill').style.width = `${pct}%`;
  document.getElementById('global-progressbar').setAttribute('aria-valuenow', String(pct));
  document.getElementById('xp-display').textContent = `${state.xp} XP`;
  document.getElementById('streak-display').textContent = String(state.streak || 1);

  const soundSlot = document.getElementById('sound-icon-slot');
  if (soundSlot) {
    soundSlot.innerHTML = state.soundEnabled ? UI_ICONS.soundOn : UI_ICONS.soundOff;
  }

  syncProfileHUD();
  buildQuickNav();
  npcEntities.forEach(renderNpcLabel);

  // Mise à jour résumé dans l'aide
  const helpSummary = document.getElementById('help-progress-summary');
  if (helpSummary) {
    if (hasSavedProgress()) {
      helpSummary.textContent = `Progression enregistrée : ${state.xp} XP • ${visitedCount}/${total} lieux visités • ${quizCount}/${total} unités validées • Série : ${state.streak} j`;
      helpSummary.classList.remove('hidden');
    } else {
      helpSummary.classList.add('hidden');
    }
  }

  // Mise à jour des stats du profil si ouvert
  const statXp = document.getElementById('profile-stat-xp');
  if (statXp) {
    statXp.textContent = `${state.xp} XP`;
    document.getElementById('profile-stat-streak').textContent = state.streak > 1 ? `${state.streak} jours` : `${state.streak} jour`;
    document.getElementById('profile-stat-visited').textContent = `${visitedCount}/${total}`;
    document.getElementById('profile-stat-quiz').textContent = `${quizCount}/${total}`;
  }

  if (state.activeNpc) {
    updateDialogueStatusBadges(state.activeNpc);
  }
}

function renderDialogueLines(loc) {
  const box = document.getElementById('dialogue-lines');
  box.innerHTML = '';
  const lines = loc.dialogues && loc.dialogues.length > 0 ? loc.dialogues : [];

  // Détermine les interlocuteurs pour alterner proprement les bulles
  const firstSpeaker = lines[0] ? (lines[0].speaker || loc.npcName) : loc.npcName;
  const npcPortrait = getNpcPortraitSVG(loc.id);
  const partnerPortrait = state.profile
    ? renderAvatarHTML(state.profile.avatarType, state.profile.avatarPresetId, state.profile.avatarDataUrl)
    : getPartnerPortraitSVG();

  lines.forEach((line, index) => {
    const speaker = line.speaker || loc.npcName;
    const isAlt = lines.length > 1 && speaker !== firstSpeaker && (index % 2 === 1 || speaker === 'B');

    const row = document.createElement('div');
    row.className = 'dialogue-row' + (isAlt ? ' is-alt' : '');

    const avatar = document.createElement('div');
    avatar.className = 'dialogue-avatar';
    avatar.innerHTML = isAlt ? partnerPortrait : npcPortrait;

    const bubble = document.createElement('div');
    bubble.className = 'dialogue-bubble';

    const top = document.createElement('div');
    top.className = 'dialogue-bubble-top';

    const textCol = document.createElement('div');
    textCol.style.minWidth = '0';

    const speakerSpan = document.createElement('span');
    speakerSpan.className = 'dialogue-speaker-name';
    speakerSpan.textContent = speaker === 'A' ? loc.npcName : speaker === 'B' ? (state.profile ? state.profile.name : 'Vous') : speaker;

    const enP = document.createElement('p');
    enP.className = 'dialogue-en';
    enP.textContent = line.en;

    textCol.append(speakerSpan, enP);

    const spkBtn = document.createElement('button');
    spkBtn.type = 'button';
    spkBtn.className = 'speaker-round-btn';
    spkBtn.title = 'Écouter cette phrase en anglais';
    spkBtn.setAttribute('aria-label', `Écouter : ${line.en}`);
    spkBtn.innerHTML = UI_ICONS.speaker;
    spkBtn.addEventListener('click', () => speakEnglish(line.en, false, loc.voice));

    top.append(textCol, spkBtn);
    bubble.appendChild(top);

    if (line.phonetic) {
      const phP = document.createElement('p');
      phP.className = 'dialogue-phonetic';
      phP.textContent = line.phonetic;
      bubble.appendChild(phP);
    }

    if (line.fr) {
      const frP = document.createElement('p');
      frP.className = 'dialogue-fr';
      frP.textContent = line.fr;
      bubble.appendChild(frP);
    }

    row.append(avatar, bubble);
    box.appendChild(row);
  });
}

function renderGrammarPanel(loc) {
  const gList = document.getElementById('grammar-list');
  gList.innerHTML = '';
  const points = Array.isArray(loc.grammar) ? loc.grammar : [];

  if (points.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'panel-hint';
    empty.textContent = 'Aucun point de grammaire renseigné pour cette unité.';
    gList.appendChild(empty);
    return;
  }

  points.forEach(point => {
    const card = document.createElement('article');
    card.className = 'grammar-card';

    const title = document.createElement('h3');
    title.className = 'grammar-card-title';
    title.textContent = point.title;
    card.appendChild(title);

    if (point.explanation) {
      const exp = document.createElement('p');
      exp.className = 'grammar-card-explanation';
      exp.textContent = point.explanation;
      card.appendChild(exp);
    }

    if (Array.isArray(point.examples) && point.examples.length > 0) {
      const exWrap = document.createElement('div');
      exWrap.className = 'grammar-examples';

      point.examples.forEach(ex => {
        const exBtn = document.createElement('button');
        exBtn.type = 'button';
        exBtn.className = 'example-row';

        const left = document.createElement('div');
        left.className = 'example-text';
        const enDiv = document.createElement('div');
        enDiv.className = 'example-en';
        enDiv.textContent = ex.en;
        left.appendChild(enDiv);

        if (ex.fr) {
          const frDiv = document.createElement('div');
          frDiv.className = 'example-fr';
          frDiv.textContent = ex.fr;
          left.appendChild(frDiv);
        }

        const spk = document.createElement('span');
        spk.className = 'speaker-round-btn';
        spk.setAttribute('aria-hidden', 'true');
        spk.innerHTML = UI_ICONS.speaker;

        exBtn.append(left, spk);
        exBtn.addEventListener('click', () => speakEnglish(ex.en, false, loc.voice));
        exWrap.appendChild(exBtn);
      });

      card.appendChild(exWrap);
    }

    gList.appendChild(card);
  });
}

function renderVocabPanel(loc) {
  const vList = document.getElementById('vocab-list');
  vList.innerHTML = '';
  const items = Array.isArray(loc.vocab) ? loc.vocab : [];

  if (items.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'panel-hint';
    empty.textContent = 'Aucun vocabulaire renseigné pour cette unité.';
    vList.appendChild(empty);
    return;
  }

  items.forEach(item => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'vocab-card';

    const left = document.createElement('div');
    left.className = 'vocab-copy';

    const enDiv = document.createElement('div');
    enDiv.className = 'vocab-en';
    enDiv.textContent = item.en;
    left.appendChild(enDiv);

    if (item.phonetic) {
      const phDiv = document.createElement('div');
      phDiv.className = 'vocab-phonetic';
      phDiv.textContent = item.phonetic;
      left.appendChild(phDiv);
    }

    if (item.fr) {
      const frDiv = document.createElement('div');
      frDiv.className = 'vocab-fr';
      frDiv.textContent = item.fr;
      left.appendChild(frDiv);
    }

    const spk = document.createElement('span');
    spk.className = 'speaker-round-btn';
    spk.setAttribute('aria-hidden', 'true');
    spk.innerHTML = UI_ICONS.speaker;

    card.append(left, spk);
    card.addEventListener('click', () => speakEnglish(item.en, false, loc.voice));
    vList.appendChild(card);
  });
}

function hideQuizFeedbackBanner() {
  const banner = document.getElementById('quiz-feedback-banner');
  if (banner) {
    banner.classList.add('hidden');
    banner.classList.remove('is-success', 'is-error');
  }
}

function showQuizFeedbackBanner({ isSuccess, title, description, buttonLabel, onAction }) {
  const banner = document.getElementById('quiz-feedback-banner');
  const iconEl = document.getElementById('quiz-feedback-icon');
  const titleEl = document.getElementById('quiz-feedback-title');
  const descEl = document.getElementById('quiz-feedback-desc');
  const actionBtn = document.getElementById('btn-quiz-action');

  banner.classList.remove('hidden', 'is-success', 'is-error');
  banner.classList.add(isSuccess ? 'is-success' : 'is-error');

  iconEl.innerHTML = isSuccess ? UI_ICONS.check : UI_ICONS.cross;
  titleEl.textContent = title;
  descEl.textContent = description;

  actionBtn.className = `duo-btn quiz-action-btn ${isSuccess ? 'duo-btn-green' : 'duo-btn-red'}`;
  actionBtn.textContent = buttonLabel;
  actionBtn.onclick = onAction;
}

const ENCOURAGEMENTS = [
  'Excellent !',
  'Bravo, bien joué !',
  'Parfait !',
  'Super réponse !'
];

function renderQuiz(loc) {
  const quizzes = Array.isArray(loc.quizzes) && loc.quizzes.length > 0 ? loc.quizzes : [];
  const qEl = document.getElementById('quiz-question');
  const progressLabel = document.getElementById('quiz-progress-label');
  const progressFill = document.getElementById('quiz-progress-fill');
  const optBox = document.getElementById('quiz-options');
  const npcAvatar = document.getElementById('quiz-npc-avatar');

  state.quizAnswered = false;
  hideQuizFeedbackBanner();
  optBox.innerHTML = '';
  npcAvatar.innerHTML = getNpcPortraitSVG(loc.id);

  if (quizzes.length === 0) {
    progressLabel.textContent = '0/0';
    progressFill.style.width = '0%';
    qEl.textContent = 'Aucun exercice défini pour cette unité.';
    return;
  }

  const idx = Math.min(state.quizIndex, quizzes.length - 1);
  const currentQ = quizzes[idx];
  const progressPct = Math.round((idx / quizzes.length) * 100);
  progressFill.style.width = `${progressPct}%`;
  progressLabel.textContent = `${idx + 1}/${quizzes.length}`;
  qEl.textContent = currentQ.question;

  currentQ.options.forEach((opt, optIdx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-choice-btn';

    const num = document.createElement('span');
    num.className = 'quiz-choice-index';
    num.textContent = String(optIdx + 1);

    const txt = document.createElement('span');
    txt.className = 'quiz-choice-label';
    txt.textContent = opt.text;

    btn.append(num, txt);

    btn.addEventListener('click', () => {
      if (state.quizAnswered) return;
      speakEnglish(opt.text, false, loc.voice);

      const allChoiceBtns = optBox.querySelectorAll('.quiz-choice-btn');

      if (opt.correct) {
        state.quizAnswered = true;
        playFX('success');
        btn.classList.add('is-correct');
        allChoiceBtns.forEach(b => { b.disabled = true; });

        const isLast = idx >= quizzes.length - 1;
        progressFill.style.width = `${Math.round(((idx + 1) / quizzes.length) * 100)}%`;

        let title = ENCOURAGEMENTS[idx % ENCOURAGEMENTS.length];
        let desc = currentQ.explanation || `Vous maîtrisez très bien cette notion avec ${loc.npcName}.`;
        let btnLabel = isLast ? 'Rejouer le quiz' : 'Question suivante';

        if (isLast) {
          if (!state.completedQuizIds.has(loc.id)) {
            state.completedQuizIds.add(loc.id);
            updateDailyStreak(false);
            addXP(20);
            title = `Unité ${loc.unit} validée ! +20 XP`;
            desc = currentQ.explanation
              ? `${currentQ.explanation} Félicitations !`
              : `Félicitations ! Vous avez réussi le quiz de ${loc.npcName}.`;
          } else {
            title = `Quiz terminé avec succès !`;
          }
        }

        showQuizFeedbackBanner({
          isSuccess: true,
          title,
          description: desc,
          buttonLabel: btnLabel,
          onAction: () => {
            playFX('click');
            if (isLast) {
              state.quizIndex = 0;
              renderQuiz(loc);
            } else {
              state.quizIndex = idx + 1;
              renderQuiz(loc);
            }
          }
        });
      } else {
        playFX('error');
        btn.classList.add('is-wrong');
        btn.disabled = true;

        const explanationText = currentQ.explanation
          ? currentQ.explanation
          : `Relisez le dialogue ou la grammaire de ${loc.npcName}, puis essayez une autre réponse.`;

        showQuizFeedbackBanner({
          isSuccess: false,
          title: 'Pas tout à fait...',
          description: explanationText,
          buttonLabel: 'Réessayer',
          onAction: () => {
            playFX('click');
            hideQuizFeedbackBanner();
          }
        });
      }
    });

    optBox.appendChild(btn);
  });
}

function openDialogue(loc, initialTab = 'dialogue', autoSpeak = false) {
  if (state.cinema.active) exitCinematicDialogue(false);
  state.activeNpc = loc;
  state.quizIndex = 0;
  state.quizAnswered = false;
  playFX('open');

  updateDailyStreak(false);
  if (!state.visitedIds.has(loc.id)) {
    state.visitedIds.add(loc.id);
    addXP(10);
  } else {
    saveProgress();
    syncProgressUI();
  }

  document.getElementById('dlg-avatar').innerHTML = getNpcPortraitSVG(loc.id);
  document.getElementById('dlg-unit-badge').textContent = `Unité ${loc.unit}`;
  document.getElementById('dlg-npc-name').textContent = loc.npcName;
  document.getElementById('dlg-place-badge').textContent = loc.placeName;
  document.getElementById('dlg-theme').textContent = `${loc.unitTitle} • ${loc.theme}`;

  const tipBox = document.getElementById('dlg-tip-box');
  const tipEl = document.getElementById('dlg-tip');
  if (loc.tip) {
    tipEl.textContent = loc.tip;
    tipBox.classList.remove('hidden');
  } else {
    tipBox.classList.add('hidden');
  }

  renderDialogueLines(loc);
  renderGrammarPanel(loc);
  renderVocabPanel(loc);
  renderQuiz(loc);
  updateDialogueStatusBadges(loc);
  switchTab(initialTab || 'dialogue');

  const sheet = document.getElementById('dialogue-sheet');
  sheet.style.transform = '';
  document.getElementById('dialogue-modal').classList.remove('hidden');

  // Masquer le pad tactile sur mobile quand le bottom sheet est ouvert
  if (window.innerWidth < 640) {
    document.getElementById('dpad-controls').classList.add('hidden');
  }

  if (autoSpeak && initialTab === 'dialogue') {
    const firstLine = loc.dialogues && loc.dialogues[0] ? loc.dialogues[0].en : '';
    if (firstLine) speakEnglish(firstLine, false, loc.voice, loc.id);
  }
}

function closeDialogue(silent = false) {
  state.activeNpc = null;
  hideQuizFeedbackBanner();
  document.getElementById('dialogue-modal').classList.add('hidden');
  const sheet = document.getElementById('dialogue-sheet');
  if (sheet) sheet.style.transform = '';
  if (!state.cinema.active) {
    document.getElementById('dpad-controls').classList.remove('hidden');
  }
  if (!silent) stopCurrentSpeech();
}

function switchTab(tabName) {
  state.activeTab = tabName;
  ['dialogue', 'grammar', 'vocab', 'quiz'].forEach(name => {
    const panel = document.getElementById(`panel-${name}`);
    const btn = document.getElementById(`tab-${name}`);
    const isActive = name === tabName;
    panel.classList.toggle('hidden', !isActive);
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });

  if (tabName !== 'quiz') {
    hideQuizFeedbackBanner();
  }

  const scrollArea = document.getElementById('lesson-scroll-area');
  if (scrollArea) scrollArea.scrollTop = 0;
}

function addXP(amount) {
  state.xp += amount;
  saveProgress();
  syncProgressUI();
}

/* ===========================================================================
   10. ONBOARDING, PROFIL UTILISATEUR & RÉINITIALISATION
   =========================================================================== */
function buildPresetGrid(containerId, draftObj, previewId, statusId) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = '';

  USER_AVATAR_PRESETS.forEach(preset => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'preset-avatar-btn' + (draftObj.avatarType === 'preset' && draftObj.avatarPresetId === preset.id ? ' is-selected' : '');
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', String(draftObj.avatarType === 'preset' && draftObj.avatarPresetId === preset.id));

    btn.innerHTML = `
      <span class="preset-avatar-thumb">${preset.svg}</span>
      <span class="preset-avatar-label">${preset.label}</span>
    `;

    btn.addEventListener('click', () => {
      playFX('click');
      draftObj.avatarType = 'preset';
      draftObj.avatarPresetId = preset.id;
      draftObj.avatarDataUrl = null;
      updateAvatarPreview(previewId, draftObj);
      buildPresetGrid(containerId, draftObj, previewId, statusId);
      const statusEl = document.getElementById(statusId);
      if (statusEl) statusEl.textContent = `Avatar « ${preset.label} » sélectionné`;
    });

    grid.appendChild(btn);
  });
}

function updateAvatarPreview(previewId, draftObj) {
  const preview = document.getElementById(previewId);
  if (!preview) return;
  preview.innerHTML = renderAvatarHTML(draftObj.avatarType, draftObj.avatarPresetId, draftObj.avatarDataUrl);
}

async function handlePhotoUpload(fileInput, draftObj, previewId, gridId, statusId) {
  const file = fileInput.files && fileInput.files[0];
  if (!file) return;
  const statusEl = document.getElementById(statusId);
  if (statusEl) statusEl.textContent = 'Compression de la photo...';

  try {
    const compressedDataUrl = await compressProfileImage(file);
    draftObj.avatarType = 'photo';
    draftObj.avatarDataUrl = compressedDataUrl;
    updateAvatarPreview(previewId, draftObj);
    buildPresetGrid(gridId, draftObj, previewId, statusId);
    const sizeKb = Math.max(1, Math.round((compressedDataUrl.length * 0.75) / 1024));
    if (statusEl) statusEl.textContent = `Photo prête (${sizeKb} Ko • 160x160 JPEG)`;
    playFX('click');
  } catch (err) {
    if (statusEl) statusEl.textContent = err.message || 'Impossible de charger cette photo.';
    playFX('error');
  } finally {
    fileInput.value = '';
  }
}

function openOnboardingModal() {
  state.onboardingDraft = {
    avatarType: 'preset',
    avatarPresetId: 'preset-1',
    avatarDataUrl: null
  };
  updateAvatarPreview('onboarding-avatar-preview', state.onboardingDraft);
  buildPresetGrid('onboarding-preset-grid', state.onboardingDraft, 'onboarding-avatar-preview', 'onboarding-photo-status');
  document.getElementById('onboarding-name-input').value = '';
  document.getElementById('onboarding-name-input').classList.remove('has-error');
  document.getElementById('onboarding-name-error').classList.add('hidden');
  document.getElementById('onboarding-modal').classList.remove('hidden');
  setTimeout(() => document.getElementById('onboarding-name-input').focus(), 80);
}

function openProfileModal() {
  playFX('click');
  const current = state.profile || {
    name: '',
    avatarType: 'preset',
    avatarPresetId: 'preset-1',
    avatarDataUrl: null
  };
  state.profileDraft = {
    avatarType: current.avatarType,
    avatarPresetId: current.avatarPresetId,
    avatarDataUrl: current.avatarDataUrl
  };

  syncProgressUI();
  document.getElementById('profile-name-input').value = current.name || '';
  document.getElementById('profile-name-input').classList.remove('has-error');
  document.getElementById('profile-name-error').classList.add('hidden');
  document.getElementById('profile-photo-status').textContent =
    current.avatarType === 'photo' ? 'Photo personnalisée enregistrée' : 'JPEG 160x160px max';

  updateAvatarPreview('profile-avatar-preview', state.profileDraft);
  buildPresetGrid('profile-preset-grid', state.profileDraft, 'profile-avatar-preview', 'profile-photo-status');
  document.getElementById('profile-modal').classList.remove('hidden');
}

function closeProfileModal() {
  document.getElementById('profile-modal').classList.add('hidden');
}

function openResetModal() {
  playFX('click');
  const summary = document.getElementById('reset-summary-text');
  const total = NEIGHBORHOOD_DATA.length;
  if (hasSavedProgress()) {
    summary.textContent = `Cela remettra à zéro vos ${state.xp} XP, ${state.visitedIds.size}/${total} lieux visités et ${state.completedQuizIds.size}/${total} quiz réussis. Votre nom et votre photo de profil seront conservés.`;
  } else {
    summary.textContent = 'Votre progression est déjà à zéro. Voulez-vous tout de même réinitialiser les données de progression ?';
  }
  document.getElementById('reset-modal').classList.remove('hidden');
}

function closeResetModal() {
  document.getElementById('reset-modal').classList.add('hidden');
}

function resetProgress() {
  state.xp = 0;
  state.streak = 1;
  state.lastActiveDate = getLocalDateKey();
  state.visitedIds.clear();
  state.completedQuizIds.clear();

  try {
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
    LEGACY_STORAGE_KEYS.forEach(k => localStorage.removeItem(k));
  } catch (e) {}

  saveProgress();
  closeResetModal();
  closeProfileModal();
  exitCinematicDialogue(true);
  closeDialogue();
  syncProgressUI();
  playFX('click');
  showToast('Progression réinitialisée (0/8 unités).');
}

/* ===========================================================================
   11. LIAISON DES ÉVÉNEMENTS & DÉMARRAGE
   =========================================================================== */
function clearMovementKeys() {
  state.keys.up = false;
  state.keys.down = false;
  state.keys.left = false;
  state.keys.right = false;
  document.querySelectorAll('.dpad-btn').forEach(b => b.classList.remove('is-pressed'));
}

function isAnyBlockingModalOpen() {
  return (
    !document.getElementById('onboarding-modal').classList.contains('hidden') ||
    !document.getElementById('profile-modal').classList.contains('hidden') ||
    !document.getElementById('help-modal').classList.contains('hidden') ||
    !document.getElementById('reset-modal').classList.contains('hidden')
  );
}

function bindUIEvents() {
  const mapKey = (key, pressed) => {
    const k = key.toLowerCase();
    if (k === 'arrowup' || k === 'w' || k === 'z') state.keys.up = pressed;
    if (k === 'arrowdown' || k === 's') state.keys.down = pressed;
    if (k === 'arrowleft' || k === 'a' || k === 'q') state.keys.left = pressed;
    if (k === 'arrowright' || k === 'd') state.keys.right = pressed;
  };

  window.addEventListener('keydown', e => {
    const activeTag = document.activeElement ? document.activeElement.tagName : '';
    const isTyping = activeTag === 'INPUT' || activeTag === 'TEXTAREA';

    if (e.key === 'Escape') {
      const resetModal = document.getElementById('reset-modal');
      const profileModal = document.getElementById('profile-modal');
      const helpModal = document.getElementById('help-modal');
      if (!resetModal.classList.contains('hidden')) closeResetModal();
      else if (!profileModal.classList.contains('hidden')) closeProfileModal();
      else if (!helpModal.classList.contains('hidden')) helpModal.classList.add('hidden');
      else if (state.cinema.active) exitCinematicDialogue(true);
      else if (state.activeNpc) closeDialogue();
      return;
    }

    if (isTyping || isAnyBlockingModalOpen()) return;

    if (e.key === ' ') {
      if (state.cinema.active) {
        e.preventDefault();
        advanceCinemaTurn();
        return;
      }
      if (state.nearbyNpc && !state.activeNpc) {
        e.preventDefault();
        startCinematicDialogue(state.nearbyNpc);
        return;
      }
    }
    if (!state.cinema.active) {
      mapKey(e.key, true);
    }
  });

  window.addEventListener('keyup', e => mapKey(e.key, false));
  window.addEventListener('blur', clearMovementKeys);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearMovementKeys();
  });

  // Pad directionnel (Pointer Events unifiés tactile + souris)
  document.querySelectorAll('.dpad-btn').forEach(btn => {
    const dir = btn.dataset.dir;
    const setDir = (val) => {
      if (val) initAudioFX();
      if (dir in state.keys) state.keys[dir] = val;
      btn.classList.toggle('is-pressed', val);
    };
    btn.addEventListener('pointerdown', e => {
      e.preventDefault();
      try { btn.setPointerCapture(e.pointerId); } catch (_) {}
      setDir(true);
    });
    const release = (e) => {
      if (e) e.preventDefault();
      setDir(false);
    };
    btn.addEventListener('pointerup', release);
    btn.addEventListener('pointercancel', release);
    btn.addEventListener('lostpointercapture', () => setDir(false));
    btn.addEventListener('contextmenu', e => e.preventDefault());
  });

  document.getElementById('btn-reset-cam').addEventListener('click', () => {
    state.cameraYaw = 0;
    state.cameraPitch = 0.40;
    state.cameraDistance = getDefaultCameraDistance();
    playFX('click');
  });

  // Onboarding (connexion sans compte)
  const onboardingUploadBtn = document.getElementById('btn-onboarding-upload');
  const onboardingFileInput = document.getElementById('onboarding-photo-input');
  onboardingUploadBtn.addEventListener('click', () => onboardingFileInput.click());
  onboardingFileInput.addEventListener('change', () => {
    handlePhotoUpload(
      onboardingFileInput,
      state.onboardingDraft,
      'onboarding-avatar-preview',
      'onboarding-preset-grid',
      'onboarding-photo-status'
    );
  });

  const onboardingNameInput = document.getElementById('onboarding-name-input');
  onboardingNameInput.addEventListener('input', () => {
    onboardingNameInput.classList.remove('has-error');
    document.getElementById('onboarding-name-error').classList.add('hidden');
  });

  document.getElementById('onboarding-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const trimmed = onboardingNameInput.value.trim();
    if (!trimmed) {
      onboardingNameInput.classList.add('has-error');
      document.getElementById('onboarding-name-error').classList.remove('hidden');
      onboardingNameInput.focus();
      playFX('error');
      return;
    }

    await initAudioFX();
    state.profile = {
      name: trimmed.slice(0, 32),
      avatarType: state.onboardingDraft.avatarType,
      avatarPresetId: state.onboardingDraft.avatarPresetId,
      avatarDataUrl: state.onboardingDraft.avatarType === 'photo' ? state.onboardingDraft.avatarDataUrl : null
    };

    if (!saveProfile()) return;
    updateDailyStreak(true);
    document.getElementById('onboarding-modal').classList.add('hidden');
    syncProgressUI();
    playFX('success');
    showToast(`Bienvenue sur DAVID-DA Speak, ${state.profile.name} !`);
  });

  // Modale Profil
  const profileModal = document.getElementById('profile-modal');
  document.getElementById('btn-profile').addEventListener('click', openProfileModal);
  document.getElementById('btn-close-profile').addEventListener('click', closeProfileModal);
  profileModal.addEventListener('click', e => {
    if (e.target === profileModal) closeProfileModal();
  });

  const profileUploadBtn = document.getElementById('btn-profile-upload');
  const profileFileInput = document.getElementById('profile-photo-input');
  profileUploadBtn.addEventListener('click', () => profileFileInput.click());
  profileFileInput.addEventListener('change', () => {
    handlePhotoUpload(
      profileFileInput,
      state.profileDraft,
      'profile-avatar-preview',
      'profile-preset-grid',
      'profile-photo-status'
    );
  });

  const profileNameInput = document.getElementById('profile-name-input');
  profileNameInput.addEventListener('input', () => {
    profileNameInput.classList.remove('has-error');
    document.getElementById('profile-name-error').classList.add('hidden');
  });

  document.getElementById('profile-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const trimmed = profileNameInput.value.trim();
    if (!trimmed) {
      profileNameInput.classList.add('has-error');
      document.getElementById('profile-name-error').classList.remove('hidden');
      profileNameInput.focus();
      playFX('error');
      return;
    }

    state.profile = {
      name: trimmed.slice(0, 32),
      avatarType: state.profileDraft.avatarType,
      avatarPresetId: state.profileDraft.avatarPresetId,
      avatarDataUrl: state.profileDraft.avatarType === 'photo' ? state.profileDraft.avatarDataUrl : null
    };

    if (!saveProfile()) return;
    syncProgressUI();
    if (state.activeNpc) renderDialogueLines(state.activeNpc);
    closeProfileModal();
    playFX('success');
    showToast('Profil mis à jour !');
  });

  document.getElementById('btn-profile-reset').addEventListener('click', openResetModal);

  // Modale Aide
  const helpModal = document.getElementById('help-modal');
  document.getElementById('btn-help').addEventListener('click', () => {
    playFX('click');
    syncProgressUI();
    helpModal.classList.remove('hidden');
  });
  document.getElementById('btn-close-help').addEventListener('click', () => helpModal.classList.add('hidden'));
  document.getElementById('btn-start-sim').addEventListener('click', async () => {
    await initAudioFX();
    playFX('click');
    helpModal.classList.add('hidden');
  });
  helpModal.addEventListener('click', e => {
    if (e.target === helpModal) helpModal.classList.add('hidden');
  });

  // Modale Réinitialisation
  const resetModal = document.getElementById('reset-modal');
  document.getElementById('btn-cancel-reset').addEventListener('click', closeResetModal);
  document.getElementById('btn-confirm-reset').addEventListener('click', resetProgress);
  resetModal.addEventListener('click', e => {
    if (e.target === resetModal) closeResetModal();
  });

  // Son & interactions leçon
  document.getElementById('btn-sound-toggle').addEventListener('click', async () => {
    await initAudioFX();
    state.soundEnabled = !state.soundEnabled;
    saveProgress();
    syncProgressUI();
    if (state.soundEnabled) playFX('click');
  });

  document.getElementById('btn-talk-nearby').addEventListener('click', () => {
    initAudioFX();
    if (state.nearbyNpc) startCinematicDialogue(state.nearbyNpc);
  });

  // Contrôles de la scène de dialogue 3D (mode film avec bulles flottantes)
  document.getElementById('btn-cinema-replay').addEventListener('click', () => {
    initAudioFX();
    if (state.cinema.active) playCinemaTurn(state.cinema.turnIndex);
  });
  document.getElementById('btn-cinema-next').addEventListener('click', () => {
    initAudioFX();
    advanceCinemaTurn();
  });
  document.getElementById('btn-cinema-course').addEventListener('click', () => {
    initAudioFX();
    const targetTab = state.cinema.finished ? 'quiz' : 'dialogue';
    openCourseFromCinema(targetTab);
  });
  document.getElementById('btn-cinema-grammar').addEventListener('click', () => {
    initAudioFX();
    openCourseFromCinema('grammar');
  });
  document.getElementById('btn-cinema-exit').addEventListener('click', () => {
    playFX('click');
    exitCinematicDialogue(true);
  });

  document.getElementById('btn-close-dialogue').addEventListener('click', () => closeDialogue(false));

  // Glisser vers le bas pour fermer le bottom sheet sur mobile
  const dragZone = document.getElementById('dialogue-drag-zone');
  const dialogueSheet = document.getElementById('dialogue-sheet');
  let sheetStartY = 0;
  let sheetDeltaY = 0;
  let sheetDragging = false;

  dragZone.addEventListener('touchstart', e => {
    if (window.innerWidth >= 640 || e.touches.length !== 1) return;
    if (e.target.closest('button')) return;
    sheetDragging = true;
    sheetStartY = e.touches[0].clientY;
    sheetDeltaY = 0;
    dialogueSheet.style.transition = 'none';
  }, { passive: true });

  dragZone.addEventListener('touchmove', e => {
    if (!sheetDragging || e.touches.length !== 1) return;
    sheetDeltaY = Math.max(0, e.touches[0].clientY - sheetStartY);
    dialogueSheet.style.transform = `translateY(${sheetDeltaY}px)`;
  }, { passive: true });

  const finishSheetDrag = () => {
    if (!sheetDragging) return;
    sheetDragging = false;
    dialogueSheet.style.transition = 'transform 0.18s ease';
    if (sheetDeltaY > 65) {
      closeDialogue();
    } else {
      dialogueSheet.style.transform = '';
    }
  };
  dragZone.addEventListener('touchend', finishSheetDrag);
  dragZone.addEventListener('touchcancel', finishSheetDrag);

  // Basculer le panneau latéral à gauche / droite sur desktop
  document.getElementById('btn-dock-side').addEventListener('click', () => {
    const modal = document.getElementById('dialogue-modal');
    modal.classList.toggle('dock-left');
    playFX('click');
  });

  document.getElementById('tab-dialogue').addEventListener('click', () => switchTab('dialogue'));
  document.getElementById('tab-grammar').addEventListener('click', () => switchTab('grammar'));
  document.getElementById('tab-vocab').addEventListener('click', () => switchTab('vocab'));
  document.getElementById('tab-quiz').addEventListener('click', () => switchTab('quiz'));

  document.getElementById('btn-speak-normal').addEventListener('click', () => {
    if (state.activeNpc) speakDialogueSequence(state.activeNpc, false);
  });
  document.getElementById('btn-speak-slow').addEventListener('click', () => {
    if (state.activeNpc) speakDialogueSequence(state.activeNpc, true);
  });
  document.getElementById('btn-speak-stop').addEventListener('click', () => {
    playFX('click');
    stopCurrentSpeech();
  });
}

window.addEventListener('load', async () => {
  state.profile = loadProfile();
  const restored = loadProgress();
  await loadLessonsFromJson();
  bindUIEvents();
  const sceneReady = initThreeScene();
  syncProgressUI();
  if (sceneReady) animate();

  if (!state.profile) {
    openOnboardingModal();
  } else if (restored) {
    showToast(`Bon retour sur DAVID-DA Speak, ${state.profile.name} !`);
  }
});
