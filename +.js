var merge = function(a, b) {
    for (var x in b) {
        a[x] = b[x];
    }
    return a;
};

var spawnCreep = function(role, options) {
    // {room | roomInd} [, front]
    var room;
    if (options.room) {
        room = options.room;
    }
    else if (options.roomInd <= 0) {
        room = Memory.myRooms[options.roomInd];
    }
    else {
        console.log('Room not specified');
    }

    var phase = Memory.rooms[room].phase;

    var mem = {role:role, phase:phase, qstate:'', qindex:0, home:room};
    if (options.mem) {
        mem = merge(mem, options.mem);
    }
    
    if (!options.front) {
        Memory.rooms[room][phase].spawnq.push(mem);
    }
    else {
        Memory.rooms[room][phase].spawnq.unshift(mem);
    }
};

var getAllOfRole = function(role, room) {
    var out = [];
    for (var n in Game.creeps) {
        if (Memory.creeps[n].role == role && (!room || Game.creeps[n].room.name == room))
            out.push(n);
    }
    console.log(out.length + ' ' + role + ' creeps found:');
    console.log(out.join(', '));
};

module.exports = {
    spawnCreep: spawnCreep,
    getAllOfRole: getAllOfRole,
};