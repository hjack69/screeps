// Claimer
var role = {
    targets: function() {
        return null;
    },
    phase1: function(creep, t) {
        creep.moveTo(new RoomPosition(26, 39, 'E16S57'));
        try {
            if (creep.claimController(Game.rooms.E56S7.controller) == ERR_GCL_NOT_ENOUGH) {
                creep.reserveController(Game.rooms.E56S7.controller);
            }
        }
        catch (err) {
            //console.log(err);
        }
    }
};
role.phase2 = role.phase1;

module.exports = role;