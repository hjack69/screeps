//Scruffy
var role = {
    targets: function() {
        out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = {
                p:Game.rooms[r].find(FIND_DROPPED_ENERGY),
                d:Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return s.structureType == STRUCTURE_STORAGE}})
            }
        }
        return out;
    },
    phase1: function(creep, t) {
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            if ((creep.memory.action != 'cleaning' && creep.memory.action != 'dropping') || (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'cleaning')) {
                creep.memory.action = 'dropping';
            }
            else if (creep.carry.energy == 0 && creep.memory.action == 'dropping') {
                creep.memory.action = 'cleaning';
            }
            
            if (creep.memory.action == 'cleaning') {
                var target = creep.pos.findClosestByRange(t.scruffy[creep.memory.home].p);
                if (target) {
                    if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target.pos);
                    }
                }
                else {
                    var maintainerRole = require('role.maintainer');
                    maintainerRole[creep.memory.phase](creep, t);
                }
            }
            else if (creep.memory.action == 'dropping') {
                var target = creep.pos.findClosestByRange(t.scruffy[creep.memory.home].d);
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target.pos);
                }
            }
        }
    }
}
role.phase2 = role.emergency = role.phase1;

module.exports = role;