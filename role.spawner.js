var spawner = {
    targets: function() {
        var out = {};
        for (var r in rooms) {
            out[r] = Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_SPAWN || s.structureType==STRUCTURE_EXTENSION) && s.energy< s.energyCapacity}});
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();

        if (!creep.memory.spawner) creep.memory.spawner = {};

        if (creep.ticksToLive < 250 && creep.memory.renewQ.state == '') {
            creep.memory.renewQ.state = 'renewing';
        }
        else if (creep.carry.energy == 0) {
            creep.memory.energyQ.state = 'entering';
        }
        else {
            var tlist = t.spawner[creep.memory.home];
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
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' spawner: ' + etime);
    }
};
spawner.phase3 = spawner.phase2 = spawner.phase1;
spawner.emergency = spawner.phase1;

// END role.spawner.js
