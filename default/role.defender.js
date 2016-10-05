// Defender
var role = {
    targets: function() {
        var out = {waiting:{
            //E58S8: new RoomPosition(25, 30, 'E58S8'),
            //E58S7: new RoomPosition(36, 6, 'E58S7'),
            E13S56: new RoomPosition(12, 40, 'E13S56'),
            E13S55: new RoomPosition(43, 35, 'E13S55'),
        }};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = Game.rooms[r].find(FIND_HOSTILE_CREEPS);
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        var target = creep.pos.findClosestByRange(t.defender[creep.memory.home]);
        if (target) {
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target.pos);
            }
        }
        else {
            creep.moveTo(t.defender.waiting[creep.memory.home]);
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' defender: ' + etime);
    }
};
role.phase2 = role.phase1;
role.emergency = role.phase1;

module.exports = role;