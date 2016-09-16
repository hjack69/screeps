var roleTowerFiller = require('role.towerFiller');
// Maintainer
var role = {
    phase1: function(creep) {
        if (creep.carry.energy == 0) {
            creep.say('harvesting');
            creep.memory.qstate = 'entering';
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => {
                return ([STRUCTURE_CONTAINER, STRUCTURE_ROAD, STRUCTURE_TOWER].indexOf(structure.structureType) > -1) && structure.hits < structure.hitsMax/2;
            }});
            if (targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {reusePath: 10});
                }
            }
            else {
                targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => {
                    return ([STRUCTURE_CONTAINER, STRUCTURE_ROAD, STRUCTURE_TOWER].indexOf(structure.structureType) > -1) && structure.hits < structure.hitsMax;
                }});
                if (targets.length > 0) {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {reusePath: 10});
                    }
                }
                else {
                    roleTowerFiller.phase1(creep);
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