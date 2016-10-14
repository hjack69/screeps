var spawner = {
    targets: function() {
        var out = {};
        for (var r in rooms) {
            out[r] = Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_SPAWN || s.structureType==STRUCTURE_EXTENSION) && s.energy< s.energyCapacity}});
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed()
        if (creep.carry.energy == 0) {
            creep.memory.qstate = 'entering';
        }
        else {
            var tlist = t.spawner[creep.memory.home];
            if (creep.ticksToLive < 250 && Memory.rooms[creep.memory.home][rooms[creep.memory.home].phase].enableRenew) {
                creep.memory.action = 'renewing';
            }
            if (creep.memory.action == 'renewing') {
                var s = Game.spawns[rooms[creep.memory.home].spawn];
                var r = s.renewCreep(creep)
                if (r == ERR_NOT_IN_RANGE) {
                    creep.moveTo(s);
                }
                else if (r == ERR_FULL || r == ERR_NOT_ENOUGH_ENERGY) {
                    creep.memory.action = '';
                }
            }
            if (creep.memory.action != 'renewing') {
                if (tlist.length) {
                    var target = creep.pos.findClosestByRange(tlist);
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    upgrader[rooms[creep.memory.home].phase](creep, t);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' spawner: ' + etime);
    }
};
spawner.phase2 = spawner.phase1;
spawner.emergency = spawner.phase1;

// END role.spawner.js
