var rE63N59 = {
    spawn: 'S1',
    phase: 'phase2',
    energyInfo: [
        {wpos: {x:17, y:30}, wdir: {x:0, y:1}, sid:'57fc4f263435b4585718b158'},
        {wpos: {x:7, y:30}, wdir: {x:0, y:1}, sid:'57fc44dbff2414b02896117a'},
    ],
};
var rE61N58 = {
    spawn: 'S2',
    phase: 'phase2',
    energyInfo: [
        {wpos: {x:43, y:39}, wdir: {x:-1, y:-1}, sid:'580058b305abae6472c32192'},
        {wpos: {x:6, y:41}, wdir: {x:0, y:-1}, sid:'58004617225d0f856c6cc10d'},
    ]
};
var rE64N58 = {
    spawn: 'S3',
    phase: 'phase2',
    energyInfo: [
        {wpos: {x:32, y:43}, wdir: {x:0, y:-1}, sid:'5800fa18fb6b6b8d7c5cdcda'},
        {wpos: {x:30, y:28}, wdir: {x:1, y:1}, sid:'5800c56aa01b5451543e4347'},
    ]
};

var rooms = {
    E63N59: rE63N59,
    E61N58: rE61N58,
    E64N58: rE64N58,
};

var room_targ = 'E61N57';
var army_stage = new RoomPosition(26, 42, 'E63N59');
var army_deploy = true;

var ign = ['57fc44dbff2414b02896117a', '57fc4f263435b4585718b158', '58004617225d0f856c6cc10d', '5800fa18fb6b6b8d7c5cdcda', '580514436c47dea9463e6a01'];

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
    if (out_body.length > 50) return out_body.slice(0, 50).sort(partOrder);
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



// CONCAT energyQueue.js



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

// CONCAT renewQueue.js


var spawn = function (r) {
    try {
        var room = Game.rooms[r].memory[rooms[r].phase];
        if (room.spawnq.length) {
            room.enableRenew = false;
            var body = bodies[room.spawnLevel][room.spawnq[0].role];
            // if no spawners for current room
            if (Game.rooms[r].find(FIND_MY_CREEPS, {filter: (creep) => {return creep.memory.role == 'spawner' && creep.memory.home == r;}}).length == 0 ||
                Game.rooms[r].find(FIND_MY_CREEPS, {filter: (creep) => {return creep.memory.role == 'energyMiner' && creep.memory.home == r;}}).length == 0) {
                body = bodies[0][room.spawnq[0].role];
            }
            var newName = Game.spawns[rooms[r].spawn].createCreep(body, undefined, room.spawnq[0]);
            if (newName != ERR_BUSY && newName != ERR_NOT_ENOUGH_ENERGY) {
                console.log('Spawning new ' + room.spawnq[0].role + ', ' + newName + ', at ' + rooms[r].spawn);
                room.spawnq.shift();
            }
        }
        else room.enableRenew = true;
    }
    catch (err) {
        console.log(r + ': ' + err)
    }
};

module.exports.loop = function () {
    if (true) {

        for (var r in rooms) {
            var roomInf = rooms[r];
            var roomObj = Memory.rooms[r];
            phases[roomInf.phase](r);
            // check hits of spawn, if less than half and there's an available safe mode, activate it
            if (Game.spawns[roomInf.spawn].hits < Game.spawns[roomInf.spawn].hitsMax) {
                if (Game.rooms[r].controller.safeModeAvailable) {
                    var o = Game.rooms[r].controller.activateSafeMode();
                    var s = '';
                    if (o == 0) {
                        s = 'Successfully activated safe mode in room '+r;
                    }
                    else {
                        s = 'Error activating safe mode: '+o;
                    }
                    console.log(s);
                    Game.notify(s, 0);
                }
            }

            // every 20 ticks, calculate the maximum spawn energy (mse) available
            if (Game.time % 20 == 0) {
                roomObj.mse = maxSpawnEnergy(r);
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
                var creepHomePhase = rooms[creep.memory.home].phase;
                var stime = Game.cpu.getUsed();
                if (!creep.memory.energyQ) creep.memory.energyQ = {state: '', index: ''};
                if (!creep.memory.renewQ) creep.memory.renewQ = {state: ''};
                if (creep.memory.renewQ.state != '') {
                    renewQueue(creep, targets);
                }
                else if (creep.memory.energyQ.state != '') {
                    energyQueue[creepHomePhase](creep);
                }
                else {
                    if (['healer', 'defender', 'tank', 'hunter', 'support', 'upgrader'].indexOf(creep.memory.role) == -1 &&
                            Memory.rooms[creep.memory.home][creepHomePhase].spawnq.length) {
                        roles.spawner[creepHomePhase](creep, targets);
                    }
                    else roles[creep.memory.role][creepHomePhase](creep, targets);
                }
            }
            catch(err) {
                console.log("Error with " + name + '\n' + err);
            }

            next.push(name);

            if (test[0] < (Game.cpu.getUsed()-stime)) {
                test[0] = (Game.cpu.getUsed()-stime);
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
                        cMem.energyQ.state = '';
                        cMem.renewQ.state = '';
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


        // Run towers & links
        for (var r in rooms) {
            var towers = Game.rooms[r].find(FIND_MY_STRUCTURES, {filter:(s)=>{return s.structureType == STRUCTURE_TOWER}});
            for (var t in towers) {
                roles.tower[rooms[r].phase](towers[t], targets);
            }
            var links = Game.rooms[r].find(FIND_MY_STRUCTURES, {filter:(s) => {return s.structureType == STRUCTURE_LINK}});
            for (var l in links) {
                roles.linker[rooms[r].phase](links[l], targets);
            }
        }

        // Notify about 90% CPU limit (maybe add bucket amount)
        if (Game.cpu.getUsed() > Game.cpu.tickLimit*0.90) {
            Game.notify('More that 90% CPU time used this tick, '+Game.cpu.bucket+' in bucket');
            console.log('More that 90% CPU time used this tick, '+Game.cpu.bucket+' in bucket');
        }

        // Check if running a command
        if (Memory.cmd && Memory.cmd != '') {
            try {
                var m = /\s*(\w+)\s*(.*)/.exec(Memory.cmd);
                if (m != null) {
                    var command = m[1];
                    var argsStr = m[2];
                    var args = {};
                    while (argsStr != '' && argsStr != null) {
                        m = /\s*(.+?):\s*(.+?)(?:$|(?:\s+(.*)))/.exec(argsStr);
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
                }
                else {
                    console.log('Malformed');
                }
            }
            catch (err) {
                console.log('Error in cmd: ' + err);
            }
            finally {
                delete Memory.cmd
            }
        }



    }
};