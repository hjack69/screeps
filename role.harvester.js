var roleMover = require('role.mover');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        roleMover.run(creep);
        
        if (creep.carry.energy == 0) {
            creep.memory.queue = 'entering';
            creep.say('harvesting');
            
            var containers = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] >= creep.carryCapacity)}});
            if (containers.length > 0) {
                if (creep.withdraw(containers[0], RESOURCE_ENERGY, creep.carryCapacity) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0].pos, {'reusePath': 2});
                }
            }
            else {
                creep.memory.queue = 'entering';
                creep.say('harvesting');
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ([STRUCTURE_SPAWN, STRUCTURE_EXTENSION].indexOf(structure.structureType) > -1) && structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {'reusePath': 2});
                }
            }
            else {
                roleMover.run(creep);
            }
            creep.say('transferring');
        }
    }
};

module.exports = roleHarvester;