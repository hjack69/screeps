var tank = {
    targets: function() {
        return {
            dest: new RoomPosition(8, 22, room_targ),
            deploy: army_deploy,
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
