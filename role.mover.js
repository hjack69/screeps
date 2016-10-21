var mover = {
    targets: function() {
        var ignore = ign;
        var out = {};
        for (var r in rooms) {
            out[r] = [
                Game.rooms[r].find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_LINK && s.energy < s.energyCapacity && ignore.indexOf(s.id) == -1}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) < s.storeCapacity && ignore.indexOf(s.id) == -1}})
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();

        if (!creep.memory.mover) creep.memory.move = {};

        if (creep.room.name != creep.memory.home) {
            creep.moveTo(25, 25, creep.memory.home)
        }
        else {
            if (creep.ticksToLive < 250 && creep.memory.renewQ.state == '') {
                creep.memory.renewQ.state = 'entering';
            }
            else if (creep.carry.energy == 0) {
                creep.memory.energyQ.state = 'entering'
            }
            else {
                var tlist = t.mover[creep.memory.home];
                var target = null;
                for (var i = 0; i < tlist.length; i++) {
                    if (tlist[i].length) {
                        target = tlist[i][0];
                        break;
                    }
                }
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    spawner.phase1(creep, t);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' mover: ' + etime);
    },
    emergency: function(creep, t) {
        var e = require('emergency');
        e.emergency(creep);
    }
};
mover.phase3 = mover.phase2 = mover.phase1;

// END role.mover.js
