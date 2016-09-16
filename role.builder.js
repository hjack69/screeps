// Builder
var role = {
    phase1: function(creep) {
        if (creep.carry.energy == 0) {
            creep.memory.qstate = 'entering';
            creep.say('harvesting');
        }
        else {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES, { filter: (structure) => {
                return (structure.structureType == STRUCTURE_WALL);
            }});
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {reusePath: 10});
                }
            }
            else {
                targets = creep.room.find(FIND_CONSTRUCTION_SITES , { filter: (structure) => {
                    return (structure.structureType != STRUCTURE_ROAD);
                }});
                if (targets.length) {
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {reusePath: 10});
                    }
                }
                else {
                    targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if (targets.length) {
                        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {reusePath: 10});
                        }
                    }
                    else {
                        var roleMaintainer = require('role.maintainer');
                        roleMaintainer.phase1(creep);
                    }
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
role.phase2 = role.phase1;

module.exports = role;