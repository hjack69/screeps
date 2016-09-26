Memory.rooms.E58S8.phase2.spawnq.unshift({'role':'', 'qstate':'', 'qindex':0, 'phase':'phase2', 'home':'E58S8'});
Memory.rooms.E58S7.phase2.spawnq.unshift({'role':'', 'qstate':'', 'qindex':0, 'phase':'phase2', 'home':'E58S7'});

var randint = function(s, b) {return Math.floor((Math.random()*b)+s);}

for(var i in Memory.creeps) {if(!Game.creeps[i]) {delete Memory.creeps[i];}}