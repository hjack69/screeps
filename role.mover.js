var roleUpgrader = require('role.upgrader');
// Mover
var role = {
    phase1: function(creep) {
        if (creep.carry.energy == 0) {
            creep.memory.qstate = 'entering';
            creep.say('harvesting');
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER &&
                    _.sum(structure.store) < structure.storeCapacity &&
                    creep.room.memory.ignoreContainers.indexOf(structure.id) == -1;
            }});
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {reusePath: 10});
                }
            }
            else {
                roleUpgrader.phase1(creep);
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
role.phase2 = role.phase1;

module.exports = role;