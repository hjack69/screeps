//Scruffy
var role = {
    targets: function() {
        out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = {
                p:Game.rooms[r].find(FIND_DROPPED_ENERGY),
                d:Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER}})
            }
        }
        return out;
    },
    phase1: function(creep, t) {
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            if (_.sum(creep.carry) == creep.carryCapacity) {
                var target = creep.pos.findClosestByRange(t.scruffy[creep.memory.home].d);
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                var target = creep.pos.findClosestByRange(t.scruffy[creep.memory.home].p);
                if (target) {
                    if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    var maintainerRole = require('role.maintainer');
                    maintainerRole[creep.memory.phase](creep, t);
                }
            }
        }
    }
}
role.phase2 = role.emergency = role.phase1;

module.exports = role;