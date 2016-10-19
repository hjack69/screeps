var upgrader = {
    targets: function() {
        var only_these = {
            E63N59: ['57fc9dd698812bf3681c8829', '580514436c47dea9463e6a01'],
            E61N58: ['5805b86cdf8ca9af0aecf77b'],
            E64N58: ['5801324c7c292ce83567328f'],
        };
        var out = {};
        for (var r in rooms) {
            out[r] = [];
            for (var j=0; j < only_these[r].length; j++) {
                var t = Game.getObjectById(only_these[r][j])
                if (t) {
                    out[r].push(t);
                }
            }
        }
        return out;
    },
    // Takes the creep, and a dictionary of lists describing harvesting targets in the room
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            if (creep.memory.action != 'uharvesting' && creep.memory.action != 'upgrading' && creep.memory.action != 'renewing') {
                creep.memory.action = 'uharvesting';
            }
            else if (creep.ticksToLive < 250 && creep.memory.action != 'renewing' && Memory.rooms[creep.memory.home][rooms[creep.memory.home].phase].enableRenew) {
                creep.memory.action = 'renewing';
            }
            else if (creep.carry.energy == 0 && creep.memory.action != 'uharvesting') {
                creep.memory.action = 'uharvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.action != 'upgrading') {
                creep.memory.action = 'upgrading';
            }

            if (creep.memory.action == 'renewing') {
                var s = Game.spawns[rooms[creep.memory.home].spawn];
                var r = s.renewCreep(creep);
                if (r == ERR_NOT_IN_RANGE) {
                    creep.moveTo(s);
                }
                else if (r == ERR_FULL) {
                    creep.memory.action = 'upgrading';
                }
            }
            if (creep.memory.action == 'uharvesting') {
                var tlist = t.upgrader[creep.memory.home];
                var target = creep.pos.findClosestByRange(tlist, {filter:(s)=>{return (s.structureType == STRUCTURE_LINK && s.energy >= creep.carryCapacity) || (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= creep.carryCapacity)}});
                if (target) {
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    creep.memory.qstate = 'entering';
                }
            }
            else if (creep.memory.action == 'upgrading') {
                var room = Game.rooms[creep.memory.home];
                if (creep.upgradeController(room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(room.controller);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' upgrader: ' + etime);
    }
};
upgrader.phase3 = upgrader.phase2 = upgrader.emergency = upgrader.phase1;

// END role.upgrader.js
