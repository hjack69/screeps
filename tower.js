var roleTower = {

    /** @param {Creep} creep **/
    run: function(tower) {
        
        var enemies = tower.room.find(FIND_HOSTILE_CREEPS);
        if (enemies.length > 0) {
            tower.attack(enemies[0]);
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
                    walls = tower.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits < structure.hitsMax;
                        }
                    });
                    if (walls.length > 0) {
                        tower.repair(walls[0]);
                    }
                }
            }
        }
        
    }
};

module.exports = roleTower;