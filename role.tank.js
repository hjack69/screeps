var tank = {
    targets: function() {
        return {
            dest: new RoomPosition(25, 25, room_targ),
            deploy: false,
            stage: army_stage
        }
    },
    phase1: function(creep, t) {
        creep.memory.dontSpawn = true;
        var tlist = t.tank;
        if (tlist.deploy) {
            creep.moveTo(tlist.dest);
        }
        else {
            creep.moveTo(tlist.stage);
        }
    }
};
tank.phase2 = tank.phase1;

// END role.tank.js
