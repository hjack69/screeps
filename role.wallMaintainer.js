var roleMaintainer = require('role.maintainer');
// Wall Maintainer
var role = {
    phase1: function(creep) {
        if (creep.carry.energy == 0) {
            creep.say('harvesting');
            creep.memory.qstate = 'entering';
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => {
                return (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits < 500000;
            }});
            if (targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {reusePath: 10});
                }
            }
            else {
                targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits < structure.hitsMax/2;
                }});
                if (targets.length > 0) {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {reusePath: 10});
                    }
                }
                else {
                    targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits < structure.hitsMax;
                    }});
                    if (targets.length > 0) {
                        if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {reusePath: 10});
                        }
                    }
                    else {
                        roleMaintainer.phase1(creep);
                    }
                }
            }
        }
    }
};
role.phase2 = role.phase1;
role.emergency = role.phase1;

module.exports = role;