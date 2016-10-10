var tank = {
    targets: function() {
        return {
            dest: new RoomPosition(25, 25, 'E11S59'),
            deploy: false,
            stage: new RoomPosition(20, 25, 'E13S56')
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