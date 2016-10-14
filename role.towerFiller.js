var towerFiller = {
    targets: function() {
        var out = {};
        for (var r in rooms) {
            out[r] = {
                'harvesting':Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] >= 50}}),
                'filling':Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return s.structureType==STRUCTURE_TOWER && s.energy<s.energyCapacity}}).concat(Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return s.structureType==STRUCTURE_STORAGE && s.store.energy<s.storeCapacity}}))
            };
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        var tlist = t.towerFiller[creep.memory.home];
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else if (tlist.filling.length) {
            if ((creep.memory.action != 'harvesting' && creep.memory.action != 'filling' && creep.memory.action != 'renewing') || (creep.carry.energy == 0 && creep.memory.action == 'filling')) {
                creep.memory.action = 'harvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'harvesting') {
                creep.memory.action = 'filling';
            }
            if (creep.ticksToLive < 250 && creep.memory.action != 'renewing' && Memory.rooms[creep.memory.home][rooms[creep.memory.home].phase].enableRenew) {
                creep.memory.action = 'renewing';
            }

            if (creep.memory.action == 'renewing') {
                var s = Game.spawns[rooms[creep.memory.home].spawn];
                var r = s.renewCreep(creep);
                if (r == ERR_NOT_IN_RANGE) {
                    creep.moveTo(s);
                }
                else if (r == ERR_FULL) {
                    creep.memory.action = 'filling';
                }
            }
            else if (creep.memory.action == 'harvesting') {
                creep.memory.qstate = 'entering';
                // var target = null;
                // if (tlist.harvesting.length) {
                //     target = tlist.harvesting[0];
                // }
                // if (target) {
                //     if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(target);
                //     }
                // }
                // else {
                //     creep.memory.qstate = 'entering';
                // }
            }
            else if (creep.memory.action == 'filling') {
                var target = tlist.filling[0];
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        }
        else {
            builder[creep.memory.phase](creep, t);
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' towerFiller: ' + etime);
    }
};
towerFiller.phase2 = towerFiller.phase1;
towerFiller.emergency = towerFiller.phase1;

// END role.towerFiller.js
