// Energy Miner
var role = {
    phase1: function(creep) {
        var roleHarvester = require('role.harvester');
        roleHarvester.phase1(creep);
    },
    phase2: function(creep) {
        if (creep.carry.energy == 0 && (creep.memory.doing == 'dumping' || creep.memory.doing == '')) {
            creep.memory.doing = 'harvesting';
        }
        else if (creep.carry.energy == creep.carryCapacity && creep.memory.doing == 'harvesting') {
            creep.memory.doing = 'dumping';
        }

        if (creep.memory.doing == 'harvesting') {
            var source = Game.getObjectById(creep.memory.sourceid);
            if (creep.pos.x != creep.memory.spot.x || creep.pos.y != creep.memory.spot.y) {
                creep.moveTo(creep.memory.spot.x, creep.memory.spot.y);
            }
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.spot.x, creep.memory.spot.y);
            }
        }
        else if (creep.memory.doing == 'dumping') {
            var dump = Game.getObjectById(creep.memory.dumpid);
            if (_.sum(dump.store) < dump.storeCapacity) {
                if (creep.transfer(dump, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dump);
                }
            }
        }
    }
};
role.emergency = role.phase2;

module.exports = role;