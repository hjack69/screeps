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
                energyQ: []
            };
            if (r == 'E63N59') {
                room.memory.phase1.spawn = 'S1';
                room.memory.phase1.spawnq = [
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:7, y:28}, dumpid:'', sourceid:'57ef9e7f86f108ae6e60f627', home:'E63N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:18, y:28}, dumpid:'', sourceid:'57ef9e7f86f108ae6e60f628', home:'E63N59', qstate:'', qindex:0},
                    {role:'spawner', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    {role:'spawner', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    {role:'upgrader', phase:'phase1', qstate:'', qindex:0, home:'E63N59'},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:8, y:28}, dumpid:'', sourceid:'57ef9e7f86f108ae6e60f627', home:'E63N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:19, y:28}, dumpid:'', sourceid:'57ef9e7f86f108ae6e60f628', home:'E63N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:9, y:28}, dumpid:'', sourceid:'57ef9e7f86f108ae6e60f627', home:'E63N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:19, y:27}, dumpid:'', sourceid:'57ef9e7f86f108ae6e60f628', home:'E63N59', qstate:'', qindex:0},
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
            }
            else if (r == 'E61N58') {
                room.memory.phase1.spawn = 'S2';
                room.memory.phase1.spawnq = [
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:44, y:40}, dumpid:'', sourceid:'57ef9e5786f108ae6e60f29a', home:'E61N58', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:9, y:42}, dumpid:'', sourceid:'57ef9e5786f108ae6e60f29b', home:'E61N58', qstate:'', qindex:0},
                    {role:'spawner', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    {role:'spawner', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    {role:'upgrader', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:44, y:41}, dumpid:'', sourceid:'57ef9e5786f108ae6e60f29a', home:'E61N58', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:45, y:41}, dumpid:'', sourceid:'57ef9e5786f108ae6e60f29a', home:'E61N58', qstate:'', qindex:0},
                ].concat(shuffle([
                    // 2 builders
                    {role:'builder', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    {role:'builder', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    // 2 maintainers
                    {role:'maintainer', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    {role:'maintainer', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    // 2 movers
                    {role:'mover', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    {role:'mover', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    // 1 paver
                    {role:'paver', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    // 3 towerFillers
                    {role:'towerFiller', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    {role:'towerFiller', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    {role:'towerFiller', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    // 3 upgraders
                    {role:'upgrader', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    {role:'upgrader', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    // 2 wallMaintainers
                    {role:'wallMaintainer', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    {role:'wallMaintainer', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    // 1 healer
                    {role:'healer', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    // 2 defenders
                    {role:'defender', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                    {role:'defender', phase:'phase1', qstate:'', qindex:0, home:'E61N58'},
                ]));
                room.memory.phase1.energyQ = [[],[]];
            }
            else if (r == 'E64N58') {
                room.memory.phase1.spawn = 'S3';
                room.memory.phase1.spawnq = [
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:32, y:44}, dumpid:'', sourceid:'57ef9e9386f108ae6e60f809', home:'E64N58', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:29, y:27}, dumpid:'', sourceid:'57ef9e9386f108ae6e60f807', home:'E64N58', qstate:'', qindex:0},
                    {role:'spawner', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    {role:'spawner', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    {role:'upgrader', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:32, y:45}, dumpid:'', sourceid:'57ef9e9386f108ae6e60f809', home:'E64N58', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase1', action:'harvesting', spot:{x:30, y:46}, dumpid:'', sourceid:'57ef9e9386f108ae6e60f809', home:'E64N58', qstate:'', qindex:0},
                ].concat(shuffle([
                    // 2 builders
                    {role:'builder', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    {role:'builder', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    // 2 maintainers
                    {role:'maintainer', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    {role:'maintainer', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    // 2 movers
                    {role:'mover', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    {role:'mover', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    // 1 paver
                    {role:'paver', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    // 3 towerFillers
                    {role:'towerFiller', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    {role:'towerFiller', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    {role:'towerFiller', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    // 3 upgraders
                    {role:'upgrader', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    {role:'upgrader', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    // 2 wallMaintainers
                    {role:'wallMaintainer', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    {role:'wallMaintainer', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    // 1 healer
                    {role:'healer', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    // 2 defenders
                    {role:'defender', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                    {role:'defender', phase:'phase1', qstate:'', qindex:0, home:'E64N58'},
                ]));
                room.memory.phase1.energyQ = [[],[]];
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
                energyQ: []
            };
            if (r == 'E63N59') {
                room.memory.phase2.spawn = 'S1';
                room.memory.phase2.spawnq = [
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:7, y:28}, dumpid:'57fc44dbff2414b02896117a', sourceid:'57ef9e7f86f108ae6e60f627', home:'E63N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:18, y:28}, dumpid:'57fc4638584fe4dd1b87e66f', sourceid:'57ef9e7f86f108ae6e60f628', home:'E63N59', qstate:'', qindex:0},
                    {role:'spawner', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    {role:'spawner', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E63N59'},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:8, y:28}, dumpid:'57fc44dbff2414b02896117a', sourceid:'57ef9e7f86f108ae6e60f627', home:'E63N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:19, y:28}, dumpid:'57fc4638584fe4dd1b87e66f', sourceid:'57ef9e7f86f108ae6e60f628', home:'E63N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:9, y:28}, dumpid:'57fc44dbff2414b02896117a', sourceid:'57ef9e7f86f108ae6e60f627', home:'E63N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:19, y:27}, dumpid:'57fc4638584fe4dd1b87e66f', sourceid:'57ef9e7f86f108ae6e60f628', home:'E63N59', qstate:'', qindex:0},
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
            }
            else if (r == 'E61N58') {
                room.memory.phase2.spawn = 'S2';
                room.memory.phase2.spawnq = [
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:44, y:40}, dumpid:'580058b305abae6472c32192', sourceid:'57ef9e5786f108ae6e60f29a', home:'E61N58', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:9, y:42}, dumpid:'58004617225d0f856c6cc10d', sourceid:'57ef9e5786f108ae6e60f29b', home:'E61N58', qstate:'', qindex:0},
                    {role:'spawner', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    {role:'spawner', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:44, y:41}, dumpid:'580058b305abae6472c32192', sourceid:'57ef9e5786f108ae6e60f29a', home:'E61N58', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:45, y:41}, dumpid:'580058b305abae6472c32192', sourceid:'57ef9e5786f108ae6e60f29a', home:'E61N58', qstate:'', qindex:0},
                ].concat(shuffle([
                    // 2 builders
                    {role:'builder', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    {role:'builder', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    // 2 maintainers
                    {role:'maintainer', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    {role:'maintainer', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    // 2 movers
                    {role:'mover', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    {role:'mover', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    // 1 paver
                    {role:'paver', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    // 3 towerFillers
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    // 3 upgraders
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    // 2 wallMaintainers
                    {role:'wallMaintainer', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    {role:'wallMaintainer', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    // 1 healer
                    {role:'healer', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    // 2 defenders
                    {role:'defender', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                    {role:'defender', phase:'phase2', qstate:'', qindex:0, home:'E61N58'},
                ]));
                room.memory.phase2.energyQ = [[],[]];
            }
            else if (r == 'E64N58') {
                room.memory.phase2.spawn = 'S3';
                room.memory.phase2.spawnq = [
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:32, y:44}, dumpid:'5800fa18fb6b6b8d7c5cdcda', sourceid:'57ef9e9386f108ae6e60f809', home:'E64N58', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:29, y:27}, dumpid:'5800c56aa01b5451543e4347', sourceid:'57ef9e9386f108ae6e60f807', home:'E64N58', qstate:'', qindex:0},
                    {role:'spawner', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    {role:'spawner', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:32, y:45}, dumpid:'5800fa18fb6b6b8d7c5cdcda', sourceid:'57ef9e9386f108ae6e60f809', home:'E64N58', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase2', action:'harvesting', spot:{x:30, y:46}, dumpid:'5800fa18fb6b6b8d7c5cdcda', sourceid:'57ef9e9386f108ae6e60f809', home:'E64N58', qstate:'', qindex:0},
                ].concat(shuffle([
                    // 2 builders
                    {role:'builder', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    {role:'builder', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    // 2 maintainers
                    {role:'maintainer', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    {role:'maintainer', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    // 2 movers
                    {role:'mover', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    {role:'mover', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    // 1 paver
                    {role:'paver', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    // 3 towerFillers
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    {role:'towerFiller', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    // 3 upgraders
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    {role:'upgrader', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    // 2 wallMaintainers
                    {role:'wallMaintainer', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    {role:'wallMaintainer', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    // 1 healer
                    {role:'healer', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    // 2 defenders
                    {role:'defender', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                    {role:'defender', phase:'phase2', qstate:'', qindex:0, home:'E64N58'},
                ]));
                room.memory.phase2.energyQ = [[],[]];
            }
            room.memory.phase2setup = true;
        }
    },
    phase3: function(r) {
        // energy containers not built yet
        var room = Game.rooms[r];
        if (!room.memory.phase3setup) {
            room.memory.phase3 = {
                spawnq:[],
                spawn: '',
                spawnLevel: 0,
                energyQ: []
            };
            if (r == 'E63N59') {
                room.memory.phase3.spawnq = [
                    {role:'energyMiner', phase:'phase3', action:'harvesting', spot:{x:7, y:28}, dumpid:'57fc44dbff2414b02896117a', sourceid:'57ef9e7f86f108ae6e60f627', home:'E63N59', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase3', action:'harvesting', spot:{x:18, y:28}, dumpid:'57fc4638584fe4dd1b87e66f', sourceid:'57ef9e7f86f108ae6e60f628', home:'E63N59', qstate:'', qindex:0},
                    {role:'spawner', phase:'phase3', qstate:'', qindex:0, home:'E63N59'},
                    {role:'upgrader', phase:'phase3', qstate:'', qindex:0, home:'E63N59'},
                ].concat(shuffle([
                    {role:'builder', phase:'phase3', qstate:'', qindex:0, home:'E63N59'},
                    {role:'maintainer', phase:'phase3', qstate:'', qindex:0, home:'E63N59'},
                    {role:'mover', phase:'phase3', qstate:'', qindex:0, home:'E63N59'},
                    {role:'paver', phase:'phase3', qstate:'', qindex:0, home:'E63N59'},
                    {role:'towerFiller', phase:'phase3', qstate:'', qindex:0, home:'E63N59'},
                    {role:'upgrader', phase:'phase3', qstate:'', qindex:0, home:'E63N59'},
                    {role:'wallMaintainer', phase:'phase3', qstate:'', qindex:0, home:'E63N59'},
                    {role:'healer', phase:'phase3', qstate:'', qindex:0, home:'E63N59'},
                    {role:'defender', phase:'phase3', qstate:'', qindex:0, home:'E63N59'},
                    {role:'defender', phase:'phase3', qstate:'', qindex:0, home:'E63N59'},
                    {role:'scruffy', phase:'phase3', qstate:'', qindex:0, home:'E63N59'},
                ]));
                room.memory.phase3.energyQ = [[],[]];
            }
            else if (r == 'E61N58') {
                room.memory.phase3.spawnq = [
                    {role:'energyMiner', phase:'phase3', action:'harvesting', spot:{x:44, y:40}, dumpid:'580058b305abae6472c32192', sourceid:'57ef9e5786f108ae6e60f29a', home:'E61N58', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase3', action:'harvesting', spot:{x:9, y:42}, dumpid:'58004617225d0f856c6cc10d', sourceid:'57ef9e5786f108ae6e60f29b', home:'E61N58', qstate:'', qindex:0},
                    {role:'spawner', phase:'phase3', qstate:'', qindex:0, home:'E61N58'},
                    {role:'upgrader', phase:'phase3', qstate:'', qindex:0, home:'E61N58'},
                ].concat(shuffle([
                    {role:'builder', phase:'phase3', qstate:'', qindex:0, home:'E61N58'},
                    {role:'maintainer', phase:'phase3', qstate:'', qindex:0, home:'E61N58'},
                    {role:'mover', phase:'phase3', qstate:'', qindex:0, home:'E61N58'},
                    {role:'paver', phase:'phase3', qstate:'', qindex:0, home:'E61N58'},
                    {role:'towerFiller', phase:'phase3', qstate:'', qindex:0, home:'E61N58'},
                    {role:'upgrader', phase:'phase3', qstate:'', qindex:0, home:'E61N58'},
                    {role:'wallMaintainer', phase:'phase3', qstate:'', qindex:0, home:'E61N58'},
                    {role:'healer', phase:'phase3', qstate:'', qindex:0, home:'E61N58'},
                    {role:'defender', phase:'phase3', qstate:'', qindex:0, home:'E61N58'},
                    {role:'defender', phase:'phase3', qstate:'', qindex:0, home:'E61N58'},
                    {role:'scruffy', phase:'phase3', qstate:'', qindex:0, home:'E61N58'},
                ]));
                room.memory.phase3.energyQ = [[],[]];
                room.memory.phase3.spawnLevel = 4;
            }
            else if (r == 'E64N58') {
                room.memory.phase3.spawnq = [
                    {role:'energyMiner', phase:'phase3', action:'harvesting', spot:{x:32, y:44}, dumpid:'5800fa18fb6b6b8d7c5cdcda', sourceid:'57ef9e9386f108ae6e60f809', home:'E64N58', qstate:'', qindex:0},
                    {role:'energyMiner', phase:'phase3', action:'harvesting', spot:{x:29, y:27}, dumpid:'5800c56aa01b5451543e4347', sourceid:'57ef9e9386f108ae6e60f807', home:'E64N58', qstate:'', qindex:0},
                    {role:'spawner', phase:'phase3', qstate:'', qindex:0, home:'E64N58'},
                    {role:'upgrader', phase:'phase3', qstate:'', qindex:0, home:'E64N58'},
                ].concat(shuffle([
                    {role:'builder', phase:'phase3', qstate:'', qindex:0, home:'E64N58'},
                    {role:'maintainer', phase:'phase3', qstate:'', qindex:0, home:'E64N58'},
                    {role:'mover', phase:'phase3', qstate:'', qindex:0, home:'E64N58'},
                    {role:'paver', phase:'phase3', qstate:'', qindex:0, home:'E64N58'},
                    {role:'towerFiller', phase:'phase3', qstate:'', qindex:0, home:'E64N58'},
                    {role:'upgrader', phase:'phase3', qstate:'', qindex:0, home:'E64N58'},
                    {role:'wallMaintainer', phase:'phase3', qstate:'', qindex:0, home:'E64N58'},
                    {role:'healer', phase:'phase3', qstate:'', qindex:0, home:'E64N58'},
                    {role:'defender', phase:'phase3', qstate:'', qindex:0, home:'E64N58'},
                    {role:'defender', phase:'phase3', qstate:'', qindex:0, home:'E64N58'},
                    {role:'scruffy', phase:'phase3', qstate:'', qindex:0, home:'E64N58'},
                ]));
                room.memory.phase3.energyQ = [[],[]];
                room.memory.phase3.spawnLevel = 4;
            }
            room.memory.phase3setup = true;
        }
    },
};

// END phases.js
