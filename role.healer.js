// Healer
var role = {
    phase1: function(creep) {
        var targets = creep.room.find(FIND_MY_CREEPS, {filter: (c) => {
            return c.hits < c.hitsMax/2;
        }});
        if (targets.length) {
            if (creep.heal(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0].pos, {reusePath: 10});
            }
        }
        else {
            targets = creep.room.find(FIND_MY_CREEPS, {filter: (c) => {
                return c.hits < c.hitsMax;
            }});
            if (targets.length) {
                if (creep.heal(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0].pos, {reusePath: 10});
                }
            }
            else {
                creep.moveTo(33, 46, {reusePath: 10});
            }
        }
    }
}
role.phase2 = role.phase1;
role.emergency = role.phase1;

module.exports = role;