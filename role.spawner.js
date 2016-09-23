// Spawner
var role = {
    targets: function() {
        var out = {};
        for (var r in Memory.myRooms) {
            out[r] = Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_SPAWN || s.structureType==STRUCTURE_EXTENSION) && s.energy< s.energyCapacity}});
        }
        return out;
    },
    phase1: function(creep, t) {
        if (creep.carry.energy == 0) {
            creep.memory.qstate = 'entering';
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
                var moverRole = require('role.mover');
                moverRole[Game.rooms[creep.memory.home].memory.phase](creep, t);
            }
        }
    }
};
role.phase2 = role.phase1;
role.emergency = role.phase1;

module.exports = role;