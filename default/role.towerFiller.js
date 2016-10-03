// Tower Filler
var role = {
    targets: function() {
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = {
                'harvesting':Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] >= 50}}),
                'filling':Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return s.structureType==STRUCTURE_TOWER && s.energy<s.energyCapacity}})
            };
        }
        return out;
    },
    phase1: function(creep, t) {
        var tlist = t.towerFiller[creep.memory.home];
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else if (tlist.filling.length) {
            if ((creep.memory.action != 'harvesting' && creep.memory.action != 'filling') || (creep.carry.energy == 0 && creep.memory.action == 'filling')) {
                creep.memory.action = 'harvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'harvesting') {
                creep.memory.action = 'filling';
            }

            if (creep.memory.action == 'harvesting') {
                var target = null;
                if (tlist.harvesting.length) {
                    target = creep.pos.findClosestByRange(tlist.harvesting);
                }
                if (target) {
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    creep.memory.qstate = 'entering';
                }
            }
            else if (creep.memory.action == 'filling') {
                var target = creep.pos.findClosestByRange(tlist.filling);
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        }
        else {
            var moverRole = require('role.mover');
            moverRole[creep.memory.phase](creep, t);
        }
    }
};
role.phase2 = role.phase1;
role.emergency = role.phase1;

module.exports = role;