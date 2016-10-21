var scruffy = {
    targets: function() {
        out = {};
        for (var r in rooms) {
            out[r] = {
                p:Game.rooms[r].find(FIND_DROPPED_ENERGY),
                d:Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER}})
            }
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();

        if (!creep.memory.scruffy) creep.memory.scruffy = {action: 'cleaning'};

        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            if (creep.carry.energy == creep.carryCapacity && creep.memory.scruffy.action == 'cleaning') {
                creep.memory.scruffy.action = 'dropping';
            }
            else if (creep.carry.energy == 0 && creep.memory.scruffy.action == 'dropping') {
                creep.memory.scruffy.action = 'cleaning';
            }

            if (creep.memory.scruffy.action == 'cleaning') {
                var target = t.scruffy[creep.memory.home].p[0];
                if (target) {
                    if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target.pos);
                    }
                }
                else {
                    maintainer[creep.memory.phase](creep, t);
                }
            }
            else if (creep.memory.scruffy.action == 'dropping') {
                var target = t.scruffy[creep.memory.home].d[0];
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target.pos);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' scruffy: ' + etime);
    }
};
scruffy.phase3 = scruffy.phase2 = scruffy.emergency = scruffy.phase1;

// END role.scruffy.js
