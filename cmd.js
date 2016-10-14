var cmd = {
    spawn: function(args) {
        if (!args.role || !args.room) {
            console.log('Must provide a role and a room.');
        }
        else {
            var roomMem = Memory.rooms[args.room];
            var roomPhs = rooms[args.room].phase;
            var cmem = {role:args.role, qstate:'', qindex:0, phase:roomPhs, home: args.room};
            for (var k in args) {
                if (['role', 'room', 'front'].indexOf(k) == -1) {
                    cmem[k] = args[k];
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
                if (Game.creeps[n].memory.role == args.role) {
                    if (args.room && Game.creeps[n].memory.home == args.room) {
                        cout.push(Game.creeps[n]);
                    }
                    else if (!args.room) {
                        cout.push(Game.creeps[n]);
                    }
                }
            }
            if (!cout.length) {
                console.log('No creeps found');
            }
            else {
                console.log(cout.length + ' creeps found:');
                for (var i = 0; i < cout.length; i++) {
                    console.log(cout[i].name + ' at location ' + cout[i].pos);
                }
            }
        }
    },
    stepSpawnLevel: function(args) {
        if (!args.room) {
            console.log('Requires room');
        }
        else {
            var i = 1
            if (args.reverse) {
                i = -1
            }
            var n = Memory.rooms[args.room][rooms[args.room].phase].spawnLevel += i;
            console.log(args.room + ' spawn level set to ' + n);
        }
    },
    dontSpawn: function(args) {
        if (!args.name) {
            console.log('Requires name');
            return
        }
        if (!Game.creeps[args.name]) {
            console.log('Creep not found');
            return
        }
        Memory.creeps[args.name].dontSpawn = true;
    },
};
// END cmd.js
