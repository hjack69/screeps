// Mover
var role = {
    targets: function() {
        var ignore = ['57d610127ad9eb17488d16da', '57d62ea571b05ff46c40f97a', '57e5c6ea1edb65e960465b5d', '57e4e774ca8a16370cb176fb', '57ddccbe3379dcf753c3be11'];
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = [
                Game.rooms[r].find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_LINK && s.energy < s.energyCapacity && ignore.indexOf(s.id) == -1}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) < s.storeCapacity && ignore.indexOf(s.id) == -1}})
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(25, 25, creep.memory.home)
        }
        else {
            if (creep.carry.energy == 0) {
                creep.memory.qstate = 'entering'
            }
            else {
                var tlist = t.mover[creep.memory.home];
                var target = null;
                for (var i=0; i<tlist.length; i++) {
                    if (tlist[i].length) {
                        target = creep.pos.findClosestByRange(tlist[i]);
                        break;
                    }
                }
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    var upgraderRole = require('role.upgrader');
                    upgraderRole[creep.memory.phase](creep, t);
                }
            }
        }
    },
	emergency: function(creep, t) {
	    var e = require('emergency');
        e.emergency(creep);
	}
};
role.phase2 = role.phase1;

module.exports = role;