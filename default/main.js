var roles = {
    //harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    paver: require('role.paver'),
    maintainer: require('role.maintainer'),
    mover: require('role.mover'),
    towerFiller: require('role.towerFiller'),
    spawner: require('role.spawner'),
    energyMiner: require('role.energyMiner'),
    defender: require('role.defender'),
    healer: require('role.healer'),
    wallMaintainer: require('role.wallMaintainer'),
    scruffy: require('role.scruffy'),
    resourceMiner: require('role.resourceMiner'),
    hunter: require('role.hunter'),
    //hoarder: require('role.hoarder'),
    claimer: require('role.claimer'),
    drudge: require('role.drudge'),
    tower: require('tower'),
    linker: require('link')
};
var queue = require('queue');
var phases = require('phases');
var bodies = require('bodies').bodies;


var spawn = function (r) {
    var room = Game.rooms[r].memory[Game.rooms[r].memory.phase];
    if (room.spawnq.length) {
        var body = bodies[room.spawnLevel][room.spawnq[0].role];
        // if no spawners for current room
        if (Game.rooms[r].find(FIND_MY_CREEPS, {filter: (creep) => {return creep.memory.role == 'spawner' && creep.memory.home == r;}}).length == 0 ||
            Game.rooms[r].find(FIND_MY_CREEPS, {filter: (creep) => {return creep.memory.role == 'energyMiner' && creep.memory.home == r;}}).length == 0) {
            body = bodies[0][room.spawnq[0].role];
        }
        var newName = Game.spawns[room.spawn].createCreep(body, undefined, room.spawnq[0]);
        if (newName != ERR_BUSY && newName != ERR_NOT_ENOUGH_ENERGY) {
            console.log('Spawning new ' + room.spawnq[0].role + ', ' + newName + ', at ' + room.spawn);
            room.spawnq.shift();
        }
    }
};

module.exports.loop = function () {
    if (false) {
        for (var i in Memory.myRooms) {
            var r = Memory.myRooms[i];
            var curroom = Game.rooms[r].memory;
            phases[curroom.phase](r);
            // Set correct number of current harvesting creeps
            for (var j=0; j<curroom[curroom.phase].energyInfo.length; j++) {
                curroom[curroom.phase].energyInfo[j].harvesting = Game.rooms[r].find(FIND_MY_CREEPS, {filter:(c)=>{return (c.memory.qstate=='harvesting' && c.memory.qindex==j && c.memory.home==r)}}).length;
            }
            // Run spawning algorithm (described above, each room gets it's own spawn queue)
            spawn(r);
        }

        // Set targets (cuts down on CPU time by only searching for targets once per role per tick)
        var targets = {};
        for (var r in roles) {
            targets[r] = roles[r].targets();
        }
    
        var next = [];
        // Run correct role per creep
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            var creepHomePhase = Game.rooms[creep.memory.home].memory.phase;
            if (creep.memory.qstate != '') {
                queue[creepHomePhase](creep);
            }
            else {
                try {
                    roles[creep.memory.role][creepHomePhase](creep, targets);
                }
                catch (err) {
                    //console.log(name);
                }
            }
            next.push(name);
        }

        // Compare aliveLastTick with Game.creeps (if no aliveLastTick, set to aliveThisTick and move on)
            // spawn accordingly, clear memory, logify
        if (Memory.aliveLastTick.length) {
            for (var i in Memory.aliveLastTick) {
                var n = Memory.aliveLastTick[i];
                if (!Game.creeps[n]) {
                    var cMem = Memory.creeps[n];
                    var cRoom = Game.rooms[cMem.home].memory;
                    cMem.qstate = '';
                    if (cMem.role == 'energyMiner' || cMem.role == 'spawner') {
                        cRoom[cMem.phase].spawnq.unshift(cMem);
                    }
                    else if (cMem.role != 'drudge' && cMem.role != 'hunter') {
                        cRoom[cMem.phase].spawnq.push(cMem);
                    }
                    console.log(n + ' (' + cMem.role + ', ' + cMem.home + ')' + ' dieded.');
                    delete Memory.creeps[n];
                }
            }
        }
        Memory.aliveLastTick = next;


        // Run towers
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            var towers = Game.rooms[r].find(FIND_MY_STRUCTURES, {filter:(s)=>{return s.structureType == STRUCTURE_TOWER}})
            for (var t in towers) {
                roles.tower[Game.rooms[r].memory.phase](towers[t], targets);
            }
            var links = Game.rooms[r].find(FIND_MY_STRUCTURES, {filter:(s) => {return s.structureType == STRUCTURE_LINK}});
            for (var l in links) {
                roles.linker[Game.rooms[r].memory.phase](links[l], targets);
            }
        }

        // Notify about 90% CPU limit (maybe add bucket amount)
        if (Game.cpu.getUsed() > Game.cpu.tickLimit*0.90) {
            Game.notify('More that 90% CPU time used this tick, '+Game.cpu.bucket+' in bucket');
            console.log('More that 90% CPU time used this tick, '+Game.cpu.bucket+' in bucket');
        }
    }
};