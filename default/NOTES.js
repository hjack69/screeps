Memory.rooms.E13S56.phase2.spawnq.unshift({'role':'', 'qstate':'', 'qindex':0, 'phase':'phase2', 'home':'E13S56'});

var randint = function(s, b) {return Math.floor((Math.random()*b)+s);}

for (var n in Game.creeps) {if (Game.creeps[n].memory.role == 'scruffy' && Game.creeps[n].home == 'E58S8') {console.log(n)}}

for(var i in Memory.creeps) {if(!Game.creeps[i]) {delete Memory.creeps[i];}}