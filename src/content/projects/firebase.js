export const tags = ['Unreal Engine', 'C++', 'Gameplay systems', 'Enemy AI', 'First-person shooter'];

export default {
  slug: 'firebase',
  title: 'Firebase',
  shortTitle: 'Firebase',
  status: 'In development',
  engine: 'Unreal Engine 5.4',
  language: 'C++',
  kind: 'Independent FPS project',
  genre: 'Single-player / first-person base defense',
  platform: 'Windows PC',
  role: 'Gameplay Programmer / AI & Systems Developer',
  summary: 'Hold the line at Firebase Hammer through an escalating battle for survival.',
  description: 'A Vietnam War-era, single-player first-person defense game set during the Tet Offensive, built in Unreal Engine 5.4.',
  overview: 'Firebase puts the player in the boots of a soldier defending Firebase Hammer during the Tet Offensive. Enemy forces escalate from riflemen to RPG teams, heavy machine guns, mortar crews, and armored vehicles. Between attacks, the player must manage ammunition, repair their tactical position, and prepare for the next assault, while friendly soldiers and limited fire support help keep the base standing.',
  image: '/media/projects/firebase/thumbnail.png',
  imageAlt: 'Firebase title over an in-engine view of Firebase Hammer, with sandbag defenses, a watchtower, and a helicopter',
  availability: 'In development; project trailer available',
  heroImage: null,
  heroImageAlt: '',
  gallery: [],
  links: [],
  video: {
    type: 'file',
    src: '/media/projects/firebase/trailer.mp4',
    mime: 'video/mp4',
    title: 'Firebase — Project Trailer'
  },
  tags,
  facts: [
    ['Project type', 'Independent game in development'],
    ['Setting', 'Vietnam War / Tet Offensive'],
    ['Camera', 'First-person'],
    ['Core loop', 'Defend, resupply, prepare, survive'],
    ['Engine / language', 'Unreal Engine 5.4 / C++'],
    ['Focus', 'Gameplay programming, AI, combat systems']
  ],
  highlights: [
    'Escalating main waves and subwaves change the enemy mix and pressure on the firebase.',
    'Distinct AI behaviors for riflemen, RPG teams, heavy weapons, mortar crews, tanks, and friendly defenders.',
    'Player-controlled artillery and air support create high-impact tactical decisions during firefights.',
    'An evolving combat loop includes weapon handling, supply delivery, day/night visibility, and save-game progression.'
  ],
  responsibilities: [
    ['Enemy and friendly AI', 'Developed combat behaviors for several enemy classes, including advancing riflemen, repositioning RPG units, heavy-gun emplacements, mortar operators, and tanks. Built supporting friendly AI behaviors for defending the firebase.'],
    ['Wave progression and battlefield pacing', 'Implemented main-wave and subwave management, enemy composition and concurrency rules, inter-wave downtime, and progression that introduces increasingly dangerous threats.'],
    ['Weapons and player interactions', 'Worked on first-person weapon behavior for the M16A1, M79, M72 LAW, mounted machine guns, grenades, aiming, reloading, and handling details such as rifle jamming and cleaning.'],
    ['Fire support, resupply, and persistence', 'Integrated radio-targeted artillery and aircraft attacks, helicopter resupply and reinforcement sequences, nighttime illumination, and wave-based save/load systems.']
  ],
  features: [
    'Escalating main waves and subwaves',
    'Rifle, RPG, DShK, and mortar enemy behaviors',
    'Armored tank encounters and LAW counterplay',
    'Friendly soldiers with changing combat behavior',
    'Artillery, strafing runs, and napalm support',
    'Helicopter supply and reinforcement events',
    'M16A1 malfunction and cleaning mechanics',
    'M79 grenade launcher and M72 LAW handling',
    'Mounted M60 and M2 defensive weapons',
    'Day/night cycle with illumination rounds',
    'Ammunition and medical supply management',
    'Inter-wave autosave and load-game flow'
  ],
  goals: [
    'Make each assault feel more desperate as enemy firepower and tactics evolve.',
    'Reward players for shifting between defensive positions instead of staying in one spot.',
    'Make resupply, limited heavy weapons, and fire-support timing matter.',
    'Maintain readable player feedback and reliable AI behavior during crowded firefights.'
  ],
  technical: [
    'Gameplay is developed in Unreal Engine 5.4 with C++ systems for combat, AI, interaction, and wave progression.',
    'Enemy archetypes use different movement, targeting, attack, and repositioning logic to pressure defenders from several directions.',
    'Wave logic coordinates enemy composition, combat pacing, and transitions into preparation periods.',
    'Player systems combine first-person weapon handling, ammunition inventory, tactical support interactions, and saving between waves.',
    'The project remains in active development; the trailer shows the project rather than indicating a publicly released build.'
  ],
  focus: 'My primary emphasis is the gameplay engineering: connecting AI decision-making, weapons, battle pacing, logistics, and support systems into a demanding single-player defense experience.',
  developers: ['Keith Janish'],
  company: 'Independent project',
  publisher: 'Not announced'
};
