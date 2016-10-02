// Drudge
var role = {
    targets: function() {
        var out = [new RoomPosition(8, 40, 'E60S7')];
        return out;
    },
    phase1: function(creep, t) {
        var tlist = t.drudge;
        if (creep.room.name != 'E56S7') {
            creep.moveTo(new RoomPosition(25, 25, 'E56S7'));
        }
        else {
            var targ = Game.getObjectById('579faa4f0700be0674d30c93');
            creep.moveTo(targ);
            var t = creep.harvest(targ);
            //console.log(t)
        }
    }
};

role.phase2 = role.phase1;
module.exports = role;