var roleBuilder = require('role.builder');

var roleTowerFiller = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.carry.energy == 0) {
            creep.memory.queue = 'entering';
            creep.say('harvesting');
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ([STRUCTURE_TOWER].indexOf(structure.structureType) > -1) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                roleBuilder.run(creep);
            }
            creep.say('powering');
        }
    }
};

module.exports = roleTowerFiller;