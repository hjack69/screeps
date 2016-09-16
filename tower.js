var phases = require('phases');
var roleTower = {
    phase1: function(tower) {
        
        var enemies = tower.room.find(FIND_HOSTILE_CREEPS);
        if (enemies.length > 0) {
            tower.attack(enemies[0]);
            phases.emergency();
        }
        else {
            var injured = tower.room.find(FIND_MY_CREEPS, {
                filter: (creep) => {
                    return creep.hits < creep.hitsMax;
                }
            });
            if (injured.length > 0) {
                tower.heal(injured[0]);
            }
            else {
                var walls = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits < 100000;
                    }
                });
                if (walls.length > 0) {
                    tower.repair(walls[0]);
                }
                else {
                    walls = tower.room.find(FIND_STRUCTURES, {filter: (structure) => {
                        return structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax/2;
                    }});
                    if (walls.length > 0) {
                        tower.repair(walls[0]);
                    }
                }
            }
        }
        
    }
};
roleTower.phase2 = roleTower.phase1;
roleTower.emergency = roleTower.phase1;

module.exports = roleTower;