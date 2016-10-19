var defender = {
    targets: function() {
        var out = {waiting:{
            E63N59: new RoomPosition(22, 43, 'E63N59'),
            E61N58: new RoomPosition(28, 45, 'E61N58'),
            E64N58: new RoomPosition(8, 43, 'E64N58'),
        }};
        for (var r in rooms) {
            out[r] = Game.rooms[r].find(FIND_HOSTILE_CREEPS);
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (creep.memory.action == 'renewing') {
            var s = Game.spawns[rooms[creep.memory.home].spawn];
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
            if (creep.ticksToLive < 250 && (creep.memory.action == '' || !creep.memory.action) && Memory.rooms[creep.memory.home][rooms[creep.memory.home].phase].enableRenew) {
                creep.memory.action = 'renewing';
            }
            else if (creep.memory.action == '' || !creep.memory.action) {
                creep.moveTo(t.defender.waiting[creep.memory.home]);
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' defender: ' + etime);
    }
};
defender.phase3 = defender.phase2 = defender.phase1;
defender.emergency = defender.phase1;

// END role.defender.js
