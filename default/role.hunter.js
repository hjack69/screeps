// Hunter
role = {
    targets: function() {
        var h = new RoomPosition(31, 21, 'E56S7');
        var out = {
            deploy: false,
            stage: new RoomPosition(18, 34, 'E58S8'),
            dest: 'E56S7',
            target: h.findClosestByRange(FIND_HOSTILE_SPAWNS),
            sec_target: h.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (s)=>{return s.structureType == STRUCTURE_EXTENSION}})
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
            else {
                creep.moveTo(tlist.stage);
            }
        }
    }
};
role.phase2 = role.phase1;

module.exports = role;