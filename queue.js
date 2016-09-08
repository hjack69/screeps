/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('queue');
 * mod.thing == 'a thing'; // true
 */

var waitingArea = {'x':8, 'y':17};

var manage = function(creep) {
    if (creep.memory.queue == 'entering') {
        creep.room.memory.queue.unshift(creep.id);
        creep.memory.queue = 'waiting';
        creep.moveTo(waitingArea);
    }
    else if (creep.memory.queue == 'waiting') {
        if (creep.room.memory.queue[creep.room.memory.queue.length-1] == creep.id && creep.room.find(FIND_MY_CREEPS, {filter: (c) => { return c.memory.queue == 'harvesting'; }}).length < 1 && creep.carryCapacity <= Game.getObjectByID(creep.room.prefContainerID).store[RESOURCE_ENERGY]) {
            creep.memory.queue = 'harvesting';
            creep.room.memory.queue.pop();
            //console.log(creep.toString() + ' harvesting; ' + String(creep.room.memory.h_locations) + ' locations reamaining')
        }
        else {
            creep.moveTo(waitingArea.x+(creep.room.memory.queue.length-1-creep.room.memory.queue.indexOf(creep.id)), waitingArea.y);
        }
    }
    else if (creep.memory.queue == 'harvesting') {
        if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.queue = '';
            creep.moveTo(waitingArea);
            //console.log(creep.toString() + ' leaving; ' + String(creep.room.memory.h_locations) + ' locations reamaining')
        }
        else {
            var source = Game.getObjectByID(creep.room.prefContainerID);
            if (creep.withdraw(source, RESOURCE_ENERGY, creep.carryCapacity) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }

            //var source = creep.room.find(FIND_SOURCES)[0];
            //if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            //    creep.moveTo(source);
            //}
        }
    }
};

module.exports = {
    'manage': manage
};