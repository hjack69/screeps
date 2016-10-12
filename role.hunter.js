var hunter = {
    targets: function() {
        var r = room_targ;
        var h = new RoomPosition(25, 25, r);
        var ignoreOwners = ['roboboy'];
        var t = {target: null, s_targ: null, t_targ: null};
        try {
            t = [
                Game.getObjectById('57fd5e10c91257622f6093ab')==null ? [] : [Game.getObjectById('57fd5e10c91257622f6093ab')],
                h.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (s)=> {return s.structureType == STRUCTURE_TOWER && ignoreOwners.indexOf(s.owner.username) == -1}}),
                h.findClosestByRange(FIND_HOSTILE_SPAWNS, {filter: (s) => {return ignoreOwners.indexOf(s.owner.username) == -1}}),
                h.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (s)=> {return s.structureType == STRUCTURE_EXTENSION && ignoreOwners.indexOf(s.owner.username) == -1}}),
                h.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (s) => {return ignoreOwners.indexOf(s.owner.username) == -1}})
            ];
        }
        catch(err) {}
        var out = {
            deploy: false,
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
                    if (tlist.target[i].length && tlist.target[i][0]) {
                        target = tlist.target[i][0];
                    }
                }
                if (target && creep.attack(target) == ERR_NOT_IN_RANGE) {
                    target.moveTo(target);
                }
                else {
                    creep.moveTo(tlist.stage);
                }
            }
            else {
                creep.moveTo(tlist.stage);
            }
        }
    }
};
hunter.phase2 = hunter.phase1;

// END role.hunter.js
