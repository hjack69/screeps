var maintainer = {
    targets: function() {
        var out = {};
        for (var r in rooms) {
            out[r] = [
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return ([STRUCTURE_CONTAINER, STRUCTURE_ROAD, STRUCTURE_TOWER].indexOf(s.structureType) > -1) && s.hits < s.hitsMax/2}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return ([STRUCTURE_CONTAINER, STRUCTURE_ROAD, STRUCTURE_TOWER].indexOf(s.structureType) > -1) && s.hits < s.hitsMax}})
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();

        if (!creep.memory.maintainer) creep.memory.maintainer = {};

        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            if (creep.ticksToLive < 250 && creep.memory.renewQ.state == '') {
                creep.memory.renewQ.state = 'entering';
            }
            else if (creep.carry.energy == 0) {
                creep.memory.energyQ.state = 'entering';
            }
            else {
                var tlist = t.maintainer[creep.memory.home];
                var target = null;
                for (var i = 0; i < tlist.length; i++) {
                    if (tlist[i].length) {
                        target = tlist[i][0];
                        break;
                    }
                }
                if (target) {
                    if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    upgrader[rooms[creep.memory.home].phase](creep, t);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' maintainer: ' + etime);
    },
    emergency: function(creep) {
        var e = require('emergency');
        e.emergency(creep);
    }
};
maintainer.phase3 = maintainer.phase2 = maintainer.phase1;

// END role.maintainer.js
