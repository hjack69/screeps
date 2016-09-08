var roleEnergyMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy == 0 && creep.memory.action == 'dumping') {
            creep.memory.action = 'harvesting';
        }
        else if (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'harvesting') {
            creep.memory.action = 'dumping';
        }

        if (creep.memory.action == 'harvesting') {
            var source = creep.room.find(FIND_SOURCES)[0];
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else if (creep.memory.action == 'dumping') {
            var prefContainer = Game.getObjectById(creep.room.memory.srcID);
            if (_.sum(prefContainer.store) < prefContainer.storeCapacity) {
                if (creep.transfer(prefContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(prefContainer);
                }
            }
        }
    }
};

module.exports = roleEnergyMiner;