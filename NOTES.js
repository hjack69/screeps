Memory.phase2.spawnq.unshift({'role':'spawner', 'qstate':'', 'qindex':0, 'phase':'phase2'});
Memory.phase2.spawnq.push({'role':'defender', 'phase':'phase2'});

for(var i in Memory.creeps) {if(!Game.creeps[i]) {delete Memory.creeps[i];}}