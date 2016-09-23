var roleMaintainer = require('role.maintainer');
// Wall Maintainer
var role = {
    targets: function() {
        var out = {};
        for (var r in Memory.myRooms) {
            out[r] = [
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL||s.structureType==STRUCTURE_RAMPART) && s.hits<500000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL|| s.structureType==STRUCTURE_RAMPAR) && s.hits< s.hitsMax/2}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL|| s.structureType==STRUCTURE_RAMPAR) && s.hits< s.hitsMax}})
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        if (creep.carry.energy == 0) {
            creep.memory.qstate = 'entering';
        }
        else {
            var tlist = t.wallMaintainer[creep.memory.home];
            var target = null;
            for (var i=0; i<tlist.length; i++) {
                if (tlist[i].length) {
                    target = creep.pos.findClosestByRange(tlist);
                    break;
                }
            }
            if (target) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                var maintainerRole = require('role.maintainer');
                maintainerRole[Game.rooms[creep.memory.home].memory.phase](creep, t);
            }
        }
    }
};
role.phase2 = role.phase1;
role.emergency = role.phase1;

module.exports = role;