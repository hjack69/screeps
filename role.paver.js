var paver = {
    targets: function() {
        var out = {};
        for (var r in rooms) {
            out[r] = Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter:(s)=>{return s.structureType == STRUCTURE_ROAD}});
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();

        if (!creep.memory.paver) creep.memory.paver = {};

        if (creep.ticksToLive < 250 && creep.memory.renewQ.state == '') {
            creep.memory.renewQ.state = 'renewing';
        }
        else if (creep.carry.energy == 0) {
            creep.memory.energyQ.state = 'entering';
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
                builder[rooms[creep.memory.home].phase](creep, t);
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
paver.phase3 = paver.phase2 = paver.phase1;

// END role.paver.js
