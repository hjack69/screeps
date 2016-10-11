var claimer = {
    targets: function() {
        return {
            'E13S55': 'E13S56',
            'E13S56': 'E12S56',
            'E12S56': 'E11S56',
            'E11S56': 'E11S55',
            'E11S55': 'E11S54',
            'E11S54': 'E11S53',
            'E11S53': 'dest'
        };
    },
    phase1: function(creep, t) {
        creep.memory.dontSpawn = false;
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
        // var r = 'E11S53';
        // creep.moveTo(new RoomPosition(29, 32, r));
        // try {
        //     creep.moveTo(Game.rooms[r].controller);
        //     if (creep.claimController(Game.rooms[r].controller) == ERR_GCL_NOT_ENOUGH) {
        //         creep.reserveController(Game.rooms[r].controller);
        //     }
        // }
        // catch (err) {
        //     //console.log(err);
        // }
    }
};
claimer.phase2 = claimer.phase1;
