var roleMover = require('role.mover');
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
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            if (!creep.memory.action || (creep.carry.energy == 0 && creep.memory.action == 'filling')) {
                creep.memory.action = 'harvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'harvesting') {
                creep.memory.action = 'filling';
            }

            var tlist = t.towerFiller[creep.memory.home];
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
                var target = null;
                if (tlist.filling.length) {
                    target = creep.pos.findClosestByRange(tlist.filling);
                }
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    var moverRole = require('role.mover');
                    moverRole[Game.rooms[creep.memory.home].memory.phase](creep, t);
                }
            }
        }
    }
};
role.phase2 = role.phase1;
role.emergency = role.phase1;

module.exports = role;