var support = {
    targets: function() {
        var r = room_targ;
        var h = new RoomPosition(21, 22, r);
        var includeOwners = ['the_beanstalk', 'roboboy'];
        var t = {target: null, s_targ: null, t_targ: null};
        try {
            t = {
                target: h.findClosestByRange(FIND_CREEPS, {filter: (s) => {return s.hits < s.hitsMax/2}}),
                s_targ: h.findClosestByRange(FIND_CREEPS, {filter: (s)=> {return s.hits < s.hitsMax}}),
            };
        }
        catch(err) {}
        var out = {
            deploy: army_deploy,
            stage: army_stage,
            dest: r,
            target: t.target,
            sec_target: t.s_targ,
            t_target: t.t_targ,
        };
        return out;
    },
    phase1: function(creep, t) {
        creep.memory.dontSpawn = true;
        var tlist = t.support;
        if (creep.room.name != tlist.dest) {
            if (tlist.deploy) {
                creep.moveTo(new RoomPosition(31, 21, tlist.dest));
            }
            else {
                creep.moveTo(tlist.stage);
            }
        }
        else {
            if (tlist.target) {
                if (creep.heal(tlist.target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tlist.target);
                }
            }
            else if (tlist.sec_target) {
                if (creep.heal(tlist.sec_target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tlist.sec_target);
                }
            }
            else {
                creep.moveTo(new RoomPosition(25, 25, tlist.dest));
            }
        }
    }
};
support.phase3 = support.phase2 = support.phase1;

// END role.support.js
