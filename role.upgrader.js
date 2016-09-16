// Upgrader
var role = {
    phase1: function(creep) {
        if (creep.carry.energy == 0) {
            var containers = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] >= creep.carryCapacity && creep.room.memory.ignoreContainers.indexOf(structure.id) == -1)}});
            if (containers.length) {
                var closest = creep.pos.findClosestByRange(containers);
                if (creep.withdraw(closest, RESOURCE_ENERGY, creep.carryCapacity) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closest.pos, {reusePath: 10});
                }
            }
            else {
                creep.say('harvesting');
                creep.memory.qstate = 'entering';
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {reusePath: 10});
            }
        }
    }
};
role.phase2 = role.phase1;
role.emergency = role.phase1;

module.exports = role;