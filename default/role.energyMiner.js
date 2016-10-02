// Energy Miner
var role = {
    targets: function() {
        return null;
    },
    phase1: function(creep) {
        var roleHarvester = require('role.builder');
        roleHarvester.phase1(creep);
    },
    phase2: function(creep) {
        if (!creep.memory.action) {
            creep.memory.action = 'harvesting';
        }
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            if (creep.carry.energy == 0 && creep.memory.action == 'dumping') {
                creep.memory.action = 'harvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'harvesting') {
                creep.memory.action = 'dumping';
            }

            if (creep.memory.action == 'harvesting') {
                var source = Game.getObjectById(creep.memory.sourceid);
                if (creep.pos.x != creep.memory.spot.x || creep.pos.y != creep.memory.spot.y) {
                    creep.moveTo(creep.memory.spot.x, creep.memory.spot.y);
                }
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.memory.spot.x, creep.memory.spot.y);
                }
            }
            else if (creep.memory.action == 'dumping') {
                var dump = Game.getObjectById(creep.memory.dumpid);
                if (dump != null) {
                    if (dump.hits < dump.hitsMax/2) {
                        creep.repair(dump);
                    }
                    else if (_.sum(dump.store) < dump.storeCapacity) {
                        if (creep.transfer(dump, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(dump);
                        }
                    }
                }
            }
        }
    }
};
role.emergency = role.phase2;

module.exports = role;