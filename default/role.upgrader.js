// Upgrader: qstate, qindex, home
var role = {
    targets: function() {
        var only_these = {
            //E58S8: ['57ddccbe3379dcf753c3be11', '57ef8408a10a26f35ae5c1a1', '57e99414f4a2fb44238e7cdb'],
            //E58S7: ['57eaef4a0fe7d4d93854953c', '57e72d8feb8681b8219282aa'],
            E13S56: [],
            E16S57: [],
        };
        var out = {};
        for (var i in Memory.myRooms) { var r = Memory.myRooms[i];
            out[r] = [];
            for (var j=0; j < only_these[r].length; j++) {
                var t = Game.getObjectById(only_these[r][j])
                if (t) {
                    out[r].push(t);
                }
            }
        }
        return out;
    },
    // Takes the creep, and a dictionary of lists describing harvesting targets in the room
    phase1: function(creep, t) {
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            // var currents = creep.room.lookForAt(LOOK_STRUCTURES, creep.pos);
            // var f = false;
            // for (var i=0; i<currents.length; i++) {
            //     if (currents[i].structureType == STRUCTURE_ROAD) {
            //         f = true;
            //     }
            // }
            // if (!f && !creep.room.lookForAt(LOOK_CONSTRUCTION_SITES).length) {
            //     console.log('paving here')
            //     creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
            // }
            if (creep.memory.action != 'harvesting' && creep.memory.action != 'upgrading') {
                creep.memory.action = 'harvesting';
            }
            else if (creep.carry.energy == 0 && creep.memory.action == 'upgrading') {
                creep.memory.action = 'harvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'harvesting') {
                creep.memory.action = 'upgrading';
            }

            if (creep.memory.action == 'harvesting') {
                var tlist = t.upgrader[creep.memory.home];
                var target = creep.pos.findClosestByRange(tlist, {filter:(s)=>{return (s.structureType == STRUCTURE_LINK && s.energy >= creep.carryCapacity) || (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= creep.carryCapacity)}});
                if (target) {
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    creep.memory.qstate = 'entering';
                }
            }
            else if (creep.memory.action == 'upgrading') {
                var room = Game.rooms[creep.memory.home];
                if (creep.upgradeController(room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(room.controller);
                }
            }
        }
    }
};
role.phase2 = role.emergency = role.phase1;

module.exports = role;