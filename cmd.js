var cmd = {
    spawn: function(args) {
        if (!args.role || !args.room) {
            console.log('Must provide a role and a room.');
        }
        else {
            var roomMem = Memory.rooms[args.room];
            var roomPhs = roomMem.phase;
            var cmem = {role:args.role, qstate:'', qindex:0, phase:roomPhs, home: args.room};
            if (args.mem) {
                for (var k in args.mem) {
                    cmem[k] = args.mem[k];
                }
            }
            if (args.front) {
                roomMem[roomPhs].spawnq.unshift(cmem);
                console.log('Creep is next in the spawn queue.');
            }
            else {
                roomMem[roomPhs].spawnq.push(cmem);
                console.log('Creep is last in the spawn queue.');
            }
        }
    },
    getCreeps: function(args) {
        if (!args.role) {
            console.log('Must provide a role.');
        }
        else {
            var cout = [];
            for (var n in Game.creeps) {
                if (Game.creeps[n].role == args.role && (!args.role || (args.role && Game.creeps[n].home == args.room))) {
                    cout.push(Game.creeps[n]);
                }
            }
            if (!cout.length) {
                console.log('No creeps found');
            }
            else {
                console.log(cout.length + ' creeps found:');
                for (var i = 0; i < cout.length; i++) {
                    console.log(cout[i].name + ' at location ' + cout[i].pos + ' (' + cout[i].memory.home + ')');
                }
            }
        }
    }
};