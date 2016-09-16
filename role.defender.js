// Defender
var role = {
    phase1: function(creep) {
        // var targets = [creep.room.controller];
        // if (targets.length) {
        //     if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(targets[0].pos);
        //     }
        // }
        var targets = creep.room.find(FIND_HOSTILE_CREEPS);
        if (targets.length) {
            if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0].pos, {reusePath: 10});
            }
        }
        else {
            creep.moveTo(new RoomPosition(33, 46, 'E58S8'))
        }
    }
}
role.phase2 = role.phase1;
role.emergency = role.phase1;

module.exports = role;