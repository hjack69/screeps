var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var rolePaver = require('role.paver');
var roleMaintainer = require('role.maintainer');
var roleMover = require('role.mover');
var roleTowerFiller = require('role.towerFiller');
var queue = require('queue');

var roleTower = require('tower');

var body_types = {'harvester': [WORK, CARRY, MOVE, MOVE],
                  'upgrader': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                  'builder': [WORK, CARRY, MOVE, MOVE],
                  'paver': [WORK, CARRY, MOVE, MOVE],
                  'maintainer': [WORK, CARRY, MOVE, MOVE],
                  'mover': [WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
                  'towerFiller': [WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
                  'energyMiner': [WORK, WORK, CARRY, CARRY, CARRY, MOVE]
                 };

module.exports.loop = function () {
    
    var cur_room = Game.rooms['E19S58'];
    
    if (Memory.spawn_queue.length > 0) {
        var newName = Game.spawns['S1'].createCreep(body_types[Memory.spawn_queue[0]], undefined, {role: Memory.spawn_queue[0], queue: ''});
        if (newName != -4 && newName != -6) {
            var new_type = Memory.spawn_queue.shift();
            console.log('Spawning new ' + new_type + ': ' + newName);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.ticksToLive == 1) {
            if (creep.memory.role == 'energyMiner') {
                Memory.spawn_queue.unshift('energyMiner');
            }
            else {
                Memory.spawn_queue.push(creep.memory.role);
                var ind = Game.rooms['E19S58'].memory.queue.indexOf(creep.id);
                if (ind > -1) {
                    creep.memory.queue = 'dying';
                    Game.rooms['E19S58'].memory.queue.splice(ind, 1);
                }
            }
            console.log(creep.name + ' is dying (' + creep.memory.role + ')');
        }
        if (creep.memory.queue != '') {
            queue.manage(creep);
        }
        else if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == 'paver') {
            rolePaver.run(creep);
        }
        else if (creep.memory.role == 'maintainer') {
            roleMaintainer.run(creep);
        }
        else if (creep.memory.role == 'mover') {
            roleMover.run(creep);
        }
        else if (creep.memory.role == 'towerFiller') {
            roleTowerFiller.run(creep);
        }
    }
    
    var towers = Game.rooms['E19S58'].find(FIND_STRUCTURES, {filter: (struct) => {return struct.structureType == STRUCTURE_TOWER}});
    for (var i=0; i < towers.length; i++) {
        roleTower.run(towers[i]);
    }
    
    var q = Game.rooms['E19S58'].memory.queue;
    for (var i=0; i < q.length; i++) {
        if (q[i] == null || Game.getObjectById(q[i]) == null || Game.getObjectById(q[i]).ticksToLive <= 0) {
            Game.rooms['E19S58'].memory.queue.splice(i, 1);
        }
    }
}