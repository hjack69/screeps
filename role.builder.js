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

        if (creep.carry.energy == 0) {
            creep.memory.qstate = 'entering';
        }
        else {
            if (creep.ticksToLive < 250 && (creep.memory.action == '' || !creep.memory.action) && Memory.rooms[creep.memory.home][rooms[creep.memory.home].phase].enableRenew) {
                creep.memory.action = 'renewing';
            }

            if (creep.memory.action == 'renewing') {
                var s = Game.spawns[rooms[creep.memory.home].spawn];
                var r = s.renewCreep(creep);
                if (r == ERR_NOT_IN_RANGE) {
                    creep.moveTo(s);
                }
                else if (r == ERR_FULL) {
                    creep.memory.action = '';
                }
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
