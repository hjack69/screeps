var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.carry.energy == 0) {
            creep.memory.queue = 'entering';
            creep.say('harvesting');
        }
        else {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                    filter: (structure) => {
                        //return ([STRUCTURE_WALL].indexOf(structure.structureType) > -1);
                        return (structure.structureType != STRUCTURE_ROAD);
                        //return ([STRUCTURE_RAMPART,STRUCTURE_CONTAINER,STRUCTURE_EXTENSION].indexOf(structure.structureType) > -1);
                    }
            });
            if(targets.length > 0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else { 
                creep.moveTo(Game.spawns['S1'].pos)
            }
            creep.say('building');
        }
        
	}
};

module.exports = roleBuilder;