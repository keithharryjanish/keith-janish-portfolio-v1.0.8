export const tags = ['Unreal Engine','C++','Frontend','Player experience','VFX'];

export default {
 slug:'clockwork-trials', number:'02', title:'Clockwork Trials', shortTitle:'Clockwork\nTrials',
 status:'Released', engine:'Unreal Engine', language:'C++', kind:'Team capstone', genre:'First-person time-loop puzzle', platform:'Windows PC · itch.io',
 role:'Frontend / UX / VFX Programmer',
 summary:'One facility. A missile launch. Sixty seconds to change the outcome.',
 description:'A first-person time-loop puzzle game about stopping a nuclear missile launch inside a secured facility.',
 overview:'Enter a secured nuclear launch facility as a time traveler trying to stop a missile launch. Every 60 seconds, the loop resets. Gather NPC clues, solve connected puzzles, unlock paths, and use what you learned from earlier attempts to reach and disable the missile before time runs out.',
 image:'/media/clockwork-trials.png', imageAlt:'Clockwork Trials title artwork in cream on a burgundy background',
 links: [
  {label: 'Play Windows build', url: 'https://up-n-at-it-games.itch.io/clockwork-trials', primary: true}
 ],
 video: null,
 tags,
 facts:[['Project type','Released game / student capstone'],['Camera','First-person'],['Timeline','Released capstone build'],['Audience','Players who enjoy puzzle chains, time pressure, and learning through repeated attempts'],['Ownership','Team project / student capstone']],
 highlights:['Publicly released as a downloadable Windows build.','A 60-second loop turns repeated attempts into knowledge and route mastery.','Readable HUD, timer danger feedback, interaction prompts, and result flow.'],
 responsibilities:[
 ['Frontend & menu flow','Built and refined HUD feedback, menus, results, credits, controls UI, and accessibility-facing UI polish.'],
 ['Interaction clarity','Supported readable object interactions through prompts, reticle changes, and feedback for gameplay state changes.'],
 ['Time pressure & visual effects','Integrated feedback and visual effects for the countdown, loop-reset moments, puzzle interactions, and overall game clarity.'],
 ['Team release','Worked with the team to ship a public Windows build and present the completed capstone.']
 ],
 features:['60-second countdown and loop resets','First-person controls','Interactable object framework','NPC clues and dialogue','Keypads and randomized codes','Memory puzzle progression','Wire-cutting puzzles','Locked doors and connected-object puzzles','Ladder traversal','Timer danger HUD','Interaction prompts and reticle feedback','Results, credits, pause, options, and controls UI','Player feedback VFX and loop-reset presentation'],
 goals:['Create urgency while rewarding knowledge gained in previous loops.','Keep the HUD readable and reactive without obscuring the facility.','Make puzzle gates and required interactions clear.','Help players learn, retry, and optimize their route through consistent clues and restart rules.','Ship a compact Windows experience that communicates the team’s gameplay loop.'],
 technical:['Built in Unreal Engine with C++ for single-player Windows PC.','The facility route combines puzzle gates, NPC clues, locked doors, ladders, and the missile-disarm objective.','HUD and menu feedback communicate interactions, countdown danger, results, and restart flow.'],
 focus:'My contribution centers on the player-facing layer: making interaction state, countdown pressure, and restart flow easy to read. The broader puzzle, AI, level, audio, and backend work belongs to the team’s combined effort.',
 developers:['Keith Janish','Jacob Cunningham','Nicolas Anestor','Matthew Tedford'], company:"Up ’n’ At It Games", publisher:'Self-published on itch.io'
};
