var shuffle = function(arr) {
    var i = 0, j = 0, temp = null;
    for (i = arr.length-1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
};

phases = {
    emergency: function() {
        // yup
    },
    phase1: function(r) {
        // energy containers not built yet
        var room = Game.rooms[r];
        if (!room.memory.phase1setup) {
            room.memory.phase1 = {
                spawnq:[],
                spawn: '',
                spawnLevel: 0,
                energyQ: [],
                energyInfo: []
            };
            if (r == 'E58S8') {
                room.memory.phase1.spawn = 'S1';
                room.memory.phase1.spawnq = shuffle([
                    // 2 builders
                    {role:'builder', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    {role:'builder', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    // 2 maintainers
                    {role:'maintainer', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    {role:'maintainer', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    // 2 movers
                    {role:'mover', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    {role:'mover', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    // 1 paver
                    {role:'paver', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    // 2 spawners
                    {role:'spawner', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    {role:'spawner', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    // 3 towerFillers
                    {role:'towerFiller', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    {role:'towerFiller', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    {role:'towerFiller', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    // 3 upgraders
                    {role:'upgrader', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    {role:'upgrader', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    {role:'upgrader', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    // 2 wallMaintainers
                    {role:'wallMaintainer', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    {role:'wallMaintainer', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    // 1 healer
                    {role:'healer', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    // 2 defenders
                    {role:'defender', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                    {role:'defender', phase:'phase1', qstate:'', qindex:0, home:'E58S8'},
                ]);
                room.memory.phase1.energyQ = [[],[]];
                room.memory.phase1.energyInfo = [
                    {harvesting:0, canharvest:1, waitingpos:{x:12, y:12}, qdirection:{x:-1, y:-1}, targetid:'579faa720700be0674d30ffd'},
                    {harvesting:0, canharvest:3, waitingpos:{x:23, y:14}, qdirection:{x:1, y:0}, targetid:'579faa720700be0674d30ffe'}
                ]
            }
            else if (r == 'E58S7') {
                room.memory.phase2.spawn = 'S2';
                room.memory.phase2.spawnq = [
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:14, y:22}, dumpid:'57e5c6ea1edb65e960465b5d', sourceid:'579faa720700be0674d30ffa', home:'E58S7', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:15, y:22}, dumpid:'57e5c6ea1edb65e960465b5d', sourceid:'579faa720700be0674d30ffa', home:'E58S7', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:43, y:24}, dumpid:'57e4e774ca8a16370cb176fb', sourceid:'579faa720700be0674d30ffb', home:'E58S7', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:43, y:23}, dumpid:'57e4e774ca8a16370cb176fb', sourceid:'579faa720700be0674d30ffb', home:'E58S7', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:44, y:23}, dumpid:'57e4e774ca8a16370cb176fb', sourceid:'579faa720700be0674d30ffb', home:'E58S7', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:45, y:23}, dumpid:'57e4e774ca8a16370cb176fb', sourceid:'579faa720700be0674d30ffb', home:'E58S7', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:45, y:24}, dumpid:'57e4e774ca8a16370cb176fb', sourceid:'579faa720700be0674d30ffb', home:'E58S7', qstate:'', qindex:0},
                ].concat(shuffle([
                    // 2 builders
                    {role:'builder', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'builder', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 2 maintainers
                    {role:'maintainer', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'maintainer', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 2 movers
                    {role:'mover', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'mover', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 1 paver
                    {role:'paver', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 2 spawners
                    {role:'spawner', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'spawner', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 3 towerFillers
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 3 upgraders
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 2 wallMaintainers
                    {role:'wallMaintainer', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'wallMaintainer', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 1 healer
                    {role:'healer', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 2 defenders
                    {role:'defender', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'defender', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                ]));
                room.memory.phase1.energyQ = [[],[]];
                room.memory.phase1.energyInfo = [
                    {harvesting:0, canharvest:1, waitingpos:{x:17, y:27}, qdirection:{x:-1, y:0}, targetid:'579faa720700be0674d30ffa'},
                    {harvesting:0, canharvest:1, waitingpos:{x:42, y:23}, qdirection:{x:-1, y:0}, targetid:'579faa720700be0674d30ffb'}
                ]
            }
            room.memory.phase1setup = true;
        }
    },
    phase2: function(r) {
        // start energy mining
        var room = Game.rooms[r];
        if (!room.memory.phase2setup) {
            room.memory.phase2 = {
                spawnq:[],
                spawn: '',
                spawnLevel: 0,
                energyQ: [],
                energyInfo: []
            };
            if (r == 'E58S8') {
                room.memory.phase2.spawn = 'S1';
                room.memory.phase2.spawnq = [
                    // 4 energy miners
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:13, y:12}, dumpid:'57ec9bb22254d2bc03bb4f64', sourceid:'579faa720700be0674d30ffd', home:'E58S8', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:22, y:15}, dumpid:'57ec7ee0586fc26c0efd75fa', sourceid:'579faa720700be0674d30ffe', home:'E58S8', qstate:'', qindex:0},
                    // 2 spawners
                    {role:'spawner', phase:'phase2', qstate:'', qindex:0, home:'E58S8'},
                    {role:'spawner', phase:'phase2', qstate:'', qindex:0, home:'E58S8'},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:22, y:16}, dumpid:'57ec7ee0586fc26c0efd75fa', sourceid:'579faa720700be0674d30ffe', home:'E58S8', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:22, y:17}, dumpid:'57ec7ee0586fc26c0efd75fa', sourceid:'579faa720700be0674d30ffe', home:'E58S8', qstate:'', qindex:0}].concat(shuffle([
                    // 2 builders
                    {role:'builder', phase:'phase2', qstate:'', qindex:0, home:'E58S8'},
                    {role:'builder', phase:'phase2', qstate:'', qindex:0, home:'E58S8'},
                    // 2 maintainers
                    {role:'maintainer', phase:'phase2', qstate:'', qindex:0, home:'E58S8'},
                    {role:'maintainer', phase:'phase2', qstate:'', qindex:0, home:'E58S8'},
                    // 2 movers
                    {role:'mover', phase:'phase2', qstate:'', qindex:0, home:'E58S8'},
                    // 1 paver
                    {role:'paver', phase:'phase2', qstate:'', qindex:0, home:'E58S8'},
                    // 3 towerFillers
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'E58S8'},
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'E58S8'},
                    // 3 upgraders
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E58S8'},
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E58S8'},
                    // 2 wallMaintainers
                    {role:'wallMaintainer', phase:'phase2', qstate:'', qindex:0, home:'E58S8'},
                    // 1 healer
                    {role:'healer', phase:'phase2', qstate:'', qindex:0, home:'E58S8'},
                    // 2 defenders
                    {role:'defender', phase:'phase2', qstate:'', qindex:0, home:'E58S8'},
                    {role:'defender', phase:'phase2', qstate:'', qindex:0, home:'E58S8'},
                ]));
                room.memory.phase2.energyQ = [[],[]];
                room.memory.phase2.energyInfo = [
                    {harvesting:0, canharvest:1, waitingpos:{x:23, y:14}, qdirection:{x:1, y:0}, targetid:'57ec7ee0586fc26c0efd75fa'},
                    {harvesting:0, canharvest:1, waitingpos:{x:12, y:12}, qdirection:{x:-1, y:-1}, targetid:'57ec9bb22254d2bc03bb4f64'},
                ]
            }
            else if (r == 'E58S7') {
                room.memory.phase2.spawn = 'S2';
                room.memory.phase2.spawnq = [
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:14, y:22}, dumpid:'57e5c6ea1edb65e960465b5d', sourceid:'579faa720700be0674d30ffa', home:'E58S7', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:15, y:22}, dumpid:'57e5c6ea1edb65e960465b5d', sourceid:'579faa720700be0674d30ffa', home:'E58S7', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:43, y:24}, dumpid:'57e4e774ca8a16370cb176fb', sourceid:'579faa720700be0674d30ffb', home:'E58S7', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:43, y:23}, dumpid:'57e4e774ca8a16370cb176fb', sourceid:'579faa720700be0674d30ffb', home:'E58S7', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:44, y:23}, dumpid:'57e4e774ca8a16370cb176fb', sourceid:'579faa720700be0674d30ffb', home:'E58S7', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:45, y:23}, dumpid:'57e4e774ca8a16370cb176fb', sourceid:'579faa720700be0674d30ffb', home:'E58S7', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:45, y:24}, dumpid:'57e4e774ca8a16370cb176fb', sourceid:'579faa720700be0674d30ffb', home:'E58S7', qstate:'', qindex:0},
                ].concat(shuffle([
                    // 2 builders
                    {role:'builder', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'builder', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 2 maintainers
                    {role:'maintainer', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'maintainer', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 2 movers
                    {role:'mover', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'mover', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 1 paver
                    {role:'paver', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 2 spawners
                    {role:'spawner', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'spawner', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 3 towerFillers
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 3 upgraders
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 2 wallMaintainers
                    {role:'wallMaintainer', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'wallMaintainer', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 1 healer
                    {role:'healer', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    // 2 defenders
                    {role:'defender', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                    {role:'defender', phase:'phase2', qstate:'', qindex:0, home:'E58S7'},
                ]));
                room.memory.phase2.energyQ = [[],[]];
                room.memory.phase2.energyInfo = [
                    {harvesting:0, canharvest:1, waitingpos:{x:17, y:27}, qdirection:{x:-1, y:0}, targetid:'579faa720700be0674d30ffa'},
                    {harvesting:0, canharvest:1, waitingpos:{x:42, y:23}, qdirection:{x:-1, y:0}, targetid:'579faa720700be0674d30ffb'}
                ]
            }
            room.memory.phase2setup = true;
        }
    },
    phase3: function(r) {
        //
    },
};

module.exports = phases;