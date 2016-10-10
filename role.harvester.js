var harvester = {
    targets: function() {
        var out = {};
        for (var r in Memory.myRooms) {

        }
        return out;
    },
    phase1: function(creep) {
        if (creep.carry.energy == 0) {
            creep.memory.qstate = 'entering';
            creep.say('harvesting');
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => {
                return ([STRUCTURE_SPAWN, STRUCTURE_EXTENSION].indexOf(structure.structureType) > -1) && structure.energy < structure.energyCapacity;
            }});
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {reusePath: 10});
                }
            }
            else {
                mover.phase1(creep);
            }
        }
    },
    phase2: function(creep) {
        if (creep.carry.energy == 0 && creep.memory.action == 'dumping') {
            creep.memory.action = 'harvesting';
        }
        else if (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'harvesting') {
            creep.memory.action = 'dumping';
        }

        if (creep.memory.action == 'harvesting') {
            if (creep.room.name != 'E58S7') {
                creep.moveTo(new RoomPosition(25, 25, 'E58S7'));
            }
            else {
                var target = creep.room.find(FIND_SOURCES)[0];
                if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                }
            }
        }
        else if (creep.memory.action == 'dumping') {
            if (creep.room.name != 'E58S8') {
                creep.moveTo(new RoomPosition(25,25,'E58S8'));
            }
            else {
                var target = Game.getObjectById('57d62ea571b05ff46c40f97a');
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    },
    emergency: function(creep) {
        var targets = Memory.currentEnemies
        if (targets.length) {
            creep.moveTo(targets[0].pos);
        }
    }
};