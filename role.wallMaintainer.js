var wallMaintainer = {
    targets: function() {
        var out = {};
        for (var r in rooms) {
            out[r] = [
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_RAMPART) && s.hits<1000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL) && s.hits<1000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_RAMPART) && s.hits<100000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL) && s.hits<100000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_RAMPART) && s.hits<500000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL) && s.hits<500000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_RAMPART) && s.hits< s.hitsMax/2}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL) && s.hits< s.hitsMax/2}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_RAMPART) && s.hits< s.hitsMax}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL) && s.hits< s.hitsMax}})
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
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
                var tlist = t.wallMaintainer[creep.memory.home];
                var target = null;
                for (var i = 0; i < tlist.length; i++) {
                    if (tlist[i].length && tlist[i][0] != undefined) {
                        target = tlist[i][0];
                        break;
                    }
                }
                if (target) {
                    if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    maintainer[rooms[creep.memory.home].phase](creep, t);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' wallMaintainer: ' + etime);
    }
};
wallMaintainer.phase2 = wallMaintainer.phase1;
wallMaintainer.emergency = wallMaintainer.phase1;

// END role.wallMaintainer.js
