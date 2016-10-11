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

var phases = {
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
            if (r == 'E63N59') {
                room.memory.phase1.spawn = 'S1';
                room.memory.phase1.spawnq = [
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:7, y:28}, dumpid:'57fc44dbff2414b02896117a', sourceid:'57ef9e7f86f108ae6e60f627', home:'E63N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:18, y:28}, dumpid:'57fc4638584fe4dd1b87e66f', sourceid:'57ef9e7f86f108ae6e60f628', home:'E63N59', qstate:'', qindex:0},
                    {role:'spawner', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    {role:'spawner', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    {role:'upgrader', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:8, y:28}, dumpid:'57fc44dbff2414b02896117a', sourceid:'57ef9e7f86f108ae6e60f627', home:'E63N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:19, y:28}, dumpid:'57fc4638584fe4dd1b87e66f', sourceid:'57ef9e7f86f108ae6e60f628', home:'E63N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:9, y:28}, dumpid:'57fc44dbff2414b02896117a', sourceid:'57ef9e7f86f108ae6e60f627', home:'E63N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:19, y:27}, dumpid:'57fc4638584fe4dd1b87e66f', sourceid:'57ef9e7f86f108ae6e60f628', home:'E63N59', qstate:'', qindex:0},
                ].concat(shuffle([
                    // 2 builders
                    {role:'builder', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    {role:'builder', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    // 2 maintainers
                    {role:'maintainer', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    {role:'maintainer', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    // 2 movers
                    {role:'mover', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    {role:'mover', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    // 1 paver
                    {role:'paver', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    // 3 towerFillers
                    {role:'towerFiller', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    {role:'towerFiller', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    {role:'towerFiller', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    // 3 upgraders
                    {role:'upgrader', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    {role:'upgrader', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    // 2 wallMaintainers
                    {role:'wallMaintainer', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    {role:'wallMaintainer', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    // 1 healer
                    {role:'healer', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    // 2 defenders
                    {role:'defender', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    {role:'defender', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                ]));
                room.memory.phase1.energyQ = [[],[]];
                room.memory.phase1.energyInfo = [
                    {harvesting:0, canharvest:4, waitingpos:{x:17, y:30}, qdirection:{x:0, y:1}, targetid:'57ef9e7f86f108ae6e60f628'},
                    {harvesting:0, canharvest:2, waitingpos:{x:7, y:30}, qdirection:{x:0, y:1}, targetid:'57ef9e7f86f108ae6e60f627'}
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
            if (r == 'E63N59') {
                room.memory.phase2.spawn = 'S1';
                room.memory.phase2.spawnq = [
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:7, y:28}, dumpid:'57fc44dbff2414b02896117a', sourceid:'57ef9e7f86f108ae6e60f627', home:'E63N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:18, y:28}, dumpid:'', sourceid:'57ef9e7f86f108ae6e60f628', home:'E63N59', qstate:'', qindex:0},
                    {role:'spawner', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    {role:'spawner', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:8, y:28}, dumpid:'57fc44dbff2414b02896117a', sourceid:'57ef9e7f86f108ae6e60f627', home:'E63N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:19, y:28}, dumpid:'', sourceid:'57ef9e7f86f108ae6e60f628', home:'E63N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:9, y:28}, dumpid:'57fc44dbff2414b02896117a', sourceid:'57ef9e7f86f108ae6e60f627', home:'E63N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:19, y:27}, dumpid:'', sourceid:'57ef9e7f86f108ae6e60f628', home:'E63N59', qstate:'', qindex:0},
                ].concat(shuffle([
                    // 2 builders
                    {role:'builder', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    {role:'builder', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    // 2 maintainers
                    {role:'maintainer', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    {role:'maintainer', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    // 2 movers
                    {role:'mover', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    {role:'mover', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    // 1 paver
                    {role:'paver', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    // 3 towerFillers
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    // 3 upgraders
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    // 2 wallMaintainers
                    {role:'wallMaintainer', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    {role:'wallMaintainer', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    // 1 healer
                    {role:'healer', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    // 2 defenders
                    {role:'defender', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    {role:'defender', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    // 1 scruffy
                    {role:'scruffy', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                ]));
                room.memory.phase2.energyQ = [[],[]];
                room.memory.phase2.energyInfo = [
                    {harvesting:0, canharvest:4, waitingpos:{x:17, y:30}, qdirection:{x:0, y:1}, targetid:'57fc4f263435b4585718b158'},
                    {harvesting:0, canharvest:2, waitingpos:{x:7, y:30}, qdirection:{x:0, y:1}, targetid:'57fc44dbff2414b02896117a'}
                ]
            }
            room.memory.phase2setup = true;
        }
    },
};
