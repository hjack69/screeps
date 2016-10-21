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

        if (!creep.memory.towerFiller) creep.memory.towerFiller = {action: 'harvesting'};

        var tlist = t.towerFiller[creep.memory.home];
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else if (creep.ticksToLive < 250 && creep.memory.renewQ.state == '') {
            creep.memory.renewQ.state = 'entering';
        }
        else if (tlist.filling.length) {
            if (creep.carry.energy == 0 && creep.memory.towerFiller.action == 'filling') {
                creep.memory.towerFiller.action = 'harvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.towerFiller.action == 'harvesting') {
                creep.memory.towerFiller.action = 'filling';
            }

            if (creep.memory.towerFiller.action == 'harvesting') {
                var target = null;
                if (tlist.filling[0] && tlist.filling[0].structureType != STRUCTURE_STORAGE && tlist.harvesting.length) {
                    target = tlist.harvesting[0];
                }
                if (target) {
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    creep.memory.energyQ.state = 'entering';
                }
            }
            else if (creep.memory.towerFiller.action == 'filling') {
                var target = tlist.filling[0];
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        }
        else {
            spawner[creep.memory.phase](creep, t);
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' towerFiller: ' + etime);
    }
};
towerFiller.phase3 = towerFiller.phase2 = towerFiller.phase1;
towerFiller.emergency = towerFiller.phase1;

// END role.towerFiller.js
