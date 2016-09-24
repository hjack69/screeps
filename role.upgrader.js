// Upgrader: qstate, qindex, home
var role = {
    targets: function() {
        var only_these = {
            E58S8: [],
            E58S7: [],
        };
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = [];
            for (var i=0; i < only_these[r].length; i++) {
                out[r].push(room.getObjectById(only_these[r][i]));
            }
        }
        return out;
    },
    // Takes the creep, and a dictionary of lists describing harvesting targets in the room
    phase1: function(creep, t) {
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            if (!creep.memory.action) {
                creep.memory.action = 'harvesting';
            }
            else if (creep.carry.energy == 0 && creep.memory.action == 'upgrading') {
                creep.memory.action = 'harvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'harvesting') {
                creep.memory.action = 'upgrading';
            }

            if (creep.memory.action == 'harvesting') {
                var tlist = t.upgrader[creep.memory.role];
                var target = null;
                for (var i=0; i<tlist.length; i++) {
                    if (tlist[i].length) {
                        target = creep.pos.findClosestByRange(tlist[i], {filter:(s)=>{
                                return (s.structureType == STRUCTURE_LINK && s.energy >= creep.carryCapacity) ||
                                       (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= creep.carryCapacity);
                        }});
                        if (target) {break;}
                    }
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
            else if (creep.memory.action == 'upgrading') {
                var room = Game.rooms[creep.memory.home];
                if (creep.upgradeController(room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(room.controller);
                }
            }
        }
    }
};
role.phase2 = role.emergency = role.phase1;

module.exports = role;