var hunter = {
    targets: function() {
        var r = room_targ;
        var h = new RoomPosition(25, 25, r);
        var ignoreOwners = ['roboboy'];
        var t = [];
        try {
            t = [
                Game.getObjectById('57fd5e10c91257622f6093ab'),
                h.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (s)=> {return s.structureType == STRUCTURE_TOWER && ignoreOwners.indexOf(s.owner.username) == -1}}),
                h.findClosestByRange(FIND_HOSTILE_CREEPS),
                h.findClosestByRange(FIND_HOSTILE_SPAWNS),
                h.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (s) => {return s.structureType != STRUCTURE_CONTROLLER}}),
            ];
        }
        catch(err) {}
        var out = {
            deploy: army_deploy,
            stage: army_stage,
            dest: r,
            target: t
        };
        return out;
    },
    phase1: function(creep, t) {
        creep.memory.dontSpawn = true;
        var tlist = t.hunter;
        if (creep.room.name != tlist.dest) {
            if (tlist.deploy) {
                creep.moveTo(new RoomPosition(25, 25, tlist.dest));
            }
            else {
                creep.moveTo(tlist.stage);
            }
        }
        else {
            if (tlist.target.length) {
                var target;
                for (var i=0; i<tlist.target.length; i++) {
                    if (tlist.target[i]) {
                        target = tlist.target[i];
                        break;
                    }
                }
                if (target) {
                    creep.attack(target)
                    creep.moveTo(target);
                }
                else if (!target) {
                    creep.moveTo(new RoomPosition(25, 25, tlist.dest));
                }
            }
            else {
                creep.moveTo(tlist.stage);
            }
        }
    }
};
hunter.phase3 = hunter.phase2 = hunter.phase1;

// END role.hunter.js
