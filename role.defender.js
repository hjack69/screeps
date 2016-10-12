var defender = {
    targets: function() {
        var out = {waiting:{
            E63N59: new RoomPosition(22, 43, 'E63N59')
        }};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = Game.rooms[r].find(FIND_HOSTILE_CREEPS);
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (creep.memory.action == 'renewing') {
            var s = Game.spawns[Memory.rooms[creep.memory.home][creep.memory.phase].spawn];
            var r = s.renewCreep(creep);
            if (r == ERR_NOT_IN_RANGE) {
                creep.moveTo(s);
            }
            else if (r == ERR_FULL) {
                creep.memory.action = '';
            }
        }
        var target = creep.pos.findClosestByRange(t.defender[creep.memory.home]);
        if (target) {
            creep.memory.action = '';
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target.pos);
            }
        }
        else {
            if (creep.ticksToLive < 250 && (creep.memory.action == '' || !creep.memory.action)) {
                creep.memory.action = 'renewing';
            }
            else if (creep.memory.action == '') {
                creep.moveTo(t.defender.waiting[creep.memory.home]);
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' defender: ' + etime);
    }
};
defender.phase2 = defender.phase1;
defender.emergency = defender.phase1;

// END role.defender.js
