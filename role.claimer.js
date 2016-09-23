// Claimer
var role = {
    phase1: function(creep) {
        creep.moveTo(new RoomPosition(23, 6, 'E58S7'));
        try {
            if (creep.claimController(Game.rooms.E58S7.controller) == ERR_GCL_NOT_ENOUGH) {
                creep.reserveController(Game.rooms.E58S7.controller);
            }
        }
        catch (err) {
            //console.log(err);
        }
    },
	emergency: function(creep) {
	    var targets = Memory.currentEnemies;
	    if (targets.length) {
	        creep.moveTo(targets[0].pos);
	    }
	}
}
role.phase2 = role.phase1;

module.exports = role;