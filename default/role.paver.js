var roleBuilder = require('role.builder');
// Paver
var role = {
    targets: function() {
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter:(s)=>{return s.structureType == STRUCTURE_ROAD}});
        }
        return out;
    },
    phase1: function(creep, t) {
        if (creep.carry.energy == 0) {
            creep.memory.qstate = 'entering';
        }
        else {
            var tlist = t.paver[creep.memory.home];
            var target = creep.pos.findClosestByRange(tlist);
            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                var builderRole = require('role.builder');
                builderRole[Game.rooms[creep.memory.home].memory.phase](creep, t);
            }
        }
	},
	emergency: function(creep, t) {
	    var e = require('emergency');
        e.emergency(creep, t);
	}
};
role.phase2 = role.phase1;

module.exports = role;