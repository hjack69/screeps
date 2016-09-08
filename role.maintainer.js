var roleTowerFiller = require('role.towerFiller');

var roleMaintainer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.carry.energy == 0) {
            creep.memory.queue = 'entering';
            creep.say('harvesting');
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ([STRUCTURE_CONTAINER, STRUCTURE_ROAD, STRUCTURE_TOWER].indexOf(structure.structureType) > -1) && structure.hits < structure.hitsMax/2;
                    }
            });
            for (var t in targets) {
                if (targets[t].hits < 100) {
                    targets.unshift(targets[t]);
                }
            }
            if (targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ([STRUCTURE_CONTAINER, STRUCTURE_ROAD, STRUCTURE_TOWER].indexOf(structure.structureType) > -1) && structure.hits < structure.hitsMax;
                    }
                });
                if (targets.length > 0) {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
                else {
                    roleTowerFiller.run(creep);
                }
            }
            creep.say('repairing');
        }
        
    }
};

module.exports = roleMaintainer;