// Drudge
var role = {
    targets: function() {
        var out = [new RoomPosition(25, 25, 'E59S7')];
        return out;
    },
    phase1: function(creep, t) {
        var tlist = t.drudge;
        if (tlist.length) {
            creep.moveTo(tlist[0]);
        }
        else {
            console.log('Fuck you, guy')
        }
    }
};

role.phase2 = role.phase1;
module.exports = role;