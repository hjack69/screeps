var healer = {
    targets: function() {
        var out = {waiting:{
            E63N59: new RoomPosition(22, 43, 'E63N59')
        }};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = [
                Game.rooms[r].find(FIND_MY_CREEPS, {filter:(c)=>{return c.hits < c.hitsMax/2}}),
                Game.rooms[r].find(FIND_MY_CREEPS, {filter:(c)=>{return c.hits < c.hitsMax}})
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            if (creep.memory.action == 'renewing') {
                var s = Game.spawns[Memory.rooms[creep.memory.home][creep.memory.phase].spawn];
                var r = s.renewCreep(creep)
                if (r == ERR_NOT_IN_RANGE) {
                    creep.moveTo(s);
                }
                else if (r == ERR_FULL) {
                    creep.memory.action = '';
                }
            }
            var tlist = t.healer[creep.memory.home];
            var target = null;
            for (var i = 0; i < tlist.length; i++) {
                if (tlist[i].length) {
                    target = creep.pos.findClosestByRange(tlist[i]);
                    break;
                }
            }
            if (target) {
                creep.memory.action = '';
                if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target.pos);
                }
            }
            else {
                var s = Game.spawns[Memory.rooms[creep.memory.home][creep.memory.phase].spawn];
                if (creep.ticksToLive < 250 && (creep.memory.action == '' || !creep.memory.action)) {
                    creep.memory.action = 'renewing';
                }
                else if (creep.memory.action == '') {
                    creep.moveTo(t.healer.waiting[creep.memory.home]);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' healer: ' + etime);
    }
};
healer.phase2 = healer.phase1;
healer.emergency = healer.phase1;

// END role.healer.js
