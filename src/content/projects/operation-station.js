export const tags = ['Unity','C#','Gameplay systems','Systems design','Prototype'];

export default {
 slug:'operation-station', number:'01', title:'Operation Station', shortTitle:'Operation\nStation',
 status:'Released', engine:'Unity', language:'C#', kind:'Midterm Project', genre:'Systems / strategy prototype', platform:'PC · itch.io',
 role:'Gameplay Programmer / Systems Designer',
 summary:'Build the station. Manage the threat. Fire the super weapon.',
 description:'A systems-driven Unity prototype about building, defending, and operating a station-sized super weapon.',
 overview:'Build your station and super weapon to destroy the planet. Operation Station connects construction, objectives, station state, and player feedback into a compact build-and-operate loop. The goal is immediately readable, with multiple systems shaping how the player gets there.',
 image:'/media/operation-station.png', imageAlt:'Operation Station official trailer artwork with a planet in space',
 links: [
  {label: 'Play build', url: 'https://keith-j.itch.io/operation-station', primary: true},
  {label: 'Watch trailer', url: 'https://www.youtube.com/watch?v=9nlNoeEMFZk'}
 ],
 video: {type: 'youtube', id: '9nlNoeEMFZk', title: 'Operation Station official trailer'},
 tags,
 facts:[['Project type','Game prototype'],['Camera','Top-down / management'],['Timeline','Released prototype'],['Audience','Players who enjoy compact build-and-operate systems games'],['Ownership','Personal / student portfolio project']],
 highlights:['A public playable build and official trailer.','A complete loop connecting construction, operation, and objectives.','Unity / C# gameplay systems with readable player feedback.'],
 responsibilities:[
 ['Core gameplay loop','Built the moment-to-moment interactions that connect station construction, operation, and the final objective.'],
 ['Station & super weapon systems','Implemented the station and super weapon systems in C#, structuring gameplay around clear systems and state changes.'],
 ['Objective feedback','Created player-facing feedback for objective progress and changes in gameplay state.'],
 ['Release preparation','Prepared the public build and its trailer/build presentation for portfolio review.']
 ],
 features:['Station construction and operation','Objective progression','Gameplay-state feedback','Prototype balancing and pacing','Trailer and playable-build presentation'],
 goals:['Make the objective immediately understandable.','Keep interactions fast while maintaining interlocking systems.','Demonstrate practical Unity and C# implementation through a complete playable prototype.'],
 technical:['Gameplay code is organized around clear systems and state changes.','Player actions, objective progress, and station state connect through readable feedback.','The compact scope supports a complete loop and a public build for hands-on review.'],
 focus:'A complete, compact prototype showing how clear objectives and connected gameplay systems can make a small scope feel purposeful.',
 developers:['Keith Janish', 'Christian Nelson', 'Alexander Swanson', 'Erick Marin'], company:'Midterm Project', publisher:'Self-published on itch.io'
};
