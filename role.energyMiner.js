var energyMiner = {
    targets: function() {
        return null;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (!creep.memory.action) {
            creep.memory.action = 'harvesting';
        }
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(25, 25, creep.memory.home);
        }
        else {
            var source = Game.getObjectById(creep.memory.sourceid);
            if (creep.pos.x != creep.memory.spot.x || creep.pos.y != creep.memory.spot.y) {
                creep.moveTo(creep.memory.spot.x, creep.memory.spot.y);
            }
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.spot.x, creep.memory.spot.y);
            }
            if (source.energy == 0 && creep.carry.energy > 0) {
                creep.drop(RESOURCE_ENERGY);
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
    },
    phase2: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (!creep.memory.energyMiner) {
            creep.memory.energyMiner = {action:'harvesting'};
        }
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            if (creep.carry.energy == 0 && creep.memory.energyMiner.action == 'dumping') {
                creep.memory.energyMiner.action = 'harvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.energyMiner.action == 'harvesting') {
                creep.memory.energyMiner.action = 'dumping';
            }

            if (creep.memory.energyMiner.action == 'harvesting') {
                var source = Game.getObjectById(creep.memory.sourceid);
                if (creep.pos.x != creep.memory.spot.x || creep.pos.y != creep.memory.spot.y) {
                    creep.moveTo(creep.memory.spot.x, creep.memory.spot.y);
                }
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.memory.spot.x, creep.memory.spot.y);
                }
                if (source.energy == 0) {
                    creep.memory.energyMiner.action = 'dumping';
                }
            }
            else if (creep.memory.energyMiner.action == 'dumping') {
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
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' energyMiner: ' + etime);
    }
};
energyMiner.phase3 = energyMiner.emergency = energyMiner.phase2;

// END role.energyMiner.js
