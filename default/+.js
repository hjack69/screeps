var bodies = require('bodies.js');

var merge = function(a, b) {
    for (var x in b) {
        a[x] = b[x];
    }
    return a;
};

var spawnCreep = function(role, options) {
    // (room | roomInd) [, name, mem, body]
    if (!options.room || !options.roomInd) {
        console.log('Room not specified');
    }
    else {
        var room, phase, body;

        if (options.room)
            room = options.room;
        else
            room = Memory.myRooms[options.roomInd];

        phase = Memory.rooms[room].phase;

        body = bodies[Memory.rooms[room][phase].spawnLevel][role];
        if (options.body)
            body = options.body;

        var mem = {role:role, phase:phase, qstate:'', qindex:0, home:room};
        if (options.mem)
            mem = merge(mem, options.mem);

        var spawn = Game.spawns[Game.rooms[room][phase].spawn];

        if (!room || !phase || !mem || !spawn || !body)
            console.log('Spawning Failed');
        var err = spawn.createCreep(body, options.name ? options.name : undefined, mem);
    }
};

var getAllOfRole = function(role) {
    var out = [];
    for (var n in Game.creeps) {
        if (Memory.creeps[n].role == role)
            out.push(n);
    }
    console.log(out.length + ' ' + role + ' creeps found:');
    console.log(out.join(', '));
};

module.exports = {
    spawnCreep: spawnCreep,
    getAllOfRole: getAllOfRole,
};