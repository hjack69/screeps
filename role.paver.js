var paver = {
    targets: function() {
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter:(s)=>{return s.structureType == STRUCTURE_ROAD}});
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (creep.carry.energy == 0) {
            creep.memory.qstate = 'entering';
        }
        else {
            if (creep.ticksToLive < 250 && (creep.memory.action == '' || !creep.memory.action)) {
                creep.memory.action = 'renewing';
            }

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
            else {
                var tlist = t.paver[creep.memory.home];
                var target = tlist[0];
                if (target) {
                    if (creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    builder[Game.rooms[creep.memory.home].memory.phase](creep, t);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' paver: ' + etime);
    },
    emergency: function(creep, t) {
        var e = require('emergency');
        e.emergency(creep, t);
    }
};
paver.phase2 = paver.phase1;

// END role.paver.js
