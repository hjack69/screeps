var queue = {
    phase1: function(creep) {
        if (creep.memory.qstate == 'entering') {
            var qindex = 0;
            for (var i=0; i < creep.room.memory.energyq.length; i++) {
                if (creep.room.memory.energyq[i].length < creep.room.memory.energyq[qindex].length) {
                    qindex = i;
                }
            }
            creep.memory.qindex = qindex;
            creep.room.memory.energyq[qindex].push(creep.id);
            creep.memory.qstate = 'waiting';
            creep.moveTo(creep.room.memory.qpositions[creep.memory.qindex].waitingpos);
        }
        else if (creep.memory.qstate == 'waiting') {
            if (creep.room.memory.energyq[creep.memory.qindex][0] == creep.id &&
                creep.room.memory.qpositions[creep.memory.qindex].harvesting < creep.room.memory.qpositions[creep.memory.qindex].canharvest) {
                creep.memory.qstate = 'harvesting';
                creep.room.memory.energyq[creep.memory.qindex].shift();
            }
            else {
                var p = creep.room.memory.qpositions[creep.memory.qindex];
                var i = creep.room.memory.energyq[creep.memory.qindex].indexOf(creep.id);
                creep.moveTo(p.waitingpos.x+(p.qdirection.x*i), p.waitingpos.y+(p.qdirection.y*i));
            }
        }
        else if (creep.memory.qstate == 'harvesting') {
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.qstate = '';
            }
            else {
                var source = Game.getObjectById(creep.room.memory.qpositions[creep.memory.qindex].targetid);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source.pos);
                }
            }
        }
    },
    phase2: function(creep) {
        if (creep.memory.qstate == 'entering') {
            var qindex = 0;
            for (var i=0; i < creep.room.memory.energyq.length; i++) {
                if (creep.room.memory.energyq[i].length < creep.room.memory.energyq[qindex].length && 
                    Game.getObjectById(creep.room.memory.qpositions[i].targetid).store[RESOURCE_ENERGY] > 0) {
                    qindex = i;
                }
            }
            creep.memory.qindex = qindex;
            creep.room.memory.energyq[qindex].push(creep.id);
            creep.memory.qstate = 'waiting';
            creep.moveTo(creep.room.memory.qpositions[creep.memory.qindex].waitingpos);
        }
        else if (creep.memory.qstate == 'waiting') {
            if (creep.room.memory.energyq[creep.memory.qindex][0] == creep.id &&
                creep.room.memory.qpositions[creep.memory.qindex].harvesting < creep.room.memory.qpositions[creep.memory.qindex].canharvest &&
                creep.carryCapacity <= Game.getObjectById(creep.room.memory.qpositions[creep.memory.qindex].targetid).store[RESOURCE_ENERGY]) {
                creep.memory.qstate = 'harvesting';
                creep.room.memory.energyq[creep.memory.qindex].shift();
            }
            else {
                if (creep.room.memory.energyq[creep.memory.qindex].indexOf(creep.id) == -1) {
                    creep.memory.qstate = 'entering';
                }
                else {
                    var p = creep.room.memory.qpositions[creep.memory.qindex];
                    var i = creep.room.memory.energyq[creep.memory.qindex].indexOf(creep.id);
                    creep.moveTo(p.waitingpos.x+(p.qdirection.x*i), p.waitingpos.y+(p.qdirection.y*i));
                }
            }
        }
        else if (creep.memory.qstate == 'harvesting') {
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.qstate = '';
            }
            else {
                var source = Game.getObjectById(creep.room.memory.qpositions[creep.memory.qindex].targetid);
                if (creep.withdraw(source, RESOURCE_ENERGY, creep.carryCapacity-_.sum(creep.carry)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source.pos);
                }
            }
        }
    }
}
queue.emergency = queue.phase2;

module.exports = queue;