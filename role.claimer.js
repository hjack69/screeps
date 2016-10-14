var claimer = {
    targets: function() {
        return {
            'E63N59': 'E63N58',
            'E63N58': 'E63N57',
            'E63N57': 'E64N57',
            'E64N57': 'E64N58',
            'E64N58': 'dest'
        };
    },
    phase1: function(creep, t) {
        creep.memory.dontSpawn = true;
        tlist = t.claimer;
        if (tlist[creep.room.name] != 'dest') {
            creep.moveTo(new RoomPosition(25, 25, tlist[creep.room.name]));
        }
        else {
            creep.moveTo(Game.rooms[creep.room.name].controller);
            if (creep.claimController(Game.rooms[creep.room.name].controller) == ERR_GCL_NOT_ENOUGH) {
                creep.reserveController(Game.rooms[creep.room.name].controller);
            }
        }
    }
};
claimer.phase2 = claimer.phase1;

// END role.claimer.js
