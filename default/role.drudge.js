// Drudge
var role = {
    targets: function() {
        var r = 'E13S55';
        var out = {dest: r, targets: [], sources: []};
        try {
            out.targets = Game.rooms[r].find(FIND_CONSTRUCTION_SITES);
            out.sources = Game.rooms[r].find(FIND_SOURCES);
            out.controller = Game.rooms[r].controller;
        } catch(err) {}
        return out;
    },
    phase1: function(creep, t) {
        var tlist = t.drudge;
        if (creep.room.name != tlist.dest) {
            creep.moveTo(new RoomPosition(25, 25, r));
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
                var t = creep.pos.findClosestByRange(tlist.sources);
                if (t && creep.harvest(t) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(t);
                }
            }
            else if (creep.memory.action == 'building' && creep.memory.workingOn == 'builder') {
                var t = creep.pos.findClosestByRange(tlist.targets);
                if (t && creep.build(t) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(t);
                }
            }
            else if (creep.memory.action == 'building' && creep.memory.workingOn == 'upgrader') {
                var t = tlist.controller;
                if (t && creep.upgradeController(t) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(t);
                }
            }
        }
    }
};

role.phase2 = role.phase1;
module.exports = role;