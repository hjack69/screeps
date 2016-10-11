var upgrader = {
    targets: function() {
        var only_these = {
            E63N59: ['57fc9dd698812bf3681c8829'],
        };
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
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
            else if (creep.ticksToLive < 250 && creep.memory.action != 'renewing') {
                creep.memory.action = 'renewing';
            }
            else if (creep.carry.energy == 0 && creep.memory.action != 'uharvesting') {
                creep.memory.action = 'uharvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.action != 'upgrading') {
                creep.memory.action = 'upgrading';
            }

            if (creep.memory.action == 'renewing') {
                var s = Game.spawns[Memory.rooms[creep.memory.home][creep.memory.phase].spawn];
                var r = s.renewCreep(creep)
                if (r == ERR_NOT_IN_RANGE) {
                    creep.moveTo(s);
                }
                else if (r == ERR_FULL || r == ERR_NOT_ENOUGH_ENERGY) {
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
upgrader.phase2 = upgrader.emergency = upgrader.phase1;
