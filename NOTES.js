// CURRENT ROOM
'E19S58'

// Creating a new something
Game.rooms['E19S58'].createConstructionSite(24, 45, STRUCTURE_EXTENSION)
for (var v = 29; v <= 40; v++) { Game.rooms['E19S58'].createConstructionSite(48, v, STRUCTURE_WALL); }
STRUCTURE_RAMPART // pass-through wall
STRUCTURE_TOWER 
STRUCTURE_ROAD
STRUCTURE_SPAWN

// Destroying old creeps by body parts
for (var c in Game.creeps) { if (!(Game.creeps[c].body[2].type == 'move' && Game.creeps[c].body[3].type == 'move')) { Game.creeps[c].suicide() } }


for (var c in Game.creeps) { if (Game.creeps[c].memory.role == 'builder' || Game.creeps[c].memory.role ==  'paver') { console.log(c); } }

for (var v=0; v < Game.rooms['E19S58'].memory.roads.length; v++){ var p = Game.rooms['E19S58'].memory.roads[v]; Game.rooms['E19S58'].createConstructionSite(p.x, p.y, STRUCTURE_ROAD); }


function shuffle (arr) {
    var i = 0, j = 0, temp = null;
    for (i = arr.length-1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

Memory.spawn_queue = shuffle([
    'upgrader', 'upgrader', 'upgrader', 'upgrader', 
    'harvester', 'harvester', 'harvester', 'harvester',
    'mover', 'mover',
    'paver', 'paver',
    'builder', 'builder', 'builder',
    'towerFiller', 'towerFiller', 
    'maintainer', 'maintainer', 'maintainer'
    ]);
    
    
Memory.phase2.spawnq.unshift({'role':'spawner', 'qstate':'', 'qindex':0, 'phase':'phase2'});
Memory.phase2.spawnq.push({'role':'defender', 'phase':'phase2'});

for(var i in Memory.creeps) {if(!Game.creeps[i]) {delete Memory.creeps[i];}}