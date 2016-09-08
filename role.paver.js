var roleBuilder = require('role.builder');

var rolePaver = {

    run: function(creep) {
        
        if (creep.carry.energy == 0) {
            creep.memory.queue = 'entering';
            creep.say('harvesting');
        }
        else {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_ROAD) &&
                            structure.progress < structure.progressTotal;
                    }
            });
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                roleBuilder.run(creep);
            }
            creep.say('paving');
        }
        
	}
};

module.exports = rolePaver;