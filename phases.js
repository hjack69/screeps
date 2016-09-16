var shuffle = function(arr) {
    var i = 0, j = 0, temp = null;
    for (i = arr.length-1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

var creepDict = function(r, p) {
    return {'role':r, 'qstate':'', 'qindex':0, 'phase':p}
}

phases = {
    emergency: function() {
        Memory.currentEnemies = Game.rooms[Memory.home].find(FIND_HOSTILE_CREEPS);
        if (!Memory.emergencysetup) {
            Memory.revertphase = Memory.phasestr;
            Memory.phasestr = 'emergency';
            Memory.emergency = {};
            Memory.emergency.spawnq = [
                creepDict('defender', 'emergency'), creepDict('defender', 'emergency'), creepDict('defender', 'emergency'), creepDict('defender', 'emergency'),
                creepDict('healer', 'emergency'), creepDict('healer', 'emergency'), creepDict('healer', 'emergency'), creepDict('healer', 'emergency'),
                creepDict('towerFiller', 'emergency'), creepDict('towerFiller', 'emergency'),
                creepDict('wallMaintainer', 'emergency'), creepDict('wallMaintainer', 'emergency'),
                creepDict('upgrader', 'emergency'), creepDict('upgrader', 'emergency')
            ]
            var spawnersToMake = 3-Game.rooms[Memory.home].find(FIND_MY_CREEPS,{filter:(creep)=>{return creep.memory.role=='spawner'}}).length
            for (var i=0; i < spawnersToMake; i++) {
                Memory.emergency.spawnq.push(creepDict('spawner', 'emergency'));
            }
            Game.rooms[Memory.home].find(FIND_MY_CREEPS, {filter:(creep)=>{return creep.memory.role == 'energyMiner'}}).forEach(c => c.memory.phase = 'emergency');
            Memory.emergency.spawnq = shuffle(Memory.emergency.spawnq);
            Memory.emergencysetup = true;
            Game.notify('Emergency initiated at ' + Game.time);
        }
        else if (Memory.currentEnemies.length == 0) {
            Game.rooms[Memory.home].find(FIND_MY_CREEPS, {filter:(creep)=>{return creep.memory.role == 'energyMiner'}}).forEach(c => c.memory.phase = Memory.revertphase);
            Game.notify('Emergency ended at '+ Game.time);
            Memory.phasestr = Memory.revertphase;
        }
    },
    phase1: function() {
        if (!Memory.phase1setup) {
            Memory.phase1 = {};
            Memory.phase1.base = 'E58S8';
            Memory.phasestr = 'phase1';
            Memory.mainspawn = 'S1';
            Memory.phase1.spawnq = [
                creepDict('upgrader', 'phase1'),
                creepDict('spawner', 'phase1'),
                creepDict('upgrader', 'phase1'),
                creepDict('builder', 'phase1'),
                creepDict('builder', 'phase1'),
                creepDict('upgrader', 'phase1'),
                creepDict('paver', 'phase1'),
                creepDict('paver', 'phase1'),
                creepDict('builder', 'phase1')
            ];
            Game.rooms[Memory.phase1.base].memory.energyq = []
            for (var i in Game.rooms[Memory.phase1.base].find(FIND_SOURCES)) {
                Game.rooms[Memory.phase1.base].memory.energyq.push([]);
            }
            Game.rooms[Memory.phase1.base].memory.qpositions = [
                {'targetid': '579faa720700be0674d30ffe', 'waitingpos': {'x': 23, 'y': 14}, 'qdirection': {'x': 1, 'y': 1}, 'canharvest':3, 'harvesting':0},
                {'targetid': '579faa720700be0674d30ffd', 'waitingpos': {'x': 11, 'y': 12}, 'qdirection': {'x': -1, 'y': -1}, 'canharvest':1, 'harvesting':0},
            ];
            Game.rooms[Memory.phase1.base].memory.ignoreContainers = [];
            Memory.phase1setup = true;
        }
    },
    phase2: function() {
        if (!Memory.phase2setup) {
            Memory.phase2 = {};
            Memory.phase2.base = 'E58S8';
            Memory.mainspawn = 'S1';
            Memory.phase2.spawnq = [
                {'role':'energyMiner', 'doing':'dumping', 'sourceid':'579faa720700be0674d30ffd', 'spot':{'x':13, 'y':12}, 'dumpid':'57d610127ad9eb17488d16da', 'phase':'phase2'},
                {'role':'energyMiner', 'doing':'dumping', 'sourceid':'579faa720700be0674d30ffe', 'spot':{'x':22, 'y':15}, 'dumpid':'57d62ea571b05ff46c40f97a', 'phase':'phase2'},
                {'role':'energyMiner', 'doing':'dumping', 'sourceid':'579faa720700be0674d30ffe', 'spot':{'x':22, 'y':16}, 'dumpid':'57d62ea571b05ff46c40f97a', 'phase':'phase2'},
                {'role':'energyMiner', 'doing':'dumping', 'sourceid':'579faa720700be0674d30ffe', 'spot':{'x':22, 'y':17}, 'dumpid':'57d62ea571b05ff46c40f97a', 'phase':'phase2'},
                creepDict('upgrader', 'phase2')
            ].concat(shuffle([
                creepDict('upgrader', 'phase2'), creepDict('upgrader', 'phase2'), creepDict('upgrader', 'phase2'),
                creepDict('paver', 'phase2'), creepDict('paver', 'phase2'), creepDict('paver', 'phase2'), creepDict('paver', 'phase2'),
                creepDict('maintainer', 'phase2'), creepDict('maintainer', 'phase2'),
                creepDict('wallMaintainer', 'phase2'), creepDict('wallMaintainer', 'phase2'),
                creepDict('spawner', 'phase2'), creepDict('spawner', 'phase2'), creepDict('spawner', 'phase2'),
                creepDict('mover', 'phase2'), creepDict('mover', 'phase2'),
                creepDict('builder', 'phase2'), creepDict('builder', 'phase2'),
                creepDict('towerFiller', 'phase2'), creepDict('towerFiller', 'phase2'),
                creepDict('defender', 'phase2'), creepDict('defender', 'phase2'), creepDict('healer', 'phase2')
            ]));
            Game.rooms[Memory.phase2.base].memory.energyq = []
            for (var i in Game.rooms[Memory.phase2.base].find(FIND_SOURCES)) {
                Game.rooms[Memory.phase2.base].memory.energyq.push([]);
            }
            Game.rooms[Memory.phase1.base].memory.qpositions = [
                {'targetid': '57d62ea571b05ff46c40f97a', 'waitingpos': {'x': 23, 'y': 14}, 'qdirection': {'x': 1, 'y': 0}, 'canharvest':1, 'harvesting':0},
                {'targetid': '57d610127ad9eb17488d16da', 'waitingpos': {'x': 12, 'y': 12}, 'qdirection': {'x': -1, 'y': -1}, 'canharvest':1, 'harvesting':0},
            ];
            Game.rooms[Memory.phase2.base].memory.ignoreContainers = ['57d610127ad9eb17488d16da', '57d62ea571b05ff46c40f97a'];
            Memory.phasestr = 'phase2';
            Memory.phase2setup = true;
        }
    }
}

module.exports = phases;