
// creep.memory.renewQ = {
//       state:   the current queue state of the creep (entering, waiting, renewing)
// }
// renewQueue = {priority: [], normal: [], renewing: id}
var renewQueue = function(creep, t) {
    var roomName = creep.memory.home;
    if (!Memory.rooms[roomName].renewQueue) Memory.rooms[roomName].renewQueue = {priority:[], normal:[], renewing:''};
    var memorySpace = creep.memory.renewQ;
    if (memorySpace.state == 'entering') {
        if (creep.memory.role == 'energyMiner' || creep.memory.role == 'spawner') {
            Memory.rooms[roomName].renewQueue.priority.push(creep.id);
        }
        else Memory.rooms[roomName].renewQueue.normal.push(creep.id);
    }
    else if (memorySpace.state == 'waiting') {
        var rq = Memory.rooms[roomName].renewQueue;
        if (creep.memory.role == 'energyMiner' || creep.memory.role == 'spawner') {
            if (rq.renewing == '' && rq.priority[0] == creep.id) {
                Memory.rooms[roomName].renewQueue.priority.shift();
                Memory.rooms[roomName].renewQueue.renewing = creep.id;
                creep.memory.renewQ.state = 'renewing';
            }
            else {
                if (creep.memory.energyQ.state != '') energyQueue[rooms[roomName].phase](creep);
                else roles[creep.memory.role][rooms[roomName].phase](creep, t);
            }
        }
        else {
            if (rq.renewing == '' && rq.priority.length == 0 && rq.normal[0] == creep.id) {
                Memory.rooms[roomName].renewQueue.normal.shift();
                Memory.rooms[roomName].renewQueue.renewing = creep.id;
                creep.memory.renewQ.state = 'renewing';
            }
            else {
                if (creep.memory.energyQ.state != '') energyQueue[rooms[roomName].phase](creep);
                else roles[creep.memory.role][rooms[roomName].phase](creep, t);
            }
        }
    }
    else if (memorySpace.state == 'renewing') {
        var roomName = creep.memory.home;
        var s = Game.spawns[rooms[roomName].spawn];
        if (s.renewCreep(creep) == ERR_FULL) {
            Memory.rooms[roomName].renewQueue.renewing = '';
            creep.memory.renewQ.state = '';
        }
        else {
            creep.moveTo(s);
            s.renewCreep(creep);
        }
    }
    else {
        console.log('renewQueue was called on '+creep.name+' ('+creep.memory.role+'), but had no renewState. Correcting...');
        if (creep.memory.role == 'energyMiner' || creep.memory.role == 'spawner') {

        }
        var qIndex = Memory.rooms[roomName].renewQueue.indexOf(creep.id);
        if (qIndex > -1) Memory.rooms[roomName].renewQueue.splice(qIndex, 1);
        creep.memory.renewQ = 'entering';
        renewQueue(creep);
    }
};
// END renewQueue.js
