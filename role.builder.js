var builder = {
    targets: function() {
        var out = {};
        for (var r in rooms) {
            out[r] = [
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter: (s) => {return s.structureType == STRUCTURE_CONTAINER}}),
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter: (structure) => {return (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART)}}),
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER)}}),
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter: (structure) => {return (structure.structureType != STRUCTURE_ROAD)}}),
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES)
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }

        if (!creep.memory.builder) {
            creep.memory.builder = {};
        }

        if (creep.ticksToLive < 250 && creep.memory.renewQ.state == '') {
            creep.memory.renewQ.state = 'entering';
        }
        else if (creep.carry.energy == 0) {
            creep.memory.energyQ.state = 'entering';
        }
        else {
            var tlist = t.builder[creep.memory.home];
            var target = null;
            for (var i = 0; i < tlist.length; i++) {
                if (tlist[i].length) {
                    target = tlist[i][0];
                    break;
                }
            }
            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                upgrader[creep.memory.phase](creep, t);
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' builder: ' + etime);
    },
    emergency: function(creep) {
        var emergencyRole = require('emergency');
        emergencyRole.emergency(creep);
    }
};
builder.phase3 = builder.phase2 = builder.phase1;
// END role.builder.js
