var roles = {harvester: require('role.harvester'),
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
             hoarder: require('role.hoarder'),
             claimer: require('role.claimer'),
            };
var roleTower = require('tower');
var queue = require('queue');

var phases = require('phases');

var body_types = {'harvester': [WORK, CARRY, MOVE, MOVE],
                  'upgrader': [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
                  'builder': [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
                  'paver': [WORK, CARRY, CARRY, MOVE, MOVE],
                  'maintainer': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                  'wallMaintainer': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                  'mover': [WORK, CARRY, CARRY, MOVE, MOVE],
                  'towerFiller': [WORK, CARRY, CARRY, MOVE, MOVE],
                  'spawner': [WORK, CARRY, CARRY, MOVE, MOVE],
                  'energyMiner': [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE],
                  'defender': [ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE],
                  'healer': [HEAL, MOVE, MOVE],
                  'hoarder': [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
                  'claimer': [CLAIM, MOVE],
                 };


module.exports.loop = function () {

    if (Memory.phasestr) {
        phases[Memory.phasestr]();
        var curphase = Memory[Memory.phasestr];
        var curroom = Game.rooms[Memory.home];

        if (curphase.spawnq) {
            if (curphase.spawnq.length > 0) {
                var newName = '';
                if (curphase.spawnq[0].role == 'energyMiner' && curroom.find(FIND_MY_CREEPS, {filter: (c) => {return c.memory.role == 'energyMiner'}}).length < 2) {
                    newName = Game.spawns[Memory.mainspawn].createCreep([WORK, CARRY, MOVE, MOVE], undefined, curphase.spawnq[0]);
                }
                else {
                    newName = Game.spawns[Memory.mainspawn].createCreep(body_types[curphase.spawnq[0].role], undefined, curphase.spawnq[0]);
                }
                if (newName != -4 && newName != -6) {
                    var new_type = curphase.spawnq.shift().role;
                    console.log('Spawning new ' + new_type + ': ' + newName);
                }
            }
        } else {console.log('Spawn Queue not set up.');}

        for (var i=0; i < curroom.memory.qpositions.length; i++) {
            curroom.memory.qpositions[i].harvesting = 0;
            if (Game.getObjectById(curroom.memory.energyq[i][0]) == null) {
                curroom.memory.energyq[i].shift();
            }
        }
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.qstate == 'harvesting') {
                creep.room.memory.qpositions[creep.memory.qindex].harvesting += 1;
            }
        }
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if ((creep.memory.role != 'energyMiner' && creep.memory.role != 'defender' && creep.memory.role != 'healer') && creep.memory.qstate != '') {
                queue[Memory.phasestr](creep);
            }
            else {
                roles[creep.memory.role][Memory.phasestr](creep);
            }
            if (creep.ticksToLive == 1) {
                if (creep.memory.role == 'energyMiner') {
                    Memory[creep.memory.phase].spawnq.unshift(creep.memory)
                }
                else {
                    if (creep.memory.role == 'spawner') {
                        Memory[creep.memory.phase].spawnq.unshift(creep.memory);
                    }
                    else if (creep.memory.phase == Memory.phasestr) {
                        Memory[creep.memory.phase].spawnq.push(creep.memory);
                    }
                    if (creep.memory.qstate != '') {
                        var ind = curroom.memory.energyq[creep.memory.qindex].indexOf(creep.id);
                        curroom.memory.energyq[creep.memory.qindex].splice(ind, 1);
                        creep.memory.qstate = '';
                    }
                }
                console.log(creep.name + ' is dying (' + creep.memory.role + ', ' + creep.memory.phase + ')');
            }
        }

        var towers = curroom.find(FIND_STRUCTURES, {filter: (struct) => {return struct.structureType == STRUCTURE_TOWER}});
        for (var i=0; i < towers.length; i++) {
            roleTower[Memory.phasestr](towers[i]);
            if (!Memory.needsNotify) {
                Memory.needsNotify = true;
                Game.notify('Tower has been built');
            }
        }
        
        if (Memory.lastClear >= 2000) {
            for(var i in Memory.creeps) {if(!Game.creeps[i]) {delete Memory.creeps[i];}}
            Memory.lastClear = 0;
        }
        else {
            Memory.lastClear += 1
        }
        
        if(Game.cpu.getUsed() > Game.cpu.tickLimit*0.90) {
            Game.notify("Used more than 90% of current limit!");
        }
        
        if (Game.time == 13692718) {
            Game.notify('Room E58S7 is ready for reservation');
        }
        
        // if (curroom.find(FIND_STRUCTURES, {filter:(structure)=>{return structure.structureType==STRUCTURE_STORAGE}}).length && Memory.needsNotify) {
        //     Memory.needsNotify = false;
        //     Game.notify('Storage finished building!');
        //     curphase.spawnq.push({'role':'hoarder', 'qstate':'', 'qindex':0, 'phase':'phase2'});
        // }
    }
}