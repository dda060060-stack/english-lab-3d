/*****************************************************************************
 * DAVID Speak — Application Web 3D d'Apprentissage de l'Anglais
 * Architecture propre : Portraits SVG 2D, Scène 3D Burkina Faso (Three.js),
 * Profil localStorage + compression photo canvas, Audio Edge-TTS & Quiz.
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

function stopCurrentSpeech() {
  speechRequestId++;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  const statusEl = document.getElementById('voice-status');
  if (statusEl) statusEl.classList.add('hidden');
}

function playSingleUtterance(text, slow, chosenVoice, myReqId) {
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
      const done = () => {
        URL.revokeObjectURL(audioUrl);
        if (currentAudio === audio) currentAudio = null;
        resolve();
      };
      audio.onended = done;
      audio.onerror = done;
      await audio.play();
    } catch (e) {
      if (myReqId !== speechRequestId) {
        resolve();
        return;
      }
      if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'en-US';
        utter.rate = slow ? 0.68 : 0.95;
        utter.onend = () => resolve();
        utter.onerror = () => resolve();
        window.speechSynthesis.speak(utter);
      } else {
        resolve();
      }
    }
  });
}

async function speakEnglish(text, slow = false, voice = null) {
  playFX('click');
  stopCurrentSpeech();
  const myReqId = speechRequestId;
  const chosenVoice = voice || (state.activeNpc ? state.activeNpc.voice : 'en-US-JennyNeural');
  await playSingleUtterance(text, slow, chosenVoice, myReqId);
  const statusEl = document.getElementById('voice-status');
  if (myReqId === speechRequestId && statusEl) statusEl.classList.add('hidden');
}

async function speakDialogueSequence(loc, slow = false) {
  if (!loc) return;
  playFX('click');
  stopCurrentSpeech();
  const myReqId = speechRequestId;
  const lines = (loc.dialogues || []).map(d => d.en).filter(Boolean);
  for (const line of lines) {
    if (myReqId !== speechRequestId) return;
    await playSingleUtterance(line, slow, loc.voice, myReqId);
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
let playerGroup, playerParts;
let burkinaFlagPivot = null;
const npcEntities = [];
const clickableMeshes = [];
let clock = null;
let stepTimer = 0;

let _camGoalVec = null;
let _labelVec = null;

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

function initThreeScene() {
  if (typeof THREE === 'undefined') return false;
  clock = new THREE.Clock();
  _camGoalVec = new THREE.Vector3();
  _labelVec = new THREE.Vector3();
  const container = document.getElementById('canvas-container');
  scene = new THREE.Scene();

  scene.background = new THREE.Color(0x8abce6);
  scene.fog = new THREE.Fog(0xd4e2ec, 50, 128);

  state.cameraDistance = getDefaultCameraDistance();
  const initialFov = (window.innerWidth < 640 && window.innerHeight > window.innerWidth) ? 56 : 50;
  camera = new THREE.PerspectiveCamera(initialFov, container.clientWidth / container.clientHeight, 0.1, 190);

  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'default' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  const hemiLight = new THREE.HemisphereLight(0xfffaf0, 0xb5764c, 0.98);
  hemiLight.position.set(0, 38, 0);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xffebc8, 1.05);
  sunLight.position.set(28, 42, 20);
  scene.add(sunLight);

  buildSkyAndSun();
  buildNeighborhoodGround();
  buildBurkinaFlagMonument();
  buildMonumentDesMartyrs();
  buildEnvironmentDecor();
  buildAllLocationsAndNPCs();
  buildPlayerAvatar();

  setupCanvasEvents(renderer.domElement);
  window.addEventListener('resize', updateCameraForViewport);
  window.addEventListener('orientationchange', () => setTimeout(updateCameraForViewport, 120));
  return true;
}

function buildSkyAndSun() {
  const sunGroup = new THREE.Group();
  const sunCore = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3.2, 1),
    new THREE.MeshBasicMaterial({ color: 0xfff8d6 })
  );
  const sunHalo = new THREE.Mesh(
    new THREE.IcosahedronGeometry(5.2, 1),
    new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.18 })
  );
  sunGroup.add(sunCore, sunHalo);
  sunGroup.position.set(38, 38, -58);
  scene.add(sunGroup);

  const cloudMat = new THREE.MeshLambertMaterial({ color: 0xfaf8f5 });
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
  const lateriteGround = new THREE.Mesh(
    new THREE.PlaneGeometry(190, 190),
    new THREE.MeshLambertMaterial({ color: 0xb86a3e })
  );
  lateriteGround.rotation.x = -Math.PI / 2;
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

  const sidewalkMat = new THREE.MeshLambertMaterial({ color: 0xd8b896 });
  const esplanadeMat = new THREE.MeshLambertMaterial({ color: 0xc9a380 });
  const paverMat = new THREE.MeshLambertMaterial({ color: 0x9b8978 });

  [-1.7, 5.7].forEach(z => {
    const sw = new THREE.Mesh(new THREE.BoxGeometry(86, 0.12, 1.7), sidewalkMat);
    sw.position.set(0, 0.06, z);
    scene.add(sw);
  });

  [-3.7, 3.7].forEach(x => {
    const sw = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.12, 36), sidewalkMat);
    sw.position.set(x, 0.06, 10.5);
    scene.add(sw);
  });

  const asphaltMat = new THREE.MeshLambertMaterial({ color: 0x67625d });
  const roadH = new THREE.Mesh(new THREE.BoxGeometry(86, 0.08, 5.8), asphaltMat);
  roadH.position.set(0, 0.04, 2);
  scene.add(roadH);

  const roadV = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.08, 35), asphaltMat);
  roadV.position.set(0, 0.04, 10.5);
  scene.add(roadV);

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

  scene.add(m);
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
    lamp.add(head, bulb);
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
  });

  const yLampSpecs = [
    [-5.8, -3.5, 0.7], [5.8, -3.5, -0.7],
    [-5.8, 7.5, 2.4], [5.8, 7.5, -2.4]
  ];
  yLampSpecs.forEach(([x, z, r]) => {
    const lamp = createYStreetLamp(r);
    lamp.position.set(x, 0, z);
    scene.add(lamp);
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
  });

  const gantry = createBoulevardGantry();
  gantry.position.set(22.5, 0, 2);
  scene.add(gantry);

  const towerL = createTelecomTower();
  towerL.position.set(-12.5, 0, -37.5);
  const towerR = createTelecomTower();
  towerR.position.set(14.0, 0, -35.5);
  scene.add(towerL, towerR);

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
  });
}

/**
 * Personnages 3D arrondis et expressifs façon Duolingo (100% low-poly fluide)
 * Tête sphérique, corps stylisé en capsule/cylindre, yeux expressifs & sourire visible,
 * couleurs et accessoires cohérents avec chaque portrait 2D.
 */
function createCharacterMesh(locOrConfig, isPlayer = false) {
  const group = new THREE.Group();
  const skinColor = isPlayer ? 0x7a482b : (locOrConfig.skinColor || 0x6e3f22);
  const shirtColor = isPlayer ? 0x58cc02 : (locOrConfig.shirtColor || 0x1cb0f6);
  const trimColor = isPlayer ? 0xff9600 : (locOrConfig.trimColor || 0xfcd116);
  const headwrapColor = isPlayer ? null : locOrConfig.headwrapColor;
  const accessory = isPlayer ? 'none' : (locOrConfig.accessory || 'none');

  const skinMat = new THREE.MeshLambertMaterial({ color: skinColor });
  const shirtMat = new THREE.MeshLambertMaterial({ color: shirtColor });
  const trimMat = new THREE.MeshLambertMaterial({ color: trimColor });
  const pantsMat = new THREE.MeshLambertMaterial({ color: isPlayer ? 0x2b3a4a : 0x334155 });
  const shoeMat = new THREE.MeshLambertMaterial({ color: isPlayer ? 0xffffff : 0x1f2937 });
  const hairMat = new THREE.MeshLambertMaterial({ color: 0x1a1715 });
  const whiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x141414 });
  const blushMat = new THREE.MeshBasicMaterial({ color: 0xff8b8b, transparent: true, opacity: 0.42 });

  // Ombre douce au sol
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.58, 12),
    new THREE.MeshBasicMaterial({ color: 0x3b1f0e, transparent: true, opacity: 0.24 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.03;
  group.add(shadow);

  // Jambes arrondies avec pivots à la hanche
  const buildLeg = (xPos) => {
    const legPivot = new THREE.Group();
    legPivot.position.set(xPos, 0.72, 0);

    const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.105, 0.56, 10), pantsMat);
    thigh.position.y = -0.30;
    legPivot.add(thigh);

    const shoe = new THREE.Mesh(new THREE.SphereGeometry(0.135, 10, 8), shoeMat);
    shoe.scale.set(0.95, 0.65, 1.35);
    shoe.position.set(0, -0.63, 0.04);
    legPivot.add(shoe);

    return legPivot;
  };

  const leftLeg = buildLeg(-0.16);
  const rightLeg = buildLeg(0.16);
  group.add(leftLeg, rightLeg);

  // Corps stylisé en capsule arrondie (cylindre + calottes sphériques)
  const torsoCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.34, 0.68, 12), shirtMat);
  torsoCyl.position.y = 1.06;
  group.add(torsoCyl);

  const torsoTop = new THREE.Mesh(new THREE.SphereGeometry(0.27, 12, 8), shirtMat);
  torsoTop.scale.set(1, 0.55, 0.92);
  torsoTop.position.y = 1.38;
  group.add(torsoTop);

  const torsoBottom = new THREE.Mesh(new THREE.SphereGeometry(0.34, 12, 8), shirtMat);
  torsoBottom.scale.set(1, 0.4, 0.92);
  torsoBottom.position.y = 0.72;
  group.add(torsoBottom);

  // Bande Faso Dan Fani colorée + col
  const trimBand = new THREE.Mesh(new THREE.CylinderGeometry(0.325, 0.345, 0.13, 12), trimMat);
  trimBand.position.y = 0.84;
  group.add(trimBand);

  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.04, 6, 12), trimMat);
  collar.rotation.x = Math.PI / 2;
  collar.position.y = 1.47;
  group.add(collar);

  // Bras arrondis (épaule sphérique + manche cylindre + main sphérique)
  const buildArm = (xPos) => {
    const pivot = new THREE.Group();
    pivot.position.set(xPos, 1.35, 0);

    const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.125, 8, 8), shirtMat);
    pivot.add(shoulder);

    const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.095, 0.36, 8), shirtMat);
    sleeve.position.y = -0.20;
    pivot.add(sleeve);

    const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.075, 0.22, 8), skinMat);
    forearm.position.y = -0.45;
    pivot.add(forearm);

    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.092, 8, 8), skinMat);
    hand.position.y = -0.57;
    pivot.add(hand);

    return pivot;
  };

  const leftArmPivot = buildArm(-0.39);
  const rightArmPivot = buildArm(0.39);
  group.add(leftArmPivot, rightArmPivot);

  // Cou + Tête sphérique chaleureuse style Duolingo
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.18, 10), skinMat);
  neck.position.y = 1.54;
  group.add(neck);

  const headGroup = new THREE.Group();
  headGroup.position.y = 1.88;

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.36, 14, 12), skinMat);
  head.scale.set(1.02, 1.0, 0.98);
  headGroup.add(head);

  // Oreilles arrondies
  [-0.35, 0.35].forEach(ex => {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 8), skinMat);
    ear.position.set(ex, -0.02, 0);
    headGroup.add(ear);

    if (accessory === 'earrings') {
      const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.048, 0.012, 6, 10), trimMat);
      hoop.position.set(ex * 1.06, -0.10, 0);
      headGroup.add(hoop);
    }
  });

  // Grands yeux expressifs (blanc + pupille + reflet lumineux)
  [-0.125, 0.125].forEach(ex => {
    const sclera = new THREE.Mesh(new THREE.SphereGeometry(0.068, 10, 8), whiteMat);
    sclera.scale.set(1, 1.08, 0.55);
    sclera.position.set(ex, 0.04, 0.31);
    headGroup.add(sclera);

    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.039, 8, 8), pupilMat);
    pupil.scale.set(1, 1.05, 0.6);
    pupil.position.set(ex, 0.04, 0.345);
    headGroup.add(pupil);

    const glint = new THREE.Mesh(new THREE.SphereGeometry(0.015, 6, 6), whiteMat);
    glint.position.set(ex + 0.016, 0.06, 0.368);
    headGroup.add(glint);

    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.024, 0.025), hairMat);
    brow.position.set(ex, 0.14, 0.32);
    brow.rotation.z = ex < 0 ? 0.1 : -0.1;
    headGroup.add(brow);
  });

  // Joues rosées subtiles
  [-0.19, 0.19].forEach(cx => {
    const cheek = new THREE.Mesh(new THREE.CircleGeometry(0.048, 8), blushMat);
    cheek.position.set(cx, -0.05, 0.32);
    cheek.rotation.y = cx < 0 ? -0.45 : 0.45;
    headGroup.add(cheek);
  });

  // Sourire visible et chaleureux
  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.095, 0.022, 6, 10, Math.PI), whiteMat);
  smile.rotation.z = Math.PI;
  smile.position.set(0, -0.065, 0.325);
  headGroup.add(smile);

  // Coiffure / Foulard / Accessoires cohérents avec le portrait 2D
  if (headwrapColor) {
    const wrapMat = new THREE.MeshLambertMaterial({ color: headwrapColor });
    const wrapCrown = new THREE.Mesh(
      new THREE.SphereGeometry(0.385, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.56),
      wrapMat
    );
    wrapCrown.position.y = 0.06;
    headGroup.add(wrapCrown);

    const wrapBand = new THREE.Mesh(new THREE.TorusGeometry(0.355, 0.045, 6, 14), trimMat);
    wrapBand.rotation.x = Math.PI / 2 - 0.12;
    wrapBand.position.y = 0.14;
    headGroup.add(wrapBand);

    const wrapKnot = new THREE.Mesh(new THREE.SphereGeometry(0.115, 8, 8), wrapMat);
    wrapKnot.position.set(0.24, 0.32, 0.05);
    headGroup.add(wrapKnot);
  } else if (accessory === 'cap') {
    const capDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.52),
      shirtMat
    );
    capDome.position.y = 0.05;
    headGroup.add(capDome);

    const visor = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.04, 10, 1, false, -0.8, 1.6), trimMat);
    visor.position.set(0, 0.14, 0.25);
    visor.rotation.x = 0.15;
    headGroup.add(visor);
  } else {
    const hairCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.372, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.52),
      hairMat
    );
    hairCap.position.y = 0.045;
    headGroup.add(hairCap);
  }

  if (accessory === 'beard') {
    const beardMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 10, 8, 0, Math.PI * 2, Math.PI * 0.62, Math.PI * 0.36),
      hairMat
    );
    beardMesh.position.set(0, -0.02, 0.04);
    headGroup.add(beardMesh);
  }

  if (accessory === 'glasses') {
    const frameMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
    [-0.125, 0.125].forEach(gx => {
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.088, 0.015, 6, 12), frameMat);
      rim.position.set(gx, 0.04, 0.355);
      headGroup.add(rim);
    });
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.02), frameMat);
    bridge.position.set(0, 0.05, 0.355);
    headGroup.add(bridge);
  }

  group.add(headGroup);

  return { group, parts: { leftLeg, rightLeg, leftArmPivot, rightArmPivot, head: headGroup } };
}

function createCorrugatedRoof(width, depth, color = 0x9aa3ab, slopeX = 0.16) {
  const roof = new THREE.Group();
  const baseMat = new THREE.MeshLambertMaterial({ color });
  const ribMat = new THREE.MeshLambertMaterial({ color: 0x7d8790 });
  const sheet = new THREE.Mesh(new THREE.BoxGeometry(width, 0.08, depth), baseMat);
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
  const wallMat = new THREE.MeshLambertMaterial({ color: loc.wallColor || 0xd6965c });
  const creamMat = new THREE.MeshLambertMaterial({ color: 0xeae0cc });
  const terracottaMat = new THREE.MeshLambertMaterial({ color: 0xb05936 });
  const brickMat = new THREE.MeshLambertMaterial({ color: 0x9e5437 });
  const goldMat = new THREE.MeshLambertMaterial({ color: 0xfcd116 });
  const bfGreenMat = new THREE.MeshLambertMaterial({ color: 0x146334 });
  const bfRedMat = new THREE.MeshLambertMaterial({ color: 0xd62828 });
  const glassMat = new THREE.MeshLambertMaterial({ color: 0x3b5064 });
  const doorMat = new THREE.MeshLambertMaterial({ color: 0x5c341d });
  const darkMat = new THREE.MeshLambertMaterial({ color: 0x2f353d });

  if (loc.buildingType === 'plaza') {
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.24, 5.2), creamMat);
    plinth.position.set(0, 0.12, -0.4);
    b.add(plinth);

    [-3.4, -1.9, 1.9, 3.4].forEach(px => {
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.22, 0.56), creamMat);
      base.position.set(px, 0.24, 1.45);
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.32, 2.05, 0.32), bfGreenMat);
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

    const obBase = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.65, 1.7), terracottaMat);
    obBase.position.set(0, 0.52, -1.35);
    const obColumn = new THREE.Mesh(new THREE.BoxGeometry(1.05, 4.4, 1.05), creamMat);
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
    b.add(platform);

    const backWall = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.5, 0.26), terracottaMat);
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
    const billBoard = createShopSignboard(2.1, 1.25, 0x228b3b, 0xeae0cc, 0xfcd116);
    billBoard.position.set(3.4, 3.35, 0.4);
    b.add(billPostL, billBoard);

    const bus = new THREE.Group();
    const busBody = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.65, 1.7), new THREE.MeshLambertMaterial({ color: 0x0ea5e9 }));
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
    const house = new THREE.Mesh(new THREE.BoxGeometry(4.8, 2.95, 3.4), wallMat);
    house.position.set(0, 1.48, -1.2);
    b.add(house);

    const roof = createCorrugatedRoof(5.4, 4.1, 0x9fa7af, 0.12);
    roof.position.set(0, 3.16, -1.15);
    b.add(roof);

    const verandaRoof = createCorrugatedRoof(4.6, 1.65, 0xb05936, 0.18);
    verandaRoof.position.set(0, 2.38, 1.05);
    b.add(verandaRoof);

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
    const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.26, wallH, 4.4), wallMat);
    sideL.position.set(-2.9, wallH / 2, 0.8);
    const sideR = sideL.clone();
    sideR.position.x = 2.9;
    const frontL = new THREE.Mesh(new THREE.BoxGeometry(1.85, wallH, 0.26), wallMat);
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

    const groundFloor = new THREE.Mesh(new THREE.BoxGeometry(w, 2.3, d), creamMat);
    groundFloor.position.y = 1.15;
    const upperFacade = new THREE.Mesh(new THREE.BoxGeometry(w, 2.0, d), new THREE.MeshLambertMaterial({ color: 0xc8743e }));
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

    const shopSign = createShopSignboard(2.8, 0.82, 0xf5f2eb, 0xc8372d, 0x1e4d7b);
    shopSign.position.set(1.4, 3.0, d / 2 + 0.12);
    b.add(shopSign);

    const door = new THREE.Mesh(new THREE.BoxGeometry(1.25, 1.95, 0.15), darkMat);
    door.position.set(0, 0.98, d / 2 + 0.06);
    b.add(door);

    const fabricColors = [0xd62828, 0xfcd116, 0x146334, 0x1e4d7b, 0xc2410c];
    fabricColors.forEach((fc, i) => {
      const roll = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 1.1, 7),
        new THREE.MeshLambertMaterial({ color: fc })
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

    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), brickMat);
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

    const maquisSign = createShopSignboard(3.1, 0.72, 0x146334, 0xfcd116, 0xd62828);
    maquisSign.position.set(0, 3.25, d / 2 + 0.14);
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

    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), terracottaMat);
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

    const campusSign = createShopSignboard(3.2, 0.72, 0xf4f1ea, 0x1e4d7b, 0xd9933c);
    campusSign.position.set(0, h + 0.58, d / 2 - 0.15);
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

    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), creamMat);
    body.position.y = h / 2;
    const cornice = new THREE.Mesh(new THREE.BoxGeometry(w + 0.36, 0.34, d + 0.36), terracottaMat);
    cornice.position.y = h + 0.17;
    const accentBand = new THREE.Mesh(new THREE.BoxGeometry(w + 0.12, 0.3, d + 0.12), terracottaMat);
    accentBand.position.y = 2.42;
    b.add(body, cornice, accentBand);

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

    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshLambertMaterial({ color: 0xd9a86c }));
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

    const techSign = createShopSignboard(3.2, 0.72, 0xf4f1ea, 0x0e7490, 0xd9933c);
    techSign.position.set(0, h + 0.62, d / 2 - 0.1);
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

function buildAllLocationsAndNPCs() {
  const labelsLayer = document.getElementById('labels-layer');
  labelsLayer.innerHTML = '';

  NEIGHBORHOOD_DATA.forEach((loc, idx) => {
    const building = createBuildingMesh(loc);
    building.position.set(loc.buildingPos.x, 0, loc.buildingPos.z);
    building.rotation.y = loc.buildingRotY || 0;
    scene.add(building);

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
    npc.group.userData = { npcId: loc.id };
    npc.group.traverse(obj => {
      if (obj.isMesh) {
        obj.userData = { npcId: loc.id };
        clickableMeshes.push(obj);
      }
    });
    scene.add(npc.group);

    const labelEl = document.createElement('button');
    labelEl.type = 'button';
    labelEl.className = 'npc-label';
    labelEl.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudioFX();
      walkToAndTalk(loc);
    });
    labelsLayer.appendChild(labelEl);

    const entity = { data: loc, group: npc.group, parts: npc.parts, ring, labelEl, phase: idx * 0.9 };
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
  playerGroup.position.set(0, 0, 7.6);
  playerGroup.rotation.y = Math.PI;
  scene.add(playerGroup);
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

function walkToAndTalk(loc) {
  playFX('click');
  closeDialogue();
  if (!playerGroup) {
    openDialogue(loc);
    return;
  }
  const angle = Math.atan2(playerGroup.position.x - loc.pos.x, playerGroup.position.z - loc.pos.z);
  state.autoWalkTarget = {
    x: loc.pos.x + Math.sin(angle) * 2.2,
    z: loc.pos.z + Math.cos(angle) * 2.2,
    openNpc: loc
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
    playerGroup.position.x += (vx / len) * speed * dt;
    playerGroup.position.z += (vz / len) * speed * dt;
    playerGroup.rotation.y = Math.atan2(vx, vz);
  } else if (state.autoWalkTarget) {
    const dx = state.autoWalkTarget.x - playerGroup.position.x;
    const dz = state.autoWalkTarget.z - playerGroup.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 0.48) {
      const npcToOpen = state.autoWalkTarget.openNpc;
      state.autoWalkTarget = null;
      if (npcToOpen) openDialogue(npcToOpen);
    } else {
      playerGroup.position.x += (dx / dist) * (speed * 1.2) * dt;
      playerGroup.position.z += (dz / dist) * (speed * 1.2) * dt;
      playerGroup.rotation.y = Math.atan2(dx, dz);
    }
  }

  // Contourner doucement le socle central du drapeau (0, 2)
  const fDx = playerGroup.position.x;
  const fDz = playerGroup.position.z - 2;
  const fDist = Math.hypot(fDx, fDz);
  if (fDist < 2.65 && fDist > 0.001) {
    playerGroup.position.x = (fDx / fDist) * 2.65;
    playerGroup.position.z = 2 + (fDz / fDist) * 2.65;
  }

  playerGroup.position.x = Math.max(-29, Math.min(29, playerGroup.position.x));
  playerGroup.position.z = Math.max(-18, Math.min(30, playerGroup.position.z));

  const isMoving = manualMove || Boolean(state.autoWalkTarget);
  if (isMoving) {
    const swing = Math.sin(elapsed * 12) * 0.65;
    playerParts.leftLeg.rotation.x = swing;
    playerParts.rightLeg.rotation.x = -swing;
    playerParts.leftArmPivot.rotation.x = -swing * 0.7;
    playerParts.rightArmPivot.rotation.x = swing * 0.7;
    stepTimer += dt;
    if (stepTimer > 0.34) {
      stepTimer = 0;
      playFX('step');
    }
  } else {
    playerParts.leftLeg.rotation.x *= 0.8;
    playerParts.rightLeg.rotation.x *= 0.8;
    playerParts.leftArmPivot.rotation.x *= 0.8;
    playerParts.rightArmPivot.rotation.x *= 0.8;
  }

  let closestNpc = null;
  let closestDist = 4.3;

  npcEntities.forEach(npc => {
    const dx = playerGroup.position.x - npc.group.position.x;
    const dz = playerGroup.position.z - npc.group.position.z;
    const dist = Math.hypot(dx, dz);

    npc.group.position.y = Math.sin(elapsed * 2.6 + npc.phase) * 0.04;
    npc.ring.scale.setScalar(1 + Math.sin(elapsed * 3 + npc.phase) * 0.07);

    if (dist < 6.8) {
      npc.group.rotation.y = Math.atan2(dx, dz);
      npc.parts.rightArmPivot.rotation.z = -2.35 + Math.sin(elapsed * 8) * 0.32;
    } else {
      npc.parts.rightArmPivot.rotation.z *= 0.9;
    }

    if (dist < closestDist) {
      closestDist = dist;
      closestNpc = npc.data;
    }

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
  });

  state.nearbyNpc = closestNpc;
  const promptEl = document.getElementById('proximity-prompt');
  if (closestNpc && !state.activeNpc) {
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

  const targetLookY = (state.activeNpc && window.innerWidth < 640) ? -0.35 : 1.4;
  state.lookAtY += (targetLookY - state.lookAtY) * 0.1;

  const camX = playerGroup.position.x + Math.sin(state.cameraYaw) * Math.cos(state.cameraPitch) * state.cameraDistance;
  const camY = playerGroup.position.y + 1.8 + Math.sin(state.cameraPitch) * state.cameraDistance;
  const camZ = playerGroup.position.z + Math.cos(state.cameraYaw) * Math.cos(state.cameraPitch) * state.cameraDistance;

  _camGoalVec.set(camX, camY, camZ);
  camera.position.lerp(_camGoalVec, 0.12);
  camera.lookAt(playerGroup.position.x, playerGroup.position.y + state.lookAtY, playerGroup.position.z);

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

function openDialogue(loc) {
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
  switchTab('dialogue');

  const sheet = document.getElementById('dialogue-sheet');
  sheet.style.transform = '';
  document.getElementById('dialogue-modal').classList.remove('hidden');

  // Masquer le pad tactile sur mobile quand le bottom sheet est ouvert
  if (window.innerWidth < 640) {
    document.getElementById('dpad-controls').classList.add('hidden');
  }

  const firstLine = loc.dialogues && loc.dialogues[0] ? loc.dialogues[0].en : '';
  if (firstLine) speakEnglish(firstLine, false, loc.voice);
}

function closeDialogue() {
  state.activeNpc = null;
  hideQuizFeedbackBanner();
  document.getElementById('dialogue-modal').classList.add('hidden');
  const sheet = document.getElementById('dialogue-sheet');
  if (sheet) sheet.style.transform = '';
  document.getElementById('dpad-controls').classList.remove('hidden');
  stopCurrentSpeech();
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
      else if (state.activeNpc) closeDialogue();
      return;
    }

    if (isTyping || isAnyBlockingModalOpen()) return;

    if (e.key === ' ' && state.nearbyNpc && !state.activeNpc) {
      e.preventDefault();
      openDialogue(state.nearbyNpc);
      return;
    }
    mapKey(e.key, true);
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
    showToast(`Bienvenue sur DAVID Speak, ${state.profile.name} !`);
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
    if (state.nearbyNpc) openDialogue(state.nearbyNpc);
  });

  document.getElementById('btn-close-dialogue').addEventListener('click', closeDialogue);

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
    showToast(`Bon retour sur DAVID Speak, ${state.profile.name} !`);
  }
});
