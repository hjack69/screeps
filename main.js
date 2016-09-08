//var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var rolePaver = require('role.paver');
var roleMaintainer = require('role.maintainer');
var roleMover = require('role.mover');
var roleTowerFiller = require('role.towerFiller');
var queue = require('queue');

var roleTower = require('tower');

var body_types = {//'harvester': [WORK, CARRY, MOVE, MOVE],
                  'upgrader': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                  'builder': [WORK, CARRY, MOVE, MOVE],
                  'paver': [WORK, CARRY, MOVE, MOVE],
                  'maintainer': [WORK, CARRY, MOVE, MOVE],
                  'mover': [WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
                  'towerFiller': [WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
                  'energyMiner': [WORK, WORK, CARRY, CARRY, CARRY, MOVE]
                 };

var init = true;
function shuffle (arr) {
    var i = 0, j = 0, temp = null;
    for (i = arr.length-1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

module.exports.loop = function () {

    var cur_room = Game.rooms['E19S58'];

    if (init) {
        Memory.spawnQueue = ['energyMiner', 'energyMiner', 'energyMiner', 'energyMiner'].concat(shuffle([
            'upgrader', 'upgrader', 'upgrader',
            //'harvester', 'harvester', 'harvester', 'harvester',
            'mover', 'mover',
            'paver', 'paver',
            'builder', 'builder',
            'towerFiller', 'towerFiller',
            'maintainer', 'maintainer'
        ]));
        cur_room.memory.energyQueue = [];

        cur_room.memory.srcID = '';

        init = false;
    }
    
    if (Memory.spawnQueue.length > 0) {
        var newName = Game.spawns['S1'].createCreep(body_types[Memory.spawnQueue[0]], undefined, {role: Memory.spawnQueue[0], energyQueue: ''});
        if (newName != -4 && newName != -6) {
            var new_type = Memory.spawnQueue.shift();
            console.log('Spawning new ' + new_type + ': ' + newName);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        //else if(creep.memory.role == 'harvester') {
        //    roleHarvester.run(creep);
        //}
        if(creep.memory.role == 'upgrader') {
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
        else {
            console.log(creep.name + ' is a bum.');
        }
        if (creep.ticksToLive == 1) {
            if (creep.memory.role == 'energyMiner') {
                Memory.spawnQueue.unshift('energyMiner');
            }
            else {
                Memory.spawnQueue.push(creep.memory.role);
                var ind = Game.rooms['E19S58'].memory.energyQueue.indexOf(creep.id);
                if (ind > -1) {
                    creep.memory.energyQueue = 'dying';
                    Game.rooms['E19S58'].memory.energyQueue.splice(ind, 1);
                }
            }
            console.log(creep.name + ' is dying (' + creep.memory.role + ')');
        }
    }
    
    var towers = cur_room.find(FIND_STRUCTURES, {filter: (struct) => {return struct.structureType == STRUCTURE_TOWER}});
    for (var i=0; i < towers.length; i++) {
        roleTower.run(towers[i]);
    }
};