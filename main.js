var E63N59 = {
    spawn: 'S1',
    phase: 'phase2',
    energyInfo: [
        {wpos: {x:17, y:30}, wdir: {x:0, y:1}, sid:'57fc4f263435b4585718b158'},
        {wpos: {x:7, y:30}, wdir: {x:0, y:1}, sid:'57fc44dbff2414b02896117a'},
    ],
};

var rooms = {
    E63N59: E63N59,
};

var room_targ = 'E64N59';
var army_stage = new RoomPosition(24, 42, 'E63N59');

var partOrder = function(a, b) {
    if (a == TOUGH) return -1;
    return 0;
};

var sumParts = function(body) {
    var out = 0;
    for (var i in body) out += BODYPART_COST[body[i]];
    return out;
};

var maxBody = function(template, en) {
    tsum = sumParts(template);
    times = Math.floor(en/tsum);
    out_body = [];
    for (var i=0; i < times; i++) out_body = out_body.concat(template);
    return out_body.sort(partOrder);
};

var maxSpawnEnergy = function(r) {
    var eCap = EXTENSION_ENERGY_CAPACITY[Game.rooms[r].controller.level];
    return (Game.rooms[r].find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_SPAWN}}).length*SPAWN_ENERGY_CAPACITY + Game.rooms[r].find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_EXTENSION}}).length*eCap);
};


// CONCAT phases.js

// CONCAT bodies.js

// CONCAT role.builder.js
// CONCAT role.claimer.js
// CONCAT role.defender.js
// CONCAT role.drudge.js
// CONCAT role.energyMiner.js
// CONCAT role.healer.js
// CONCAT role.hunter.js
// CONCAT role.maintainer.js
// CONCAT role.mover.js
// CONCAT role.paver.js
// CONCAT role.resourceMiner.js
// CONCAT role.scruffy.js
// CONCAT role.spawner.js
// CONCAT role.support.js
// CONCAT role.tank.js
// CONCAT role.towerFiller.js
// CONCAT role.upgrader.js
// CONCAT role.wallMaintainer.js

// CONCAT link.js
// CONCAT tower.js

// CONCAT queue.js

// CONCAT cmd.js

var roles = {
    builder: builder,
    claimer: claimer,
    defender: defender,
    drudge: drudge,
    energyMiner: energyMiner,
    // harvester: harvester,
    healer: healer,
    // hoarder: hoarder,
    hunter: hunter,
    maintainer: maintainer,
    mover: mover,
    paver: paver,
    resourceMiner: resourceMiner,
    scruffy: scruffy,
    spawner: spawner,
    support: support,
    tank: tank,
    towerFiller: towerFiller,
    upgrader: upgrader,
    wallMaintainer: wallMaintainer,

    linker: linker,
    tower: tower,
};

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
    if (true) {
        
        for (var i in Memory.myRooms) {
            var r = Memory.myRooms[i];
            var curroom = Game.rooms[r].memory;
            phases[curroom.phase](r);
            // every 20 ticks, calculate the maximum spawn energy (mse) available
            if (Game.time % 20 == 0) {
                curroom.mse = maxSpawnEnergy(r);
            }
            // Run spawning algorithm (described above, each room gets it's own spawn queue)
            spawn(r);
        }

        // Set targets (cuts down on CPU time by only searching for targets once per role per tick)
        var targets = {};
        for (var r in roles) {
            targets[r] = roles[r].targets();
        }

        var test = [0, ''];
        var next = [];
        // Run correct role per creep
        for (var name in Game.creeps) {
            try {
                var creep = Game.creeps[name];
                var creepHomePhase = Game.rooms[creep.memory.home].memory.phase;
                var stime = Game.cpu.getUsed();
                if (creep.memory.qstate != '') {
                    queue[creepHomePhase](creep);
                }
                else {
                    roles[creep.memory.role][creepHomePhase](creep, targets);
                }
            }
            catch(err) {
                console.log("Error with " + name); // + ", " + Game.creeps[n].memory.role); 
                console.log(err)
            }

            next.push(name);

            if (test[0] < (Game.cpu.getUsed()-stime)) {
                test[0] = (Game.cpu.getUsed()-stime)
                test[1] = name + ' ' + creep.memory.role;
            }
        }
        // console.log(test[1] + ' ' + test[0]);

        // Compare aliveLastTick with Game.creeps (if no aliveLastTick, set to aliveThisTick and move on)
        // spawn accordingly, clear memory, logify
        if (Memory.aliveLastTick.length) {
            for (var i in Memory.aliveLastTick) {
                var n = Memory.aliveLastTick[i];
                if (!Game.creeps[n]) {
                    var cMem = Memory.creeps[n];
                    if (cMem) {
                        var cRoom = Game.rooms[cMem.home].memory;
                        cMem.qstate = '';
                        if (!cMem.dontSpawn) {
                            if (cMem.role == 'energyMiner' || cMem.role == 'spawner') {
                                cRoom[cMem.phase].spawnq.unshift(cMem);
                            }
                            else {
                                cRoom[cMem.phase].spawnq.push(cMem);
                            }
                        }
                        console.log(n + ' (' + cMem.role + ', ' + cMem.home + ')' + ' dieded.');
                        delete Memory.creeps[n];
                    }
                }
            }
        }
        Memory.aliveLastTick = next;


        // Run towers
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            var towers = Game.rooms[r].find(FIND_MY_STRUCTURES, {filter:(s)=>{return s.structureType == STRUCTURE_TOWER}});
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

        // Check if running a command
        if (Memory.cmd) {
            var m = /\s*(\w+)\s*(.*)/.exec(Memory.cmd);
            if (m != null) {
                var command = m[1];
                var argsStr = m[2];
                var args = {};
                while (argsStr != '' && argsStr != null) {
                    m = /\s*-(.+?):\s*(.+?)(?:$|(?:,\s+(.*)))/.exec(argsStr);
                    if (m != null) {
                        args[m[1]] = m[2];
                        argsStr = m[3];
                    }
                    else {
                        break;
                    }
                }
                if (cmd[command]) {
                    cmd[command](args);
                }
                else {
                    console.log('Available commands: ' + Object.keys(cmd));
                }
                delete Memory.cmd
            }
            else {
                console.log("Try again, bitch")
            }
        }
        
        
        
    }
};