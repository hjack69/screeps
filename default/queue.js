var queue = {
    phase1: function(creep) {
        var roomMem = Game.rooms[creep.memory.home].memory.phase1;
        if (!Game.getObjectById(roomMem.energyQ[creep.memory.qindex][0])) {
            roomMem.energyQ[creep.memory.qindex].shift();
        }
        if (creep.memory.qstate == 'entering') {
            var qindex = 0;
            for (var i=0; i < roomMem.energyQ.length; i++) {
                if (roomMem.energyQ[i].length <= roomMem.energyQ[qindex].length && Game.getObjectById(roomMem.energyInfo[i].targetid).energy >= creep.carryCapacity) {
                    qindex = i;
                }
            }
            creep.memory.qindex = qindex;
            roomMem.energyQ[qindex].push(creep.id);
            creep.memory.qstate = 'waiting';
            creep.moveTo(roomMem.energyInfo[qindex].waitingpos);
        }
        else if (creep.memory.qstate == 'waiting') {
            if (roomMem.energyQ[creep.memory.qindex][0] == creep.id &&
                roomMem.energyInfo[creep.memory.qindex].harvesting < roomMem.energyInfo[creep.memory.qindex].canharvest) {
                creep.memory.qstate = 'harvesting';
                roomMem.energyQ[creep.memory.qindex].shift();
            }
            else {
                if (roomMem.energyQ[creep.memory.qindex].indexOf(creep.id) == -1) {
                    creep.memory.qstate = 'entering';
                }
                else {
                    var p = roomMem.energyInfo[creep.memory.qindex];
                    var i = roomMem.energyQ[creep.memory.qindex].indexOf(creep.id);
                    creep.moveTo(p.waitingpos.x+(p.qdirection.x*i), p.waitingpos.y+(p.qdirection.y*i));
                }
            }
        }
        else if (creep.memory.qstate == 'harvesting') {
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.qstate = '';
            }
            else {
                var source = Game.getObjectById(roomMem.energyInfo[creep.memory.qindex].targetid);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source.pos);
                }
            }
        }
    },
    phase2: function(creep) {
        var roomMem = Game.rooms[creep.memory.home].memory.phase2;
        if (!Game.getObjectById(roomMem.energyQ[creep.memory.qindex][0])) {
            roomMem.energyQ[creep.memory.qindex].shift();
        }
        if (creep.memory.qstate == 'entering') {
            var qindex = 0;
            for (var i=0; i < roomMem.energyQ.length; i++) {
                var d = Game.getObjectById(roomMem.energyInfo[i].targetid);
                if (d) {
                    if (roomMem.energyQ[i].length < roomMem.energyQ[qindex].length &&
                        d.store[RESOURCE_ENERGY] > 0) {
                        qindex = i;
                    }
                }
            }
            creep.memory.qindex = qindex;
            roomMem.energyQ[qindex].push(creep.id);
            creep.memory.qstate = 'waiting';
            creep.moveTo(roomMem.energyInfo[creep.memory.qindex].waitingpos);
        }
        else if (creep.memory.qstate == 'waiting') {
            if (roomMem.energyQ[creep.memory.qindex][0] == creep.id &&
                roomMem.energyInfo[creep.memory.qindex].harvesting < roomMem.energyInfo[creep.memory.qindex].canharvest &&
                creep.carryCapacity <= Game.getObjectById(roomMem.energyInfo[creep.memory.qindex].targetid).store[RESOURCE_ENERGY]) {
                creep.memory.qstate = 'harvesting';
                roomMem.energyQ[creep.memory.qindex].shift();
            }
            else {
                if (roomMem.energyQ[creep.memory.qindex].indexOf(creep.id) == -1) {
                    creep.memory.qstate = 'entering';
                }
                else {
                    var p = roomMem.energyInfo[creep.memory.qindex];
                    var i = roomMem.energyQ[creep.memory.qindex].indexOf(creep.id);
                    creep.moveTo(p.waitingpos.x+(p.qdirection.x*i), p.waitingpos.y+(p.qdirection.y*i));
                }
            }
        }
        else if (creep.memory.qstate == 'harvesting') {
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.qstate = '';
            }
            else {
                var source = Game.getObjectById(roomMem.energyInfo[creep.memory.qindex].targetid);
                if (creep.withdraw(source, RESOURCE_ENERGY, creep.carryCapacity-_.sum(creep.carry)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source.pos);
                }
            }
        }
    }
}
queue.emergency = queue.phase2;

module.exports = queue;