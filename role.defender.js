// Defender
var role = {
    targets: function() {
        var out = {waiting:{
            E58S8: new RoomPosition(),
            E58S7: new RoomPosition()
        }};
        for (var r in Memory.myRooms) {
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