
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


var claimer = {
    targets: function() {
        return null;
    },
    phase1: function(creep, t) {
        creep.memory.dontSpawn = true;
        var r = 'E13S55';
        creep.moveTo(new RoomPosition(8, 34, r));
        try {
            if (creep.claimController(Game.rooms[r].controller) == ERR_GCL_NOT_ENOUGH) {
                creep.reserveController(Game.rooms[r].controller);
            }
        }
        catch (err) {
            //console.log(err);
        }
    }
};
claimer.phase2 = claimer.phase1;


var defender = {
    targets: function() {
        var out = {waiting:{
            //E58S8: new RoomPosition(25, 30, 'E58S8'),
            //E58S7: new RoomPosition(36, 6, 'E58S7'),
            E13S56: new RoomPosition(12, 40, 'E13S56'),
            E13S55: new RoomPosition(43, 35, 'E13S55'),
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


var energyMiner = {
    targets: function() {
        return null;
    },
    phase1: function(creep) {
        harvester.phase1(creep);
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


var harvester = {
    targets: function() {
        var out = {};
        for (var r in Memory.myRooms) {

        }
        return out;
    },
    phase1: function(creep) {
        if (creep.carry.energy == 0) {
            creep.memory.qstate = 'entering';
            creep.say('harvesting');
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => {
                return ([STRUCTURE_SPAWN, STRUCTURE_EXTENSION].indexOf(structure.structureType) > -1) && structure.energy < structure.energyCapacity;
            }});
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {reusePath: 10});
                }
            }
            else {
                mover.phase1(creep);
            }
        }
    },
    phase2: function(creep) {
        if (creep.carry.energy == 0 && creep.memory.action == 'dumping') {
            creep.memory.action = 'harvesting';
        }
        else if (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'harvesting') {
            creep.memory.action = 'dumping';
        }

        if (creep.memory.action == 'harvesting') {
            if (creep.room.name != 'E58S7') {
                creep.moveTo(new RoomPosition(25, 25, 'E58S7'));
            }
            else {
                var target = creep.room.find(FIND_SOURCES)[0];
                if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                }
            }
        }
        else if (creep.memory.action == 'dumping') {
            if (creep.room.name != 'E58S8') {
                creep.moveTo(new RoomPosition(25,25,'E58S8'));
            }
            else {
                var target = Game.getObjectById('57d62ea571b05ff46c40f97a');
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    },
    emergency: function(creep) {
        var targets = Memory.currentEnemies
        if (targets.length) {
            creep.moveTo(targets[0].pos);
        }
    }
};


var healer = {
    targets: function() {
        var out = {waiting:{
            //E58S8: new RoomPosition(25, 30, 'E58S8'),
            //E58S7: new RoomPosition(36, 6, 'E58S7'),
            E13S56: new RoomPosition(12, 40, 'E13S56'),
            E13S55: new RoomPosition(43, 35, 'E13S55'),
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


var hoarder = {
    targets: function() {
        var out = {};
        for (var r in Memory.myRooms) {

        }
        return out;
    },
    phase1: function(creep) {
        if (creep.carry.energy == 0) {
            creep.say('harvesting');
            creep.memory.qstate = 'entering';
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => {
                return structure.structureType == STRUCTURE_STORAGE && _.sum(structure.store) < structure.storeCapacity;
            }});
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {reusePath: 10});
                }
            }
            else {
                mover.phase1(creep);
            }
        }
    },
    emergency: function(creep) {
        var targets = Memory.currentEnemies;
        if (targets.length) {
            creep.moveTo(targets[0].pos);
        }
    }
};
hoarder.phase2 = hoarder.phase1;


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
            deploy: true,
            stage: new RoomPosition(20, 25, 'E13S56'),
            dest: r,
            target: t
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


var mover = {
    targets: function() {
        var ignore = ['57f09d7d99b6bea33c43e80e', '57f0bdd56445f349303092a0', '57f3efb846eb99651ce64615', '57f3bf4999cfbc6b37946b8c'];
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
                else {
                    upgrader[creep.memory.phase](creep, t);
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
            if (tlist.length) {
                var target = tlist[0];
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                mover[Game.rooms[creep.memory.home].memory.phase](creep, t);
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' spawner: ' + etime);
    }
};
spawner.phase2 = spawner.phase1;
spawner.emergency = spawner.phase1;


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
            mover[creep.memory.phase](creep, t);
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' towerFiller: ' + etime);
    }
};
towerFiller.phase2 = towerFiller.phase1;
towerFiller.emergency = towerFiller.phase1;


var upgrader = {
    targets: function() {
        var only_these = {
            //E58S8: ['57ddccbe3379dcf753c3be11', '57ef8408a10a26f35ae5c1a1', '57e99414f4a2fb44238e7cdb'],
            //E58S7: ['57eaef4a0fe7d4d93854953c', '57e72d8feb8681b8219282aa'],
            E13S56: ['57f1f2cf53ad09df4053ec8e'],
            E13S55: [],
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
            if (creep.memory.action != 'uharvesting' && creep.memory.action != 'upgrading') {
                creep.memory.action = 'uharvesting';
            }
            else if (creep.carry.energy == 0 && creep.memory.action == 'upgrading') {
                creep.memory.action = 'uharvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'uharvesting') {
                creep.memory.action = 'upgrading';
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


var wallMaintainer = {
    targets: function() {
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = [
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL||s.structureType==STRUCTURE_RAMPART) && s.hits<1000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL||s.structureType==STRUCTURE_RAMPART) && s.hits<100000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL||s.structureType==STRUCTURE_RAMPART) && s.hits<500000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL|| s.structureType==STRUCTURE_RAMPART) && s.hits< s.hitsMax/2}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL|| s.structureType==STRUCTURE_RAMPART) && s.hits< s.hitsMax}})
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


var link = {
    targets: function() {
        return {
            //E58S8: {from: ['57ddbf52c64074f64e2f1d2d'], to: [Game.getObjectById('57ddccbe3379dcf753c3be11'), Game.getObjectById('57ef8408a10a26f35ae5c1a1')]}, // from:ids, to:objects
            //E58S7: {from: ['57eadbb2962b285967d49c7c'], to: [Game.getObjectById('57eaef4a0fe7d4d93854953c')]}
            E13S56: {from: [], to: []},
            E16S57: {from: [], to: []}
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
link.phase2 = link.emergency = link.phase1;


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
                    target = tower.pos.findClosestByRange(tlist.structures[i]);
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


module.exports = {
    builder: builder,
    claimer: claimer,
    defender: defender,
    drudge: drudge,
    energyMiner: energyMiner,
    harvester: harvester,
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
    towerFiller: towerFiller,
    upgrader: upgrader,
    wallMaintainer: wallMaintainer,

    link: link,
    tower: tower,
};