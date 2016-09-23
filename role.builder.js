// Builder
var role = {
    targets: function() {
        var out = {};
        for (var r in Memory.myRooms) {
            out[r] = [
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter: (structure) => {return (structure.structureType == STRUCTURE_WALL)}}),
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter: (structure) => {return (structure.structureType != STRUCTURE_ROAD)}}),
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter: (structure) => {return (structure.structureType != STRUCTURE_ROAD)}}),
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES)
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }

        if (creep.carry.energy == 0) {
            creep.memory.qstate = 'entering';
            creep.say('harvesting');
        }
        else {
            var tlist = t.builder[creep.memory.home];
            var target = null;
            for (var i=0; i<tlist.length; i++) {
                if (tlist.length) {
                    target = creep.pos.findClosestByRange(tlist);
                    break;
                }
            }
            if (target) {
                creep.moveTo(target);
            }
            else {
                var upgraderRole = require('role.upgrader');
                upgraderRole[creep.memory.phase](creep);
            }
        }
	},
	emergency: function(creep) {
	    var emergencyRole = require('emergency');
        emergencyRole.emergency(creep);
	}
};
role.phase2 = role.phase1;

module.exports = role;