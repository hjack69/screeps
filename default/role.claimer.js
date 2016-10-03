// Claimer
var role = {
    targets: function() {
        return null;
    },
    phase1: function(creep, t) {
        creep.memory.dontSpawn = true;
        var r = 'E13S55';
        creep.moveTo(new RoomPosition(8, 34, r));
        try {
            if (creep.claimController(Game.rooms[r].controller) == ERR_GCL_NOT_ENOUGH) {
                creep.reserveController(Game.rooms[r].controller);
            }
        }
        catch (err) {
            //console.log(err);
        }
    }
};
role.phase2 = role.phase1;

module.exports = role;