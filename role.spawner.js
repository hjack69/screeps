var roleMover = require('role.mover');
// Spawner
var role = {
    phase1: function(creep) {
        if (creep.carry.energy == 0) {
            creep.memory.qstate = 'entering';
            creep.say('harvesting');
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ([STRUCTURE_SPAWN, STRUCTURE_EXTENSION].indexOf(structure.structureType) > -1) && structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {reusePath: 10});
                }
            }
            else {
                roleMover.phase1(creep);
            }
        }
    }
};
role.phase2 = role.phase1;
role.emergency = role.phase1;

module.exports = role;