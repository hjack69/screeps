var drudge = {
    targets: function() {
        var r = room_targ;
        var out = {dest: r, targets: [], sources: []};
        try {
            out.targets = Game.rooms[r].find(FIND_MY_CONSTRUCTION_SITES);//, {filter: (s) => {return s.structureType == STRUCTURE_SPAWN}});
            out.sources = Game.rooms[r].find(FIND_SOURCES);
            out.controller = Game.rooms[r].controller;
        } catch(err) {}
        out.rpath = {
            'E63N59': 'E63N58',
            'E63N58': 'E63N57',
            'E63N57': 'E64N57',
            'E64N57': 'E64N58',
            'E64N58': 'dest'
        };
        return out;
    },
    phase1: function(creep, t) {
        creep.memory.dontSpawn = true;
        var stime = Game.cpu.getUsed();
        var tlist = t.drudge;
        if (tlist.rpath[creep.room.name] != 'dest') {
            creep.moveTo(new RoomPosition(25, 25, tlist.rpath[creep.room.name]));
        }
        else {
            if (!creep.memory.action) {creep.memory.action = 'harvesting';}
            if (creep.carry.energy == 0 && creep.memory.action == 'building') {
                creep.memory.action = 'harvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'harvesting') {
                creep.memory.action = 'building';
            }

            if (creep.memory.action == 'harvesting') {
                var target = creep.pos.findClosestByRange(tlist.sources);
                if (target && creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else if (creep.memory.action == 'building' && creep.memory.flavor == 'builder') {
                var target = tlist.targets[0];
                if (target && creep.build(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else if (creep.memory.action == 'building' && creep.memory.flavor == 'upgrader') {
                var target = tlist.controller;
                if (target && creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {reusePath: 2});
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' drudge: ' + etime);
    }
};
drudge.phase2 = drudge.phase1;

// END role.drudge.js
