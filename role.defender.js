// Defender
var role = {
    targets: function() {
        var out = {waiting:{
            E58S8: new RoomPosition(33, 46, 'E58S8'),
            E58S7: new RoomPosition(36, 6, 'E58S7')
        }};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = Game.rooms[r].find(FIND_HOSTILE_CREEPS);
        }
        return out;
    },
    phase1: function(creep, t) {
        var target = creep.pos.findClosestByRange(t.defender[creep.memory.home]);
        if (target) {
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target.pos);
            }
        }
        else {
            creep.moveTo(t.waiting[creep.memory.home]);
        }
    }
};
role.phase2 = role.phase1;
role.emergency = role.phase1;

module.exports = role;