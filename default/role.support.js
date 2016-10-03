// Support
var role = {
    targets: function() {
        var r = 'E11S59';
        var h = new RoomPosition(21, 22, r);
        var includeOwners = ['the_beanstalk', 'roboboy'];
        var t = {target: null, s_targ: null, t_targ: null};
        try {
            t = {
                target: h.findClosestByRange(FIND_CREEPS, {filter: (s) => {return s.hits < s.hitsMax/2 && ignoreOwners.indexOf(s.owner.username) == -1}}),
                s_targ: h.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (s)=> {return s.hits < s.hitsMax && ignoreOwners.indexOf(s.owner.username) == -1}}),
            };
        }
        catch(err) {}
        var out = {
            deploy: false,
            stage: new RoomPosition(6, 45, 'E13S56'),
            dest: r,
            target: t.target,
            sec_target: t.s_targ,
            t_target: t.t_targ,
        };
        return out;
    },
    phase1: function(creep, t) {
        var tlist = t.hunter;
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
                if (creep.attack(tlist.target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tlist.target);
                }
            }
            else if (tlist.sec_target) {
                if (creep.attack(tlist.sec_target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tlist.sec_target);
                }
            }
            else if (tlist.t_target) {
                if (creep.attack(tlist.t_target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tlist.t_target);
                }
            }
            else {
                creep.moveTo(tlist.stage);
            }
        }
    }
};

module.exports = role;