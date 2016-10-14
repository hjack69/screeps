var queue = {
    phase1: function(creep) {
        var stime = Game.cpu.getUsed();
        var roomMem = Memory.rooms[creep.memory.home].phase1;
        var roomInf = rooms[creep.memory.home].energyInfo;
        if (!Game.getObjectById(roomMem.energyQ[creep.memory.qindex][0])) {
            roomMem.energyQ[creep.memory.qindex].shift();
        }
        if (creep.memory.qstate == 'entering') {
            var qindex = 0;
            for (var i=0; i < roomMem.energyQ.length; i++) {
                if (roomMem.energyQ[i].length <= roomMem.energyQ[qindex].length) {
                    qindex = i;
                }
            }
            creep.memory.qindex = qindex;
            roomMem.energyQ[qindex].push(creep.id);
            creep.memory.qstate = 'waiting';
            creep.moveTo(roomInf[qindex].wpos);
        }
        else if (creep.memory.qstate == 'waiting') {
            if (roomMem.energyQ[creep.memory.qindex][0] == creep.id) {
                creep.memory.qstate = 'harvesting';
            }
            else {
                if (roomMem.energyQ[creep.memory.qindex].indexOf(creep.id) == -1) {
                    creep.memory.qstate = 'entering';
                }
                else {
                    var p = roomInf[creep.memory.qindex].wpos;
                    var d = roomInf[creep.memory.qindex].wdir;
                    var i = roomMem.energyQ[creep.memory.qindex].indexOf(creep.id);
                    creep.moveTo(p.x+(d.x*i), p.y+(d.y*i));
                }
            }
        }
        else if (creep.memory.qstate == 'harvesting') {
            if (creep.carry.energy == creep.carryCapacity) {
                roomMem.energyQ[creep.memory.qindex].shift();
                creep.memory.qstate = '';
            }
            else {
                var o = Game.getObjectById(roomInf[creep.memory.qindex].sid).pos;
                var cnts = o.findInRange(FIND_STRUCTURES, 1, {filter: (s)=>{return s.structureType == STRUCTURE_CONTAINER}});
                if (cnts.length) {
                    if (creep.withdraw(cnts[0], RESOURCE_ENERGY, creep.carryCapacity-_.sum(creep.carry)) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(cnts[0]);
                    }
                }
                else {
                    var source = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
                    if (creep.pickup(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' queueP1: ' + (Game.cpu.getUsed() - stime));
    },
    phase2: function(creep) {
        var stime = Game.cpu.getUsed();
        var roomInf = rooms[creep.memory.home].energyInfo;
        var roomMem = Memory.rooms[creep.memory.home].phase2;
        if (!Game.getObjectById(roomMem.energyQ[creep.memory.qindex][0])) {
            roomMem.energyQ[creep.memory.qindex].shift();
        }
        if (creep.memory.qstate == 'entering') {
            var qindex = 0;
            for (var i=0; i < roomMem.energyQ.length; i++) {
                var d = Game.getObjectById(roomInf[i].sid);
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
            creep.moveTo(roomInf[creep.memory.qindex].wpos);
        }
        else if (creep.memory.qstate == 'waiting') {
            if (roomMem.energyQ[creep.memory.qindex][0] == creep.id) { // && creep.carryCapacity <= Game.getObjectById(roomInf[creep.memory.qindex].sid).store[RESOURCE_ENERGY]) {
                creep.memory.qstate = 'harvesting';
            }
            else {
                if (roomMem.energyQ[creep.memory.qindex].indexOf(creep.id) == -1) {
                    creep.memory.qstate = 'entering';
                }
                else {
                    var p = roomInf[creep.memory.qindex].wpos;
                    var d = roomInf[creep.memory.qindex].wdir;
                    var i = roomMem.energyQ[creep.memory.qindex].indexOf(creep.id);
                    creep.moveTo(p.x+(d.x*i), p.y+(d.y*i));
                }
            }
        }
        else if (creep.memory.qstate == 'harvesting') {
            if (creep.carry.energy == creep.carryCapacity) {
                roomMem.energyQ[creep.memory.qindex].shift();
                creep.memory.qstate = '';
            }
            else {
                var source = Game.getObjectById(roomInf[creep.memory.qindex].sid);
                if (creep.withdraw(source, RESOURCE_ENERGY, creep.carryCapacity-_.sum(creep.carry)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source.pos);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' queueP2: ' + etime);
    }
};
queue.emergency = queue.phase2;
// END queue.js
