// CONCAT phases.js
var shuffle = function(arr) {
    var i = 0, j = 0, temp = null;
    for (i = arr.length-1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
};

var phases = {
    emergency: function() {
        // yup
    },
    phase1: function(r) {
        // energy containers not built yet
        var room = Game.rooms[r];
        if (!room.memory.phase1setup) {
            room.memory.phase1 = {
                spawnq:[],
                spawn: '',
                spawnLevel: 0,
                energyQ: [],
                energyInfo: []
            };
            if (r == 'W61N59') {
                room.memory.phase1.spawn = 'S1';
                room.memory.phase1.spawnq = [
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:27, y:41}, dumpid:'', sourceid:'57ef9ce986f108ae6e60cff2', home:'W61N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:7, y:39}, dumpid:'', sourceid:'57ef9ce986f108ae6e60cff1', home:'W61N59', qstate:'', qindex:0},
                    {role:'spawner', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    {role:'spawner', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    {role:'upgrader', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:27, y:41}, dumpid:'', sourceid:'57ef9ce986f108ae6e60cff2', home:'W61N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:7, y:39}, dumpid:'', sourceid:'57ef9ce986f108ae6e60cff1', home:'W61N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:27, y:41}, dumpid:'', sourceid:'57ef9ce986f108ae6e60cff2', home:'W61N59', qstate:'', qindex:0},
                    ].concat(shuffle([
                    // 2 builders
                    {role:'builder', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    {role:'builder', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    // 2 maintainers
                    {role:'maintainer', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    {role:'maintainer', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    // 2 movers
                    {role:'mover', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    {role:'mover', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    // 1 paver
                    {role:'paver', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    // 3 towerFillers
                    {role:'towerFiller', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    {role:'towerFiller', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    {role:'towerFiller', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    // 3 upgraders
                    {role:'upgrader', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    {role:'upgrader', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    // 2 wallMaintainers
                    {role:'wallMaintainer', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    {role:'wallMaintainer', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    // 1 healer
                    {role:'healer', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    // 2 defenders
                    {role:'defender', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                    {role:'defender', phase:'phase1', qstate:'', qindex:0, home:'W61N59'},
                ]));
                room.memory.phase1.energyQ = [[],[]];
                room.memory.phase1.energyInfo = [
                    {harvesting:0, canharvest:4, waitingpos:{x:28, y:43}, qdirection:{x:1, y:0}, targetid:'57ef9ce986f108ae6e60cff2'},
                    {harvesting:0, canharvest:2, waitingpos:{x:9, y:39}, qdirection:{x:1, y:1}, targetid:'57ef9ce986f108ae6e60cff1'}
                ]
            }
            room.memory.phase1setup = true;
        }
    },
    phase2: function(r) {
        // start energy mining
        var room = Game.rooms[r];
        if (!room.memory.phase2setup) {
            room.memory.phase2 = {
                spawnq:[],
                spawn: '',
                spawnLevel: 0,
                energyQ: [],
                energyInfo: []
            };
            if (r == 'W61N59') {
                room.memory.phase2.spawn = 'S1';
                room.memory.phase2.spawnq = [
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:27, y:41}, dumpid:'57fabb753acd730171fd15b6', sourceid:'57ef9ce986f108ae6e60cff2', home:'W61N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:7, y:39}, dumpid:'57fa7978b297331f3b19c1ab', sourceid:'57ef9ce986f108ae6e60cff1', home:'W61N59', qstate:'', qindex:0},
                    {role:'spawner', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    {role:'spawner', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:27, y:41}, dumpid:'57fabb753acd730171fd15b6', sourceid:'57ef9ce986f108ae6e60cff2', home:'W61N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:7, y:39}, dumpid:'57fa7978b297331f3b19c1ab', sourceid:'57ef9ce986f108ae6e60cff1', home:'W61N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:27, y:41}, dumpid:'57fabb753acd730171fd15b6', sourceid:'57ef9ce986f108ae6e60cff2', home:'W61N59', qstate:'', qindex:0},
                ].concat(shuffle([
                    // 2 builders
                    {role:'builder', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    {role:'builder', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    // 2 maintainers
                    {role:'maintainer', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    {role:'maintainer', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    // 2 movers
                    {role:'mover', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    {role:'mover', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    // 1 paver
                    {role:'paver', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    // 3 towerFillers
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    // 3 upgraders
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    // 2 wallMaintainers
                    {role:'wallMaintainer', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    {role:'wallMaintainer', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    // 1 healer
                    {role:'healer', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    // 2 defenders
                    {role:'defender', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                    {role:'defender', phase:'phase2', qstate:'', qindex:0, home:'W61N59'},
                ]));
                room.memory.phase2.energyQ = [[],[]];
                room.memory.phase2.energyInfo = [
                    {harvesting:0, canharvest:1, waitingpos:{x:28, y:43}, qdirection:{x:1, y:0}, targetid:'57fabb753acd730171fd15b6'},
                    {harvesting:0, canharvest:1, waitingpos:{x:9, y:39}, qdirection:{x:1, y:1}, targetid:'57fa7978b297331f3b19c1ab'}
                ]
            }
            room.memory.phase2setup = true;
        }
    },
};

// CONCAT bodies.js
var bodies = [
    // 0
    {
        harvester: [WORK, CARRY, CARRY, MOVE, MOVE],
        upgrader: [WORK, CARRY, CARRY, MOVE, MOVE],
        builder: [WORK, CARRY, CARRY, MOVE, MOVE],
        paver: [WORK, CARRY, CARRY, MOVE, MOVE],
        maintainer: [WORK, CARRY, CARRY, MOVE, MOVE],
        wallMaintainer: [WORK, CARRY, CARRY, MOVE, MOVE],
        mover: [WORK, CARRY, CARRY, MOVE, MOVE],
        towerFiller: [WORK, CARRY, CARRY, MOVE, MOVE],
        spawner: [WORK, CARRY, MOVE],
        energyMiner: [WORK, WORK, CARRY, MOVE],
        defender: [ATTACK, ATTACK, MOVE, MOVE],
        healer: [HEAL, MOVE],
        hoarder: [WORK, CARRY, CARRY, MOVE, MOVE],
        claimer: [WORK, CARRY, CARRY, MOVE, MOVE],
        scruffy: [WORK, CARRY, CARRY, MOVE, MOVE],
        resourceMiner: [WORK, WORK, CARRY, MOVE],
        hunter: [TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE],
    },
    // 1
    {
        harvester: [WORK, CARRY, CARRY, MOVE, MOVE],
        upgrader: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        builder: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        paver: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        maintainer: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        wallMaintainer: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        mover: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
        towerFiller: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
        spawner: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
        energyMiner: [WORK, WORK, WORK, WORK, CARRY, MOVE],
        defender: [TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE],
        hunter: [TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE],
        support: [TOUGH, MOVE, TOUGH, MOVE, MOVE, HEAL, MOVE, HEAL],
        healer: [MOVE, MOVE, HEAL, HEAL],
        hoarder: [WORK, CARRY, CARRY, MOVE, MOVE],
        claimer: [CLAIM, MOVE],
        scruffy: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
        drudge: [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE],
        resourceMiner: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        tank: [TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE]
    },
    // 2
    {
        harvester: [WORK, CARRY, MOVE],
        upgrader: [WORK, WORK, WORK, CARRY, MOVE, MOVE],
        builder: [WORK, WORK, CARRY, MOVE],
        paver: [WORK, CARRY, MOVE],
        maintainer: [WORK, CARRY, MOVE],
        wallMaintainer: [WORK, CARRY, MOVE, CARRY, MOVE],
        mover: [WORK, CARRY, MOVE, CARRY, MOVE],
        towerFiller: [WORK, CARRY, MOVE, CARRY, MOVE],
        spawner: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
        energyMiner: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE],
        defender: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK],
        hunter: [TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK],
        support: [MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL],
        healer: [MOVE, MOVE, HEAL, HEAL],
        hoarder: [WORK, CARRY, MOVE],
        claimer: [CLAIM, MOVE, MOVE],
        scruffy: [WORK, CARRY, MOVE, CARRY, MOVE],
        drudge: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        resourceMiner: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        tank: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
    },
];

// CONCAT role.builder.js
var builder = {
    targets: function() {
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = [
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter: (s) => {return s.structureType == STRUCTURE_CONTAINER}}),
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter: (structure) => {return (structure.structureType == STRUCTURE_WALL)}}),
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER)}}),
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter: (structure) => {return (structure.structureType != STRUCTURE_ROAD)}}),
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES)
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }

        if (creep.carry.energy == 0) {
            creep.memory.qstate = 'entering';
        }
        else {
            var tlist = t.builder[creep.memory.home];
            var target = null;
            for (var i=0; i<tlist.length; i++) {
                if (tlist[i].length) {
                    target = tlist[i][0];
                    break;
                }
            }
            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                upgrader[creep.memory.phase](creep, t);
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' builder: ' + etime);
    },
    emergency: function(creep) {
        var emergencyRole = require('emergency');
        emergencyRole.emergency(creep);
    }
};
builder.phase2 = builder.phase1;
// CONCAT role.claimer.js
var claimer = {
    targets: function() {
        return {
            'E13S55': 'E13S56',
            'E13S56': 'E12S56',
            'E12S56': 'E11S56',
            'E11S56': 'E11S55',
            'E11S55': 'E11S54',
            'E11S54': 'E11S53',
            'E11S53': 'dest'
        };
    },
    phase1: function(creep, t) {
        creep.memory.dontSpawn = false;
        tlist = t.claimer;
        if (tlist[creep.room.name] != 'dest') {
            creep.moveTo(new RoomPosition(25, 25, tlist[creep.room.name]));
        }
        else {
            creep.moveTo(Game.rooms[creep.room.name].controller);
            if (creep.claimController(Game.rooms[creep.room.name].controller) == ERR_GCL_NOT_ENOUGH) {
                creep.reserveController(Game.rooms[creep.room.name].controller);
            }
        }
        // var r = 'E11S53';
        // creep.moveTo(new RoomPosition(29, 32, r));
        // try {
        //     creep.moveTo(Game.rooms[r].controller);
        //     if (creep.claimController(Game.rooms[r].controller) == ERR_GCL_NOT_ENOUGH) {
        //         creep.reserveController(Game.rooms[r].controller);
        //     }
        // }
        // catch (err) {
        //     //console.log(err);
        // }
    }
};
claimer.phase2 = claimer.phase1;
// CONCAT role.defender.js
var defender = {
    targets: function() {
        var out = {waiting:{
            W61N59: new RoomPosition(8, 31, 'W61N59')
        }};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = Game.rooms[r].find(FIND_HOSTILE_CREEPS);
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        var target = creep.pos.findClosestByRange(t.defender[creep.memory.home]);
        if (target) {
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target.pos);
            }
        }
        else {
            creep.moveTo(t.defender.waiting[creep.memory.home]);
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' defender: ' + etime);
    }
};
defender.phase2 = defender.phase1;
defender.emergency = defender.phase1;
// CONCAT role.drudge.js
var drudge = {
    targets: function() {
        var r = 'E13S55';
        var out = {dest: r, targets: [], sources: []};
        try {
            out.targets = Game.rooms[r].find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_SPAWN}});
            out.sources = Game.rooms[r].find(FIND_SOURCES);
            out.controller = Game.rooms[r].controller;
        } catch(err) {}
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        var tlist = t.drudge;
        if (creep.room.name != tlist.dest) {
            creep.moveTo(new RoomPosition(25, 25, tlist.dest));
        }
        else {
            if (!creep.memory.action) {creep.memory.action = 'harvesting';}
            if (creep.carry.energy == 0 && creep.memory.action == 'building') {
                creep.memory.action = 'harvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'harvesting') {
                creep.memory.action = 'building';
            }

            if (creep.memory.action == 'harvesting') {
                var target = creep.pos.findClosestByRange(tlist.sources);
                if (target && creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else if (creep.memory.action == 'building' && creep.memory.workingOn == 'builder') {
                var target = creep.pos.findClosestByRange(tlist.targets);
                if (target && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else if (creep.memory.action == 'building' && creep.memory.workingOn == 'upgrader') {
                var target = tlist.controller;
                if (target && creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {reusePath: 2});
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' drudge: ' + etime);
    }
};
drudge.phase2 = drudge.phase1;
// CONCAT role.energyMiner.js
var energyMiner = {
    targets: function() {
        return null;
    },
    phase1: function(creep) {
        var stime = Game.cpu.getUsed();
        if (!creep.memory.action) {
            creep.memory.action = 'harvesting';
        }
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(25, 25, creep.memory.home);
        }
        else {
            var source = Game.getObjectById(creep.memory.sourceid);
            if (creep.pos.x != creep.memory.spot.x || creep.pos.y != creep.memory.spot.y) {
                creep.moveTo(creep.memory.spot.x, creep.memory.spot.y);
            }
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.spot.x, creep.memory.spot.y);
            }
            if (source.energy == 0 && creep.carry.energy > 0) {
                creep.drop(RESOURCE_ENERGY);
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
    },
    phase2: function(creep) {
        var stime = Game.cpu.getUsed();
        if (!creep.memory.action) {
            creep.memory.action = 'harvesting';
        }
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            if (creep.carry.energy == 0 && creep.memory.action == 'dumping') {
                creep.memory.action = 'harvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'harvesting') {
                creep.memory.action = 'dumping';
            }

            if (creep.memory.action == 'harvesting') {
                var source = Game.getObjectById(creep.memory.sourceid);
                if (creep.pos.x != creep.memory.spot.x || creep.pos.y != creep.memory.spot.y) {
                    creep.moveTo(creep.memory.spot.x, creep.memory.spot.y);
                }
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.memory.spot.x, creep.memory.spot.y);
                }
                if (source.energy == 0) {
                    creep.memory.action = 'dumping';
                }
            }
            else if (creep.memory.action == 'dumping') {
                var dump = Game.getObjectById(creep.memory.dumpid);
                if (dump != null) {
                    if (dump.hits < dump.hitsMax/2) {
                        creep.repair(dump);
                    }
                    else if (_.sum(dump.store) < dump.storeCapacity) {
                        if (creep.transfer(dump, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(dump);
                        }
                    }
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' energyMiner: ' + etime);
    }
};
energyMiner.emergency = energyMiner.phase2;
// CONCAT role.healer.js
var healer = {
    targets: function() {
        var out = {waiting:{
            W61N59: new RoomPosition(5, 31, 'W61N59')
        }};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = [
                Game.rooms[r].find(FIND_MY_CREEPS, {filter:(c)=>{return c.hits < c.hitsMax/2}}),
                Game.rooms[r].find(FIND_MY_CREEPS, {filter:(c)=>{return c.hits < c.hitsMax}})
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            var tlist = t.healer[creep.memory.home];
            var target = null;
            for (var i = 0; i < tlist.length; i++) {
                if (tlist[i].length) {
                    target = creep.pos.findClosestByRange(tlist[i]);
                    break;
                }
            }
            if (target) {
                if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target.pos);
                }
            }
            else {
                creep.moveTo(t.healer.waiting[creep.memory.home]);
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' healer: ' + etime);
    }
};
healer.phase2 = healer.phase1;
healer.emergency = healer.phase1;
// CONCAT role.hunter.js
var hunter = {
    targets: function() {
        var r = 'E11S59';
        var h = new RoomPosition(25, 25, r);
        var ignoreOwners = ['roboboy'];
        var t = {target: null, s_targ: null, t_targ: null};
        try {
            t = [
                h.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (s)=> {return s.structureType == STRUCTURE_TOWER && ignoreOwners.indexOf(s.owner.username) == -1}}),
                h.findClosestByRange(FIND_HOSTILE_SPAWNS, {filter: (s) => {return ignoreOwners.indexOf(s.owner.username) == -1}}),
                h.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (s)=> {return s.structureType == STRUCTURE_EXTENSION && ignoreOwners.indexOf(s.owner.username) == -1}}),
                h.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (s) => {return ignoreOwners.indexOf(s.owner.username) == -1}})
            ];
        }
        catch(err) {}
        var out = {
            deploy: false,
            stage: new RoomPosition(20, 25, 'E13S56'),
            dest: r,
            target: t
        };
        return out;
    },
    phase1: function(creep, t) {
        creep.memory.dontSpawn = true;
        var tlist = t.hunter;
        if (creep.room.name != tlist.dest) {
            if (tlist.deploy) {
                creep.moveTo(new RoomPosition(25, 25, tlist.dest));
            }
            else {
                creep.moveTo(tlist.stage);
            }
        }
        else {
            if (tlist.target.length) {
                var target;
                for (var i=0; i<tlist.target.length; i++) {
                    if (tlist.target[i].length) {
                        target = tlist.target[i][0];
                    }
                }
                if (target && creep.attack(target) == ERR_NOT_IN_RANGE) {
                    target.moveTo(target);
                }
                else {
                    creep.moveTo(tlist.stage);
                }
            }
            else {
                creep.moveTo(tlist.stage);
            }
        }
    }
};
hunter.phase2 = hunter.phase1;
// CONCAT role.maintainer.js
var maintainer = {
    targets: function() {
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = [
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return ([STRUCTURE_CONTAINER, STRUCTURE_ROAD, STRUCTURE_TOWER].indexOf(s.structureType) > -1) && s.hits < s.hitsMax/2}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return ([STRUCTURE_CONTAINER, STRUCTURE_ROAD, STRUCTURE_TOWER].indexOf(s.structureType) > -1) && s.hits < s.hitsMax}})
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            if (creep.carry.energy == 0) {
                creep.memory.qstate = 'entering';
            }
            else {
                var tlist = t.maintainer[creep.memory.home];
                var target = null;
                for (var i=0; i<tlist.length; i++) {
                    if (tlist[i].length) {
                        target = tlist[i][0];
                        break;
                    }
                }
                if (target) {
                    if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    upgrader[Game.rooms[creep.memory.home].memory.phase](creep, t);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' maintainer: ' + etime);
    },
    emergency: function(creep) {
        var e = require('emergency');
        e.emergency(creep);
    }
};
maintainer.phase2 = maintainer.phase1;
// CONCAT role.mover.js
var mover = {
    targets: function() {
        var ignore = [];
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = [
                Game.rooms[r].find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_LINK && s.energy < s.energyCapacity && ignore.indexOf(s.id) == -1}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) < s.storeCapacity && ignore.indexOf(s.id) == -1}})
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(25, 25, creep.memory.home)
        }
        else {
            if (creep.carry.energy == 0) {
                creep.memory.qstate = 'entering'
            }
            else {
                var tlist = t.mover[creep.memory.home];
                var target = null;
                for (var i=0; i<tlist.length; i++) {
                    if (tlist[i].length) {
                        target = tlist[i][0];
                        break;
                    }
                }
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' mover: ' + etime);
    },
    emergency: function(creep, t) {
        var e = require('emergency');
        e.emergency(creep);
    }
};
mover.phase2 = mover.phase1;
// CONCAT role.paver.js
var paver = {
    targets: function() {
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter:(s)=>{return s.structureType == STRUCTURE_ROAD}});
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (creep.carry.energy == 0) {
            creep.memory.qstate = 'entering';
        }
        else {
            var tlist = t.paver[creep.memory.home];
            var target = tlist[0];
            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                builder[Game.rooms[creep.memory.home].memory.phase](creep, t);
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' paver: ' + etime);
    },
    emergency: function(creep, t) {
        var e = require('emergency');
        e.emergency(creep, t);
    }
};
paver.phase2 = paver.phase1;
// CONCAT role.resourceMiner.js
var resourceMiner = {
    targets: function() {
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = {
                mines: Game.rooms[r].find(FIND_MINERALS),
                dump: Game.rooms[r].find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_STORAGE}})
            }
        }
        //out.E58S8.resource = RESOURCE_UTRIUM;
        //out.E58S7.resource = RESOURCE_LEMERGIUM;
        return out;
    },
    phase1: function(creep, t)  {
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        if ((creep.memory.action != 'mining' && creep.memory.action != 'dumping') ||
            (creep.memory.action == 'dumping' && _.sum(creep.carry) == 0)) {
            creep.memory.action = 'mining';
        }
        else if (creep.memory.action == 'mining' && _.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.action = 'dumping';
        }

        var tlist = t.resourceMiner[creep.memory.home];
        if (creep.memory.action == 'mining') {
            var target = creep.pos.findClosestByRange(tlist.mines);
            if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else if (creep.memory.action == 'dumping') {
            var target = creep.pos.findClosestByPath(tlist.dump);
            if (creep.transfer(target, tlist.resource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }


    }
};
resourceMiner.phase2 = resourceMiner.phase1;
// CONCAT role.scruffy.js
var scruffy = {
    targets: function() {
        out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = {
                p:Game.rooms[r].find(FIND_DROPPED_ENERGY),
                d:Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return s.structureType == STRUCTURE_STORAGE}})
            }
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            if ((creep.memory.action != 'cleaning' && creep.memory.action != 'dropping') || (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'cleaning')) {
                creep.memory.action = 'dropping';
            }
            else if (creep.carry.energy == 0 && creep.memory.action == 'dropping') {
                creep.memory.action = 'cleaning';
            }

            if (creep.memory.action == 'cleaning') {
                var target = t.scruffy[creep.memory.home].p[0];
                if (target) {
                    if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target.pos);
                    }
                }
                else {
                    maintainer[creep.memory.phase](creep, t);
                }
            }
            else if (creep.memory.action == 'dropping') {
                var target = t.scruffy[creep.memory.home].d[0];
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target.pos);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' scruffy: ' + etime);
    }
};
scruffy.phase2 = scruffy.emergency = scruffy.phase1;
// CONCAT role.spawner.js
var spawner = {
    targets: function() {
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_SPAWN || s.structureType==STRUCTURE_EXTENSION) && s.energy< s.energyCapacity}});
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed()
        if (creep.carry.energy == 0) {
            creep.memory.qstate = 'entering';
        }
        else {
            var tlist = t.spawner[creep.memory.home];
            if (creep.ticksToLive < 250) {
                creep.memory.action = 'renewing';
            }
            if (creep.memory.action == 'renewing') {
                creep.say('Renewing');
                var s = Game.spawns[Memory.rooms[creep.memory.home][creep.memory.phase].spawn];
                var r = s.renewCreep(creep)
                if (r == ERR_NOT_IN_RANGE) {
                    creep.moveTo(s);
                }
                else if (r == ERR_FULL || r == ERR_NOT_ENOUGH_ENERGY) {
                    creep.memory.action = '';
                }
            }
            if (creep.memory.action != 'renewing') {
                if (tlist.length) {
                    var target = creep.pos.findClosestByRange(tlist);
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    mover[Game.rooms[creep.memory.home].memory.phase](creep, t);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' spawner: ' + etime);
    }
};
spawner.phase2 = spawner.phase1;
spawner.emergency = spawner.phase1;
// CONCAT role.support.js
var support = {
    targets: function() {
        var r = 'E11S59';
        var h = new RoomPosition(21, 22, r);
        var includeOwners = ['the_beanstalk', 'roboboy'];
        var t = {target: null, s_targ: null, t_targ: null};
        try {
            t = {
                target: h.findClosestByRange(FIND_CREEPS, {filter: (s) => {return s.hits < s.hitsMax/2 && includeOwners.indexOf(s.owner.username) > -1}}),
                s_targ: h.findClosestByRange(FIND_CREEPS, {filter: (s)=> {return s.hits < s.hitsMax && includeOwners.indexOf(s.owner.username) > -1}}),
            };
        }
        catch(err) {}
        var out = {
            deploy: false,
            stage: new RoomPosition(20, 25, 'E13S56'),
            dest: r,
            target: t.target,
            sec_target: t.s_targ,
            t_target: t.t_targ,
        };
        return out;
    },
    phase1: function(creep, t) {
        var tlist = t.hunter;
        if (creep.room.name != tlist.dest) {
            if (tlist.deploy) {
                creep.moveTo(new RoomPosition(31, 21, tlist.dest));
            }
            else {
                creep.moveTo(tlist.stage);
            }
        }
        else {
            if (tlist.target) {
                if (creep.attack(tlist.target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tlist.target);
                }
            }
            else if (tlist.sec_target) {
                if (creep.attack(tlist.sec_target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tlist.sec_target);
                }
            }
            else if (tlist.t_target) {
                if (creep.attack(tlist.t_target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tlist.t_target);
                }
            }
            else {
                creep.moveTo(tlist.stage);
            }
        }
    }
};
support.phase2 = support.phase1;
// CONCAT role.tank.js
var tank = {
    targets: function() {
        return {
            dest: new RoomPosition(25, 25, 'E11S59'),
            deploy: false,
            stage: new RoomPosition(20, 25, 'E13S56')
        }
    },
    phase1: function(creep, t) {
        creep.memory.dontSpawn = true;
        var tlist = t.tank;
        if (tlist.deploy) {
            creep.moveTo(tlist.dest);
        }
        else {
            creep.moveTo(tlist.stage);
        }
    }
};
tank.phase2 = tank.phase1;
// CONCAT role.towerFiller.js
var towerFiller = {
    targets: function() {
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = {
                'harvesting':Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] >= 50}}),
                'filling':Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return s.structureType==STRUCTURE_TOWER && s.energy<s.energyCapacity}})
            };
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        var tlist = t.towerFiller[creep.memory.home];
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else if (tlist.filling.length) {
            if ((creep.memory.action != 'harvesting' && creep.memory.action != 'filling') || (creep.carry.energy == 0 && creep.memory.action == 'filling')) {
                creep.memory.action = 'harvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'harvesting') {
                creep.memory.action = 'filling';
            }

            if (creep.memory.action == 'harvesting') {
                var target = null;
                if (tlist.harvesting.length) {
                    target = tlist.harvesting[0];
                }
                if (target) {
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    creep.memory.qstate = 'entering';
                }
            }
            else if (creep.memory.action == 'filling') {
                var target = tlist.filling[0];
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        }
        else {
            builder[creep.memory.phase](creep, t);
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' towerFiller: ' + etime);
    }
};
towerFiller.phase2 = towerFiller.phase1;
towerFiller.emergency = towerFiller.phase1;
// CONCAT role.upgrader.js
var upgrader = {
    targets: function() {
        var only_these = {
            W61N59: [],
        };
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = [];
            for (var j=0; j < only_these[r].length; j++) {
                var t = Game.getObjectById(only_these[r][j])
                if (t) {
                    out[r].push(t);
                }
            }
        }
        return out;
    },
    // Takes the creep, and a dictionary of lists describing harvesting targets in the room
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            if (creep.memory.action != 'uharvesting' && creep.memory.action != 'upgrading' && creep.memory.action != 'renewing') {
                creep.memory.action = 'uharvesting';
            }
            else if (creep.ticksToLive < 250 && creep.memory.action != 'renewing') {
                creep.memory.action = 'renewing';
            }
            else if (creep.carry.energy == 0 && creep.memory.action != 'uharvesting') {
                creep.memory.action = 'uharvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.action != 'upgrading') {
                creep.memory.action = 'upgrading';
            }

            if (creep.memory.action == 'renewing') {
                var s = Game.spawns[Memory.rooms[creep.memory.home][creep.memory.phase].spawn];
                var r = s.renewCreep(creep)
                if (r == ERR_NOT_IN_RANGE) {
                    creep.moveTo(s);
                }
                else if (r == ERR_FULL || r == ERR_NOT_ENOUGH_ENERGY) {
                    creep.memory.action = 'upgrading';
                }
            }
            if (creep.memory.action == 'uharvesting') {
                var tlist = t.upgrader[creep.memory.home];
                var target = creep.pos.findClosestByRange(tlist, {filter:(s)=>{return (s.structureType == STRUCTURE_LINK && s.energy >= creep.carryCapacity) || (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= creep.carryCapacity)}});
                if (target) {
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    creep.memory.qstate = 'entering';
                }
            }
            else if (creep.memory.action == 'upgrading') {
                var room = Game.rooms[creep.memory.home];
                if (creep.upgradeController(room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(room.controller);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' upgrader: ' + etime);
    }
};
upgrader.phase2 = upgrader.emergency = upgrader.phase1;
// CONCAT role.wallMaintainer.js
var wallMaintainer = {
    targets: function() {
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = [
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_RAMPART) && s.hits<1000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL) && s.hits<1000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_RAMPART) && s.hits<100000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL) && s.hits<100000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_RAMPART) && s.hits<500000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL) && s.hits<500000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_RAMPART) && s.hits< s.hitsMax/2}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL) && s.hits< s.hitsMax/2}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_RAMPART) && s.hits< s.hitsMax}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL) && s.hits< s.hitsMax}})
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (creep.carry.energy == 0) {
            creep.memory.qstate = 'entering';
        }
        else {
            var tlist = t.wallMaintainer[creep.memory.home];
            var target = null;
            for (var i=0; i<tlist.length; i++) {
                if (tlist[i].length) {
                    target = tlist[i][0];
                    break;
                }
            }
            if (target) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                maintainer[Game.rooms[creep.memory.home].memory.phase](creep, t);
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' wallMaintainer: ' + etime);
    }
};
wallMaintainer.phase2 = wallMaintainer.phase1;
wallMaintainer.emergency = wallMaintainer.phase1;

// CONCAT link.js
var linker = {
    targets: function() {
        return {
            W61N59: {from: [], to: []} // from:ids, to:objects
        };
    },
    phase1: function(l, t) {
        if (l.energy) {
            var tlist = t.linker[l.room.name];
            if (tlist.from.indexOf(l.id)>-1) {
                if (tlist.to.length) {
                    l.transferEnergy(l.pos.findClosestByRange(tlist.to, {filter:(s)=>{return s.energy<s.energyCapacity}}));
                }
            }
        }
    }
};
linker.phase2 = linker.emergency = linker.phase1;
// CONCAT tower.js
var tower = {
    targets: function() {
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = {
                hostiles: Game.rooms[r].find(FIND_HOSTILE_CREEPS),
                injured: Game.rooms[r].find(FIND_MY_CREEPS, {filter:(c)=>{return (c.hits< c.hitsMax)}}),
                structures: [
                    Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL|| s.structureType==STRUCTURE_RAMPART) && s.hits<100000}}),
                    Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType!=STRUCTURE_WALL) && s.hits < s.hitsMax/2}})
                ]
            };
        }
        return out;
    },
    phase1: function(tower, t) {
        var tlist = t.tower[tower.room.name];
        if (tlist.hostiles.length) {
            tower.attack(tower.pos.findClosestByRange(tlist.hostiles));
            // Set emergency phase?
        }
        else if(tlist.injured.length) {
            tower.heal(tower.pos.findClosestByRange(tlist.injured));
        }
        else {
            var target = null;
            for (var i=0; i<tlist.structures.length; i++) {
                if (tlist.structures[i].length) {
                    target = tlist.structures[i][0]; //tower.pos.findClosestByRange(tlist.structures[i]);
                    break;
                }
            }
            if (target) {
                tower.repair(target);
            }
        }
    }
};
tower.phase2 = tower.phase1;
tower.emergency = tower.phase1;

// CONCAT queue.js
var queue = {
    phase1: function(creep) {
        var stime = Game.cpu.getUsed();
        var roomMem = Memory.rooms[creep.memory.home].phase1;
        if (!Game.getObjectById(roomMem.energyQ[creep.memory.qindex][0])) {
            roomMem.energyQ[creep.memory.qindex].shift();
        }
        if (creep.memory.qstate == 'entering') {
            var qindex = 0;
            for (var i=0; i < roomMem.energyQ.length; i++) {
                if (roomMem.energyQ[i].length <= roomMem.energyQ[qindex].length) {
                    qindex = i;
                }
            }
            creep.memory.qindex = qindex;
            roomMem.energyQ[qindex].push(creep.id);
            creep.memory.qstate = 'waiting';
            creep.moveTo(roomMem.energyInfo[qindex].waitingpos);
        }
        else if (creep.memory.qstate == 'waiting') {
            if (roomMem.energyQ[creep.memory.qindex][0] == creep.id &&
                roomMem.energyInfo[creep.memory.qindex].harvesting < roomMem.energyInfo[creep.memory.qindex].canharvest) {
                creep.memory.qstate = 'harvesting';
                roomMem.energyQ[creep.memory.qindex].shift();
            }
            else {
                if (roomMem.energyQ[creep.memory.qindex].indexOf(creep.id) == -1) {
                    creep.memory.qstate = 'entering';
                }
                else {
                    var p = roomMem.energyInfo[creep.memory.qindex];
                    var i = roomMem.energyQ[creep.memory.qindex].indexOf(creep.id);
                    creep.moveTo(p.waitingpos.x+(p.qdirection.x*i), p.waitingpos.y+(p.qdirection.y*i));
                }
            }
        }
        else if (creep.memory.qstate == 'harvesting') {
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.qstate = '';
            }
            else {
                var source = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
                if (creep.pickup(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source.pos);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' queueP1: ' + (Game.cpu.getUsed() - stime));
    },
    phase2: function(creep) {
        var stime = Game.cpu.getUsed();
        var roomMem = Memory.rooms[creep.memory.home].phase2;
        if (!Game.getObjectById(roomMem.energyQ[creep.memory.qindex][0])) {
            roomMem.energyQ[creep.memory.qindex].shift();
        }
        if (creep.memory.qstate == 'entering') {
            var qindex = 0;
            for (var i=0; i < roomMem.energyQ.length; i++) {
                var d = Game.getObjectById(roomMem.energyInfo[i].targetid);
                if (d) {
                    if (roomMem.energyQ[i].length < roomMem.energyQ[qindex].length &&
                        d.store[RESOURCE_ENERGY] > 0) {
                        qindex = i;
                    }
                }
            }
            creep.memory.qindex = qindex;
            roomMem.energyQ[qindex].push(creep.id);
            creep.memory.qstate = 'waiting';
            creep.moveTo(roomMem.energyInfo[creep.memory.qindex].waitingpos);
        }
        else if (creep.memory.qstate == 'waiting') {
            if (roomMem.energyQ[creep.memory.qindex][0] == creep.id &&
                roomMem.energyInfo[creep.memory.qindex].harvesting < roomMem.energyInfo[creep.memory.qindex].canharvest &&
                creep.carryCapacity <= Game.getObjectById(roomMem.energyInfo[creep.memory.qindex].targetid).store[RESOURCE_ENERGY]) {
                creep.memory.qstate = 'harvesting';
                roomMem.energyQ[creep.memory.qindex].shift();
            }
            else {
                if (roomMem.energyQ[creep.memory.qindex].indexOf(creep.id) == -1) {
                    creep.memory.qstate = 'entering';
                }
                else {
                    var p = roomMem.energyInfo[creep.memory.qindex];
                    var i = roomMem.energyQ[creep.memory.qindex].indexOf(creep.id);
                    creep.moveTo(p.waitingpos.x+(p.qdirection.x*i), p.waitingpos.y+(p.qdirection.y*i));
                }
            }
        }
        else if (creep.memory.qstate == 'harvesting') {
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.qstate = '';
            }
            else {
                var source = Game.getObjectById(roomMem.energyInfo[creep.memory.qindex].targetid);
                if (creep.withdraw(source, RESOURCE_ENERGY, creep.carryCapacity-_.sum(creep.carry)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source.pos);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' queueP2: ' + etime);
    }
};
queue.emergency = queue.phase2;

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
        // Use Memory.cmd = "command /arg val" syntax, parse with regex
    }
};