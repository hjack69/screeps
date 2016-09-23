/**
 * TEMPORARILY DEPRECIATED
 * MAY NEED IN FUTURE FOR MINING
 */

var roleMover = require('role.mover');
// Hoarder
var role = {
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
                roleMover.phase1(creep);
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