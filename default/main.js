var rE63N59 = {
    spawn: 'S1',
    phase: 'phase2',
    energyInfo: [
        {wpos: {x:17, y:30}, wdir: {x:0, y:1}, sid:'57fc4f263435b4585718b158'},
        {wpos: {x:7, y:30}, wdir: {x:0, y:1}, sid:'57fc44dbff2414b02896117a'},
    ],
};
var rE61N58 = {
    spawn: 'S2',
    phase: 'phase2',
    energyInfo: [
        {wpos: {x:43, y:39}, wdir: {x:-1, y:-1}, sid:'580058b305abae6472c32192'},
        {wpos: {x:6, y:41}, wdir: {x:0, y:-1}, sid:'58004617225d0f856c6cc10d'},
    ]
};
var rE64N58 = {
    spawn: 'S3',
    phase: 'phase2',
    energyInfo: [
        {wpos: {x:32, y:43}, wdir: {x:0, y:-1}, sid:'5800fa18fb6b6b8d7c5cdcda'},
        {wpos: {x:30, y:28}, wdir: {x:1, y:1}, sid:'5800c56aa01b5451543e4347'},
    ]
};

var rooms = {
    E63N59: rE63N59,
    E61N58: rE61N58,
    E64N58: rE64N58,
};

var room_targ = 'E61N57';
var army_stage = new RoomPosition(26, 42, 'E63N59');
var army_deploy = true;

var ign = ['57fc44dbff2414b02896117a', '57fc4f263435b4585718b158', '58004617225d0f856c6cc10d', '5800fa18fb6b6b8d7c5cdcda', '580514436c47dea9463e6a01'];

var partOrder = function(a, b) {
    if (a == TOUGH) return -1;
    return 0;
};

var sumParts = function(body) {
    var out = 0;
    for (var i in body) out += BODYPART_COST[body[i]];
    return out;
};

var maxBody = function(template, en) {
    tsum = sumParts(template);
    times = Math.floor(en/tsum);
    out_body = [];
    for (var i=0; i < times; i++) out_body = out_body.concat(template);
    if (out_body.length > 50) return out_body.slice(0, 50).sort(partOrder);
    return out_body.sort(partOrder);
};

var maxSpawnEnergy = function(r) {
    var eCap = EXTENSION_ENERGY_CAPACITY[Game.rooms[r].controller.level];
    return (Game.rooms[r].find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_SPAWN}}).length*SPAWN_ENERGY_CAPACITY + Game.rooms[r].find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_EXTENSION}}).length*eCap);
};


// CONCAT phases.js
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



// CONCAT bodies.js
var bodies = [
    // 0
    {
        harvester: [WORK, CARRY, CARRY, MOVE, MOVE],
        upgrader: [WORK, CARRY, CARRY, MOVE, MOVE],
        builder: [WORK, CARRY, CARRY, MOVE, MOVE],
        paver: [WORK, CARRY, CARRY, MOVE, MOVE],
        maintainer: [WORK, CARRY, CARRY, MOVE, MOVE],
        wallMaintainer: [WORK, CARRY, CARRY, MOVE, MOVE],
        mover: [WORK, CARRY, CARRY, MOVE, MOVE],
        towerFiller: [WORK, CARRY, CARRY, MOVE, MOVE],
        spawner: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
        energyMiner: [WORK, WORK, CARRY, MOVE],
        defender: [ATTACK, ATTACK, MOVE, MOVE],
        healer: [HEAL, MOVE],
        hoarder: [WORK, CARRY, CARRY, MOVE, MOVE],
        claimer: [WORK, CARRY, CARRY, MOVE, MOVE],
        scruffy: [WORK, CARRY, CARRY, MOVE, MOVE],
        resourceMiner: [WORK, WORK, CARRY, MOVE],
        hunter: [TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE],
    },
    // 1
    {
        harvester: [WORK, CARRY, CARRY, MOVE, MOVE],
        upgrader: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        builder: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        paver: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        maintainer: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        wallMaintainer: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        mover: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
        towerFiller: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
        spawner: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
        energyMiner: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        defender: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,MOVE,MOVE,ATTACK,MOVE,MOVE,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,MOVE],
        hunter: [TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,ATTACK,MOVE,MOVE,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK],
        support: [TOUGH, MOVE, TOUGH, MOVE, MOVE, HEAL, MOVE, HEAL],
        healer: [TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,MOVE,HEAL,HEAL],
        hoarder: [WORK, CARRY, CARRY, MOVE, MOVE],
        claimer: [CLAIM, MOVE],
        scruffy: [WORK, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
        drudge: [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE],
        resourceMiner: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        tank: [TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE]
    },
    // 2
    {
        upgrader: [CARRY,WORK,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,MOVE,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE],
        builder: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        paver: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        maintainer: [CARRY,WORK,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,MOVE,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE],
        wallMaintainer: [CARRY,WORK,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,MOVE,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE],
        mover: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
        towerFiller: [MOVE,CARRY,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE],
        spawner: [MOVE,CARRY,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE],
        energyMiner: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        defender: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,MOVE,MOVE,ATTACK,MOVE,MOVE,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,MOVE],
        hunter: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,MOVE,MOVE,ATTACK,MOVE,MOVE,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,MOVE],
        support: [TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,MOVE,HEAL,HEAL],
        healer: [TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,MOVE,HEAL,HEAL],
        hoarder: [WORK, CARRY, MOVE],
        claimer: [CLAIM, MOVE, MOVE],
        scruffy: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        drudge: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        resourceMiner: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        tank: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
    },
    // 3
    {
        upgrader: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],
        builder: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],
        paver: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],
        maintainer: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],
        wallMaintainer: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],
        mover: [CARRY,CARRY,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,MOVE,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE],
        towerFiller: [CARRY,CARRY,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,MOVE,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE],
        spawner: [CARRY,CARRY,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,MOVE,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE],
        energyMiner: [MOVE,WORK,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,CARRY],
        defender: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE,MOVE,ATTACK,MOVE],
        hunter: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE,MOVE,ATTACK,MOVE,ATTACK,MOVE,MOVE,MOVE,ATTACK,MOVE],
        support: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,HEAL,MOVE,MOVE,MOVE,HEAL,MOVE,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL],
        healer: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,HEAL,MOVE,MOVE,MOVE,HEAL,MOVE,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL],
        claimer: [CLAIM,MOVE,CLAIM,MOVE],
        scruffy: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],
        drudge: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],
        resourceMiner: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],
        tank: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
    },
    // 4
    {
        upgrader: [CARRY,WORK,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,MOVE,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE],
        builder: [CARRY,WORK,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,MOVE,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE],
        paver: [CARRY,WORK,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,MOVE,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE],
        maintainer: [CARRY,WORK,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,MOVE,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE],
        wallMaintainer: [CARRY,WORK,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,MOVE,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE],
        mover: [MOVE,CARRY,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE],
        towerFiller: [MOVE,CARRY,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE],
        spawner: [MOVE,CARRY,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE],
        energyMiner: [WORK,WORK,WORK,MOVE,WORK,MOVE,WORK,MOVE,MOVE,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,CARRY],
        defender: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,MOVE,MOVE,ATTACK,MOVE,MOVE,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,MOVE],
        hunter: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,MOVE,MOVE,ATTACK,MOVE,MOVE,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,MOVE],
        support: [TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,MOVE,HEAL,HEAL],
        healer: [TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,MOVE,HEAL,HEAL],
        claimer: [CLAIM,MOVE,CLAIM,MOVE],
        scruffy: [CARRY,WORK,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,MOVE,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE],
        drudge: [CARRY,WORK,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,MOVE,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE],
        resourceMiner: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        tank: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
    },
];

// END bodies.js



// CONCAT role.builder.js
var builder = {
    targets: function() {
        var out = {};
        for (var r in rooms) {
            out[r] = [
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter: (s) => {return s.structureType == STRUCTURE_CONTAINER}}),
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter: (structure) => {return (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART)}}),
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER)}}),
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter: (structure) => {return (structure.structureType != STRUCTURE_ROAD)}}),
                Game.rooms[r].find(FIND_CONSTRUCTION_SITES)
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }

        if (!creep.memory.builder) {
            creep.memory.builder = {};
        }

        if (creep.ticksToLive < 250 && creep.memory.renewQ.state == '') {
            creep.memory.renewQ.state = 'entering';
        }
        else if (creep.carry.energy == 0) {
            creep.memory.energyQ.state = 'entering';
        }
        else {
            var tlist = t.builder[creep.memory.home];
            var target = null;
            for (var i = 0; i < tlist.length; i++) {
                if (tlist[i].length) {
                    target = tlist[i][0];
                    break;
                }
            }
            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                upgrader[creep.memory.phase](creep, t);
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' builder: ' + etime);
    },
    emergency: function(creep) {
        var emergencyRole = require('emergency');
        emergencyRole.emergency(creep);
    }
};
builder.phase3 = builder.phase2 = builder.phase1;
// END role.builder.js


// CONCAT role.claimer.js
var claimer = {
    targets: function() {
        return {
            'E63N59': 'E63N58',
            'E63N58': 'E63N57',
            'E63N57': 'E64N57',
            'E64N57': 'E64N58',
            'E64N58': 'dest'
        };
    },
    phase1: function(creep, t) {
        creep.memory.dontSpawn = true;
        tlist = t.claimer;
        if (tlist[creep.room.name] != 'dest') {
            creep.moveTo(new RoomPosition(25, 25, tlist[creep.room.name]));
        }
        else {
            creep.moveTo(Game.rooms[creep.room.name].controller);
            if (creep.claimController(Game.rooms[creep.room.name].controller) == ERR_GCL_NOT_ENOUGH) {
                creep.reserveController(Game.rooms[creep.room.name].controller);
            }
        }
    }
};
claimer.phase3 = claimer.phase2 = claimer.phase1;

// END role.claimer.js


// CONCAT role.defender.js
var defender = {
    targets: function() {
        var out = {waiting:{
            E63N59: new RoomPosition(22, 43, 'E63N59'),
            E61N58: new RoomPosition(28, 45, 'E61N58'),
            E64N58: new RoomPosition(8, 43, 'E64N58'),
        }};
        for (var r in rooms) {
            out[r] = Game.rooms[r].find(FIND_HOSTILE_CREEPS);
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        var target = creep.pos.findClosestByRange(t.defender[creep.memory.home]);

        if (!creep.memory.defender) creep.memory.defender = {};

        if (target) {
            creep.memory.action = '';
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target.pos);
            }
        }
        else {
            if (creep.ticksToLive < 250 && creep.memory.renewQ.state == '') {
                creep.memory.renewQ.state = 'entering';
            }
            creep.moveTo(t.defender.waiting[creep.memory.home]);
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' defender: ' + etime);
    }
};
defender.phase3 = defender.phase2 = defender.phase1;
defender.emergency = defender.phase1;

// END role.defender.js


// CONCAT role.drudge.js
var drudge = {
    targets: function() {
        var r = room_targ;
        var out = {dest: r, targets: [], sources: []};
        try {
            out.targets = Game.rooms[r].find(FIND_MY_CONSTRUCTION_SITES);//, {filter: (s) => {return s.structureType == STRUCTURE_SPAWN}});
            out.sources = Game.rooms[r].find(FIND_SOURCES);
            out.controller = Game.rooms[r].controller;
        } catch(err) {}
        out.rpath = {
            'E63N59': 'E63N58',
            'E63N58': 'E63N57',
            'E63N57': 'E64N57',
            'E64N57': 'E64N58',
            'E64N58': 'dest'
        };
        return out;
    },
    phase1: function(creep, t) {
        creep.memory.dontSpawn = true;
        var stime = Game.cpu.getUsed();
        var tlist = t.drudge;
        if (tlist.rpath[creep.room.name] != 'dest') {
            creep.moveTo(new RoomPosition(25, 25, tlist.rpath[creep.room.name]));
        }
        else {
            if (!creep.memory.action) {creep.memory.action = 'harvesting';}
            if (creep.carry.energy == 0 && creep.memory.action == 'building') {
                creep.memory.action = 'harvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'harvesting') {
                creep.memory.action = 'building';
            }

            if (creep.memory.action == 'harvesting') {
                var target = creep.pos.findClosestByRange(tlist.sources);
                if (target && creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else if (creep.memory.action == 'building' && creep.memory.flavor == 'builder') {
                var target = tlist.targets[0];
                if (target && creep.build(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else if (creep.memory.action == 'building' && creep.memory.flavor == 'upgrader') {
                var target = tlist.controller;
                if (target && creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {reusePath: 2});
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' drudge: ' + etime);
    }
};
drudge.phase3 = drudge.phase2 = drudge.phase1;

// END role.drudge.js


// CONCAT role.energyMiner.js
var energyMiner = {
    targets: function() {
        return null;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (!creep.memory.action) {
            creep.memory.action = 'harvesting';
        }
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(25, 25, creep.memory.home);
        }
        else {
            var source = Game.getObjectById(creep.memory.sourceid);
            if (creep.pos.x != creep.memory.spot.x || creep.pos.y != creep.memory.spot.y) {
                creep.moveTo(creep.memory.spot.x, creep.memory.spot.y);
            }
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.spot.x, creep.memory.spot.y);
            }
            if (source.energy == 0 && creep.carry.energy > 0) {
                creep.drop(RESOURCE_ENERGY);
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
    },
    phase2: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (!creep.memory.energyMiner) {
            creep.memory.energyMiner = {action:'harvesting'};
        }
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            if (creep.carry.energy == 0 && creep.memory.energyMiner.action == 'dumping') {
                creep.memory.energyMiner.action = 'harvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.energyMiner.action == 'harvesting') {
                creep.memory.energyMiner.action = 'dumping';
            }

            if (creep.memory.energyMiner.action == 'harvesting') {
                var source = Game.getObjectById(creep.memory.sourceid);
                if (creep.pos.x != creep.memory.spot.x || creep.pos.y != creep.memory.spot.y) {
                    creep.moveTo(creep.memory.spot.x, creep.memory.spot.y);
                }
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.memory.spot.x, creep.memory.spot.y);
                }
                if (source.energy == 0) {
                    creep.memory.energyMiner.action = 'dumping';
                }
            }
            else if (creep.memory.energyMiner.action == 'dumping') {
                var dump = Game.getObjectById(creep.memory.dumpid);
                if (dump != null) {
                    if (dump.hits < dump.hitsMax/2) {
                        creep.repair(dump);
                    }
                    else if (_.sum(dump.store) < dump.storeCapacity) {
                        if (creep.transfer(dump, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(dump);
                        }
                    }
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' energyMiner: ' + etime);
    }
};
energyMiner.phase3 = energyMiner.emergency = energyMiner.phase2;

// END role.energyMiner.js


// CONCAT role.healer.js
var healer = {
    targets: function() {
        var out = {waiting:{
            E63N59: new RoomPosition(22, 43, 'E63N59'),
            E61N58: new RoomPosition(28, 45, 'E61N58'),
            E64N58: new RoomPosition(8, 43, 'E64N58'),
        }};
        for (var r in rooms) {
            out[r] = [
                Game.rooms[r].find(FIND_MY_CREEPS, {filter:(c)=>{return c.hits < c.hitsMax/2}}),
                Game.rooms[r].find(FIND_MY_CREEPS, {filter:(c)=>{return c.hits < c.hitsMax}})
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();
        if (!creep.memory.healer) creep.memory.healer = {};
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            var tlist = t.healer[creep.memory.home];
            var target = null;
            for (var i = 0; i < tlist.length; i++) {
                if (tlist[i].length) {
                    target = creep.pos.findClosestByRange(tlist[i]);
                    break;
                }
            }
            if (target) {
                if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target.pos);
                }
            }
            else {
                if (creep.ticksToLive < 250 && creep.memory.energyQ.state == '') {
                    creep.memory.energyQ.state = 'entering';
                }
                creep.moveTo(t.healer.waiting[creep.memory.home]);
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' healer: ' + etime);
    }
};
healer.phase3 = healer.phase2 = healer.phase1;
healer.emergency = healer.phase1;

// END role.healer.js


// CONCAT role.hunter.js
var hunter = {
    targets: function() {
        var r = room_targ;
        var h = new RoomPosition(25, 25, r);
        var ignoreOwners = ['roboboy'];
        var t = [];
        try {
            t = [
                Game.getObjectById('57fd5e10c91257622f6093ab'),
                h.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (s)=> {return s.structureType == STRUCTURE_TOWER && ignoreOwners.indexOf(s.owner.username) == -1}}),
                h.findClosestByRange(FIND_HOSTILE_CREEPS),
                h.findClosestByRange(FIND_HOSTILE_SPAWNS),
                h.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (s) => {return s.structureType != STRUCTURE_CONTROLLER}}),
            ];
        }
        catch(err) {}
        var out = {
            deploy: army_deploy,
            stage: army_stage,
            dest: r,
            target: t
        };
        return out;
    },
    phase1: function(creep, t) {
        creep.memory.dontSpawn = true;
        var tlist = t.hunter;
        if (creep.room.name != tlist.dest) {
            if (tlist.deploy) {
                creep.moveTo(new RoomPosition(25, 25, tlist.dest));
            }
            else {
                creep.moveTo(tlist.stage);
            }
        }
        else {
            if (tlist.target.length) {
                var target;
                for (var i=0; i<tlist.target.length; i++) {
                    if (tlist.target[i]) {
                        target = tlist.target[i];
                        break;
                    }
                }
                if (target) {
                    creep.attack(target)
                    creep.moveTo(target);
                }
                else if (!target) {
                    creep.moveTo(new RoomPosition(25, 25, tlist.dest));
                }
            }
            else {
                creep.moveTo(tlist.stage);
            }
        }
    }
};
hunter.phase3 = hunter.phase2 = hunter.phase1;

// END role.hunter.js


// CONCAT role.maintainer.js
var maintainer = {
    targets: function() {
        var out = {};
        for (var r in rooms) {
            out[r] = [
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return ([STRUCTURE_CONTAINER, STRUCTURE_ROAD, STRUCTURE_TOWER].indexOf(s.structureType) > -1) && s.hits < s.hitsMax/2}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return ([STRUCTURE_CONTAINER, STRUCTURE_ROAD, STRUCTURE_TOWER].indexOf(s.structureType) > -1) && s.hits < s.hitsMax}})
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();

        if (!creep.memory.maintainer) creep.memory.maintainer = {};

        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            if (creep.ticksToLive < 250 && creep.memory.renewQ.state == '') {
                creep.memory.renewQ.state = 'entering';
            }
            else if (creep.carry.energy == 0) {
                creep.memory.energyQ.state = 'entering';
            }
            else {
                var tlist = t.maintainer[creep.memory.home];
                var target = null;
                for (var i = 0; i < tlist.length; i++) {
                    if (tlist[i].length) {
                        target = tlist[i][0];
                        break;
                    }
                }
                if (target) {
                    if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    upgrader[rooms[creep.memory.home].phase](creep, t);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' maintainer: ' + etime);
    },
    emergency: function(creep) {
        var e = require('emergency');
        e.emergency(creep);
    }
};
maintainer.phase3 = maintainer.phase2 = maintainer.phase1;

// END role.maintainer.js


// CONCAT role.mover.js
var mover = {
    targets: function() {
        var ignore = ign;
        var out = {};
        for (var r in rooms) {
            out[r] = [
                Game.rooms[r].find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_LINK && s.energy < s.energyCapacity && ignore.indexOf(s.id) == -1}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) < s.storeCapacity && ignore.indexOf(s.id) == -1}})
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();

        if (!creep.memory.mover) creep.memory.move = {};

        if (creep.room.name != creep.memory.home) {
            creep.moveTo(25, 25, creep.memory.home)
        }
        else {
            if (creep.ticksToLive < 250 && creep.memory.renewQ.state == '') {
                creep.memory.renewQ.state = 'entering';
            }
            else if (creep.carry.energy == 0) {
                creep.memory.energyQ.state = 'entering'
            }
            else {
                var tlist = t.mover[creep.memory.home];
                var target = null;
                for (var i = 0; i < tlist.length; i++) {
                    if (tlist[i].length) {
                        target = tlist[i][0];
                        break;
                    }
                }
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    spawner.phase1(creep, t);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' mover: ' + etime);
    },
    emergency: function(creep, t) {
        var e = require('emergency');
        e.emergency(creep);
    }
};
mover.phase3 = mover.phase2 = mover.phase1;

// END role.mover.js


// CONCAT role.paver.js
var paver = {
    targets: function() {
        var out = {};
        for (var r in rooms) {
            out[r] = Game.rooms[r].find(FIND_CONSTRUCTION_SITES, {filter:(s)=>{return s.structureType == STRUCTURE_ROAD}});
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();

        if (!creep.memory.paver) creep.memory.paver = {};

        if (creep.ticksToLive < 250 && creep.memory.renewQ.state == '') {
            creep.memory.renewQ.state = 'renewing';
        }
        else if (creep.carry.energy == 0) {
            creep.memory.energyQ.state = 'entering';
        }
        else {
            var tlist = t.paver[creep.memory.home];
            var target = tlist[0];
            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                builder[rooms[creep.memory.home].phase](creep, t);
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' paver: ' + etime);
    },
    emergency: function(creep, t) {
        var e = require('emergency');
        e.emergency(creep, t);
    }
};
paver.phase3 = paver.phase2 = paver.phase1;

// END role.paver.js


// CONCAT role.resourceMiner.js
var resourceMiner = {
    targets: function() {
        var out = {};
        for (var r in rooms) {
            out[r] = {
                mines: Game.rooms[r].find(FIND_MINERALS),
                dump: Game.rooms[r].find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_STORAGE}})
            }
        }
        //out.E58S8.resource = RESOURCE_UTRIUM;
        //out.E58S7.resource = RESOURCE_LEMERGIUM;
        return out;
    },
    phase1: function(creep, t)  {
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        if ((creep.memory.action != 'mining' && creep.memory.action != 'dumping') ||
            (creep.memory.action == 'dumping' && _.sum(creep.carry) == 0)) {
            creep.memory.action = 'mining';
        }
        else if (creep.memory.action == 'mining' && _.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.action = 'dumping';
        }

        var tlist = t.resourceMiner[creep.memory.home];
        if (creep.memory.action == 'mining') {
            var target = creep.pos.findClosestByRange(tlist.mines);
            if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else if (creep.memory.action == 'dumping') {
            var target = creep.pos.findClosestByPath(tlist.dump);
            if (creep.transfer(target, tlist.resource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }


    }
};
resourceMiner.phase3 = resourceMiner.phase2 = resourceMiner.phase1;

// END role.resourceMiner.js


// CONCAT role.scruffy.js
var scruffy = {
    targets: function() {
        out = {};
        for (var r in rooms) {
            out[r] = {
                p:Game.rooms[r].find(FIND_DROPPED_ENERGY),
                d:Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER}})
            }
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();

        if (!creep.memory.scruffy) creep.memory.scruffy = {action: 'cleaning'};

        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else {
            if (creep.carry.energy == creep.carryCapacity && creep.memory.scruffy.action == 'cleaning') {
                creep.memory.scruffy.action = 'dropping';
            }
            else if (creep.carry.energy == 0 && creep.memory.scruffy.action == 'dropping') {
                creep.memory.scruffy.action = 'cleaning';
            }

            if (creep.memory.scruffy.action == 'cleaning') {
                var target = t.scruffy[creep.memory.home].p[0];
                if (target) {
                    if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target.pos);
                    }
                }
                else {
                    maintainer[creep.memory.phase](creep, t);
                }
            }
            else if (creep.memory.scruffy.action == 'dropping') {
                var target = t.scruffy[creep.memory.home].d[0];
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target.pos);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' scruffy: ' + etime);
    }
};
scruffy.phase3 = scruffy.phase2 = scruffy.emergency = scruffy.phase1;

// END role.scruffy.js


// CONCAT role.spawner.js
var spawner = {
    targets: function() {
        var out = {};
        for (var r in rooms) {
            out[r] = Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_SPAWN || s.structureType==STRUCTURE_EXTENSION) && s.energy< s.energyCapacity}});
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();

        if (!creep.memory.spawner) creep.memory.spawner = {};

        if (creep.ticksToLive < 250 && creep.memory.renewQ.state == '') {
            creep.memory.renewQ.state = 'renewing';
        }
        else if (creep.carry.energy == 0) {
            creep.memory.energyQ.state = 'entering';
        }
        else {
            var tlist = t.spawner[creep.memory.home];
            if (tlist.length) {
                var target = creep.pos.findClosestByRange(tlist);
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                upgrader[rooms[creep.memory.home].phase](creep, t);
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' spawner: ' + etime);
    }
};
spawner.phase3 = spawner.phase2 = spawner.phase1;
spawner.emergency = spawner.phase1;

// END role.spawner.js


// CONCAT role.support.js
var support = {
    targets: function() {
        var r = room_targ;
        var h = new RoomPosition(21, 22, r);
        var includeOwners = ['the_beanstalk', 'roboboy'];
        var t = {target: null, s_targ: null, t_targ: null};
        try {
            t = {
                target: h.findClosestByRange(FIND_CREEPS, {filter: (s) => {return s.hits < s.hitsMax/2}}),
                s_targ: h.findClosestByRange(FIND_CREEPS, {filter: (s)=> {return s.hits < s.hitsMax}}),
            };
        }
        catch(err) {}
        var out = {
            deploy: army_deploy,
            stage: army_stage,
            dest: r,
            target: t.target,
            sec_target: t.s_targ,
            t_target: t.t_targ,
        };
        return out;
    },
    phase1: function(creep, t) {
        creep.memory.dontSpawn = true;
        var tlist = t.support;
        if (creep.room.name != tlist.dest) {
            if (tlist.deploy) {
                creep.moveTo(new RoomPosition(31, 21, tlist.dest));
            }
            else {
                creep.moveTo(tlist.stage);
            }
        }
        else {
            if (tlist.target) {
                if (creep.heal(tlist.target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tlist.target);
                }
            }
            else if (tlist.sec_target) {
                if (creep.heal(tlist.sec_target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tlist.sec_target);
                }
            }
            else {
                creep.moveTo(new RoomPosition(25, 25, tlist.dest));
            }
        }
    }
};
support.phase3 = support.phase2 = support.phase1;

// END role.support.js


// CONCAT role.tank.js
var tank = {
    targets: function() {
        return {
            dest: new RoomPosition(8, 22, room_targ),
            deploy: army_deploy,
            stage: army_stage
        }
    },
    phase1: function(creep, t) {
        creep.memory.dontSpawn = true;
        var tlist = t.tank;
        if (tlist.deploy) {
            creep.moveTo(tlist.dest);
        }
        else {
            creep.moveTo(tlist.stage);
        }
    }
};
tank.phase3 = tank.phase2 = tank.phase1;

// END role.tank.js


// CONCAT role.towerFiller.js
var towerFiller = {
    targets: function() {
        var out = {};
        for (var r in rooms) {
            out[r] = {
                'harvesting':Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] >= 50}}),
                'filling':Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return s.structureType==STRUCTURE_TOWER && s.energy<s.energyCapacity}}).concat(Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return s.structureType==STRUCTURE_STORAGE && s.store.energy<s.storeCapacity}}))
            };
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();

        if (!creep.memory.towerFiller) creep.memory.towerFiller = {action: 'harvesting'};

        var tlist = t.towerFiller[creep.memory.home];
        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else if (creep.ticksToLive < 250 && creep.memory.renewQ.state == '') {
            creep.memory.renewQ.state = 'entering';
        }
        else if (tlist.filling.length) {
            if (creep.carry.energy == 0 && creep.memory.towerFiller.action == 'filling') {
                creep.memory.towerFiller.action = 'harvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.towerFiller.action == 'harvesting') {
                creep.memory.towerFiller.action = 'filling';
            }

            if (creep.memory.towerFiller.action == 'harvesting') {
                var target = null;
                if (tlist.filling[0] && tlist.filling[0].structureType != STRUCTURE_STORAGE && tlist.harvesting.length) {
                    target = tlist.harvesting[0];
                }
                if (target) {
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    creep.memory.energyQ.state = 'entering';
                }
            }
            else if (creep.memory.towerFiller.action == 'filling') {
                var target = tlist.filling[0];
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        }
        else {
            spawner[creep.memory.phase](creep, t);
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' towerFiller: ' + etime);
    }
};
towerFiller.phase3 = towerFiller.phase2 = towerFiller.phase1;
towerFiller.emergency = towerFiller.phase1;

// END role.towerFiller.js


// CONCAT role.upgrader.js
var upgrader = {
    targets: function() {
        var only_these = {
            E63N59: ['57fc9dd698812bf3681c8829', '580514436c47dea9463e6a01'],
            E61N58: ['5805b86cdf8ca9af0aecf77b'],
            E64N58: ['5801324c7c292ce83567328f'],
        };
        var out = {};
        for (var r in rooms) {
            out[r] = [];
            for (var j=0; j < only_these[r].length; j++) {
                var t = Game.getObjectById(only_these[r][j]);
                if (t) {
                    out[r].push(t);
                }
            }
        }
        return out;
    },
    // Takes the creep, and a dictionary of lists describing harvesting targets in the room
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();

        if (!creep.memory.upgrader) creep.memory.upgrader = {action: 'harvesting'};

        if (creep.room.name != creep.memory.home) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
        }
        else if (creep.ticksToLive < 250 && creep.memory.renewQ.state == '') {
            creep.memory.renewQ.state = 'entering';
        }
        else {
            if (creep.carry.energy == 0 && creep.memory.upgrader.action != 'harvesting') {
                creep.memory.upgrader.action = 'harvesting';
            }
            else if (creep.carry.energy == creep.carryCapacity && creep.memory.upgrader.action != 'upgrading') {
                creep.memory.upgrader.action = 'upgrading';
            }
            if (creep.memory.upgrader.action == 'harvesting') {
                var tlist = t.upgrader[creep.memory.home];
                var target = creep.pos.findClosestByRange(tlist, {filter:(s)=>{return (s.structureType == STRUCTURE_LINK && s.energy >= creep.carryCapacity) || (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= creep.carryCapacity)}});
                if (target) {
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    creep.memory.energyQ.state = 'entering';
                }
            }
            else if (creep.memory.upgrader.action == 'upgrading') {
                var room = Game.rooms[creep.memory.home];
                if (creep.upgradeController(room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(room.controller);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' upgrader: ' + etime);
    }
};
upgrader.phase3 = upgrader.phase2 = upgrader.emergency = upgrader.phase1;

// END role.upgrader.js


// CONCAT role.wallMaintainer.js
var wallMaintainer = {
    targets: function() {
        var out = {};
        for (var r in rooms) {
            out[r] = [
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_RAMPART) && s.hits<1000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL) && s.hits<1000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_RAMPART) && s.hits<100000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL) && s.hits<100000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_RAMPART) && s.hits<500000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL) && s.hits<500000}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_RAMPART) && s.hits< s.hitsMax/2}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL) && s.hits< s.hitsMax/2}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_RAMPART) && s.hits< s.hitsMax}}),
                Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL) && s.hits< s.hitsMax}})
            ];
        }
        return out;
    },
    phase1: function(creep, t) {
        var stime = Game.cpu.getUsed();

        if (!creep.memory.wallMaintainer) creep.memory.wallMaintainer = {};

        if (creep.ticksToLive < 250 && creep.memory.renewQ.state == '') {
            creep.memory.renewQ.state = 'entering';
        }
        else if (creep.carry.energy == 0) {
            creep.memory.energyQ.state = 'entering';
        }
        else {
            var tlist = t.wallMaintainer[creep.memory.home];
            var target = null;
            for (var i = 0; i < tlist.length; i++) {
                if (tlist[i].length && tlist[i][0] != undefined) {
                    target = tlist[i][0];
                    break;
                }
            }
            if (target) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                maintainer[rooms[creep.memory.home].phase](creep, t);
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' wallMaintainer: ' + etime);
    }
};
wallMaintainer.phase3 = wallMaintainer.phase2 = wallMaintainer.phase1;
wallMaintainer.emergency = wallMaintainer.phase1;

// END role.wallMaintainer.js



// CONCAT link.js
var linker = {
    targets: function() {
        return { // from:ids, to:objects
            E63N59: {from: ['5804e1fe90cbb40d1f5d3843'], to: [Game.getObjectById('580514436c47dea9463e6a01')]}
        };
    },
    phase1: function(l, t) {
        if (l.energy) {
            var tlist = t.linker[l.room.name];
            if (tlist.from.indexOf(l.id)>-1) {
                if (tlist.to.length) {
                    l.transferEnergy(l.pos.findClosestByRange(tlist.to, {filter:(s)=>{return s.energy<s.energyCapacity}}));
                }
            }
        }
    }
};
linker.phase3 = linker.phase2 = linker.emergency = linker.phase1;

// END link.js


// CONCAT tower.js
var tower = {
    targets: function() {
        var out = {};
        for (var r in rooms) {
            out[r] = {
                hostiles: Game.rooms[r].find(FIND_HOSTILE_CREEPS),
                injured: Game.rooms[r].find(FIND_MY_CREEPS, {filter:(c)=>{return (c.hits< c.hitsMax)}}),
                structures: [
                    Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL|| s.structureType==STRUCTURE_RAMPART) && s.hits<100000}}),
                    Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_RAMPART) && s.hits<s.hitsMax}})
                ]
            };
        }
        return out;
    },
    phase1: function(tower, t) {
        var tlist = t.tower[tower.room.name];
        if (tlist.hostiles.length) {
            tower.attack(tower.pos.findClosestByRange(tlist.hostiles));
            // Set emergency phase?
        }
        else if(tlist.injured.length) {
            tower.heal(tower.pos.findClosestByRange(tlist.injured));
        }
        else {
            var target = null;
            for (var i=0; i<tlist.structures.length; i++) {
                if (tlist.structures[i].length) {
                    target = tlist.structures[i][0]; //tower.pos.findClosestByRange(tlist.structures[i]);
                    break;
                }
            }
            if (target) {
                tower.repair(target);
            }
        }
    }
};
tower.phase3 = tower.phase2 = tower.phase1;
tower.emergency = tower.phase1;

// END tower.js



// CONCAT energyQueue.js
var energyQueue = {
    phase1: function(creep) {
        var stime = Game.cpu.getUsed();
        var roomMem = Memory.rooms[creep.memory.home].phase1;
        var roomInf = rooms[creep.memory.home].energyInfo;
        if (!Game.getObjectById(roomMem.energyQ[creep.memory.qindex][0])) {
            roomMem.energyQ[creep.memory.qindex].shift();
        }
        if (creep.memory.energyQ.state == 'entering') {
            var qindex = 0;
            for (var i=0; i < roomMem.energyQ.length; i++) {
                if (roomMem.energyQ[i].length <= roomMem.energyQ[qindex].length) {
                    qindex = i;
                }
            }
            creep.memory.qindex = qindex;
            roomMem.energyQ[qindex].push(creep.id);
            creep.memory.energyQ.state = 'waiting';
            creep.moveTo(roomInf[qindex].wpos);
        }
        else if (creep.memory.energyQ.state == 'waiting') {
            if (roomMem.energyQ[creep.memory.qindex][0] == creep.id) {
                creep.memory.energyQ.state = 'harvesting';
            }
            else {
                if (roomMem.energyQ[creep.memory.qindex].indexOf(creep.id) == -1) {
                    creep.memory.energyQ.state = 'entering';
                }
                else {
                    var p = roomInf[creep.memory.qindex].wpos;
                    var d = roomInf[creep.memory.qindex].wdir;
                    var i = roomMem.energyQ[creep.memory.qindex].indexOf(creep.id);
                    creep.moveTo(p.x+(d.x*i), p.y+(d.y*i));
                }
            }
        }
        else if (creep.memory.energyQ.state == 'harvesting') {
            if (creep.carry.energy == creep.carryCapacity) {
                roomMem.energyQ[creep.memory.qindex].shift();
                creep.memory.energyQ.state = '';
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
        if (!creep.memory.energyQ) creep.memory.energyQ = {state: 'entering', index: 0};
        if (creep.memory.energyQ.state == 'entering') {
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
            creep.memory.energyQ.index = qindex;
            roomMem.energyQ[qindex].push(creep.id);
            creep.memory.energyQ.state = 'waiting';
            creep.moveTo(roomInf[creep.memory.energyQ.index].wpos);
        }
        else if (creep.memory.energyQ.state == 'waiting') {
            if (roomMem.energyQ[creep.memory.energyQ.index][0] == creep.id) {
                creep.memory.energyQ.state = 'harvesting';
            }
            else {
                if (roomMem.energyQ[creep.memory.energyQ.index].indexOf(creep.id) == -1) {
                    creep.memory.energyQ.state = 'entering';
                }
                else {
                    var p = roomInf[creep.memory.energyQ.index].wpos;
                    var d = roomInf[creep.memory.energyQ.index].wdir;
                    var i = roomMem.energyQ[creep.memory.energyQ.index].indexOf(creep.id);
                    creep.moveTo(p.x+(d.x*i), p.y+(d.y*i));
                }
            }
        }
        else if (creep.memory.energyQ.state == 'harvesting') {
            if (creep.carry.energy == creep.carryCapacity) {
                roomMem.energyQ[creep.memory.energyQ.index].shift();
                creep.memory.energyQ.state = '';
            }
            else {
                var source = Game.getObjectById(roomInf[creep.memory.energyQ.index].sid);
                if (creep.withdraw(source, RESOURCE_ENERGY, creep.carryCapacity-_.sum(creep.carry)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source.pos);
                }
            }
        }
        var etime = (Game.cpu.getUsed() - stime);
        // console.log(creep.name + ' queueP2: ' + etime);
    }
};
energyQueue.phase3 = energyQueue.emergency = energyQueue.phase2;
// END queue.js



// CONCAT cmd.js
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
            var i = 1;
            if (args.reverse) i = -1
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
    getRole: function(args) {
        if (!args.name) {
            console.log('Requires name');
            return
        }
        if (!Game.creeps[args.name]) {
            console.log('Creep not found');
        }
        console.log(args.name + ' is a ' + Memory.creeps[args.name].role);
    },
};
// END cmd.js



var roles = {
    builder: builder,
    claimer: claimer,
    defender: defender,
    drudge: drudge,
    energyMiner: energyMiner,
    // harvester: harvester,
    healer: healer,
    // hoarder: hoarder,
    hunter: hunter,
    maintainer: maintainer,
    mover: mover,
    paver: paver,
    resourceMiner: resourceMiner,
    scruffy: scruffy,
    spawner: spawner,
    support: support,
    tank: tank,
    towerFiller: towerFiller,
    upgrader: upgrader,
    wallMaintainer: wallMaintainer,

    linker: linker,
    tower: tower,
};

// CONCAT renewQueue.js

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


var spawn = function (r) {
    try {
        var room = Game.rooms[r].memory[rooms[r].phase];
        if (room.spawnq.length) {
            room.enableRenew = false;
            var body = bodies[room.spawnLevel][room.spawnq[0].role];
            // if no spawners for current room
            if (Game.rooms[r].find(FIND_MY_CREEPS, {filter: (creep) => {return creep.memory.role == 'spawner' && creep.memory.home == r;}}).length == 0 ||
                Game.rooms[r].find(FIND_MY_CREEPS, {filter: (creep) => {return creep.memory.role == 'energyMiner' && creep.memory.home == r;}}).length == 0) {
                body = bodies[0][room.spawnq[0].role];
            }
            var newName = Game.spawns[rooms[r].spawn].createCreep(body, undefined, room.spawnq[0]);
            if (newName != ERR_BUSY && newName != ERR_NOT_ENOUGH_ENERGY) {
                console.log('Spawning new ' + room.spawnq[0].role + ', ' + newName + ', at ' + rooms[r].spawn);
                room.spawnq.shift();
            }
        }
        else room.enableRenew = true;
    }
    catch (err) {
        console.log(r + ': ' + err)
    }
};

module.exports.loop = function () {
    if (true) {

        for (var r in rooms) {
            var roomInf = rooms[r];
            var roomObj = Memory.rooms[r];
            phases[roomInf.phase](r);
            // check hits of spawn, if less than half and there's an available safe mode, activate it
            if (Game.spawns[roomInf.spawn].hits < Game.spawns[roomInf.spawn].hitsMax) {
                if (Game.rooms[r].controller.safeModeAvailable) {
                    var o = Game.rooms[r].controller.activateSafeMode();
                    var s = '';
                    if (o == 0) {
                        s = 'Successfully activated safe mode in room '+r;
                    }
                    else {
                        s = 'Error activating safe mode: '+o;
                    }
                    console.log(s);
                    Game.notify(s, 0);
                }
            }

            // every 20 ticks, calculate the maximum spawn energy (mse) available
            if (Game.time % 20 == 0) {
                roomObj.mse = maxSpawnEnergy(r);
            }
            // Run spawning algorithm (described above, each room gets it's own spawn queue)
            spawn(r);
        }

        // Set targets (cuts down on CPU time by only searching for targets once per role per tick)
        var targets = {};
        for (var r in roles) {
            targets[r] = roles[r].targets();
        }

        var test = [0, ''];
        var next = [];
        // Run correct role per creep
        for (var name in Game.creeps) {
            try {
                var creep = Game.creeps[name];
                var creepHomePhase = rooms[creep.memory.home].phase;
                var stime = Game.cpu.getUsed();
                if (!creep.memory.energyQ) creep.memory.energyQ = {state: '', index: ''};
                if (!creep.memory.renewQ) creep.memory.renewQ = {state: ''};
                if (creep.memory.renewQ.state != '') {
                    renewQueue(creep, targets);
                }
                else if (creep.memory.energyQ.state != '') {
                    energyQueue[creepHomePhase](creep);
                }
                else {
                    if (['healer', 'defender', 'tank', 'hunter', 'support', 'upgrader'].indexOf(creep.memory.role) == -1 &&
                            Memory.rooms[creep.memory.home][creepHomePhase].spawnq.length) {
                        roles.spawner[creepHomePhase](creep, targets);
                    }
                    else roles[creep.memory.role][creepHomePhase](creep, targets);
                }
            }
            catch(err) {
                console.log("Error with " + name + '\n' + err);
            }

            next.push(name);

            if (test[0] < (Game.cpu.getUsed()-stime)) {
                test[0] = (Game.cpu.getUsed()-stime);
                test[1] = name + ' ' + creep.memory.role;
            }
        }
        // console.log(test[1] + ' ' + test[0]);

        // Compare aliveLastTick with Game.creeps (if no aliveLastTick, set to aliveThisTick and move on)
        // spawn accordingly, clear memory, logify
        if (Memory.aliveLastTick.length) {
            for (var i in Memory.aliveLastTick) {
                var n = Memory.aliveLastTick[i];
                if (!Game.creeps[n]) {
                    var cMem = Memory.creeps[n];
                    if (cMem) {
                        var cRoom = Game.rooms[cMem.home].memory;
                        cMem.energyQ.state = '';
                        cMem.renewQ.state = '';
                        if (!cMem.dontSpawn) {
                            if (cMem.role == 'energyMiner' || cMem.role == 'spawner') {
                                cRoom[cMem.phase].spawnq.unshift(cMem);
                            }
                            else {
                                cRoom[cMem.phase].spawnq.push(cMem);
                            }
                        }
                        console.log(n + ' (' + cMem.role + ', ' + cMem.home + ')' + ' dieded.');
                        delete Memory.creeps[n];
                    }
                }
            }
        }
        Memory.aliveLastTick = next;


        // Run towers & links
        for (var r in rooms) {
            var towers = Game.rooms[r].find(FIND_MY_STRUCTURES, {filter:(s)=>{return s.structureType == STRUCTURE_TOWER}});
            for (var t in towers) {
                roles.tower[rooms[r].phase](towers[t], targets);
            }
            var links = Game.rooms[r].find(FIND_MY_STRUCTURES, {filter:(s) => {return s.structureType == STRUCTURE_LINK}});
            for (var l in links) {
                roles.linker[rooms[r].phase](links[l], targets);
            }
        }

        // Notify about 90% CPU limit (maybe add bucket amount)
        if (Game.cpu.getUsed() > Game.cpu.tickLimit*0.90) {
            Game.notify('More that 90% CPU time used this tick, '+Game.cpu.bucket+' in bucket');
            console.log('More that 90% CPU time used this tick, '+Game.cpu.bucket+' in bucket');
        }

        // Check if running a command
        if (Memory.cmd && Memory.cmd != '') {
            try {
                var m = /\s*(\w+)\s*(.*)/.exec(Memory.cmd);
                if (m != null) {
                    var command = m[1];
                    var argsStr = m[2];
                    var args = {};
                    while (argsStr != '' && argsStr != null) {
                        m = /\s*(.+?):\s*(.+?)(?:$|(?:\s+(.*)))/.exec(argsStr);
                        if (m != null) {
                            args[m[1]] = m[2];
                            argsStr = m[3];
                        }
                        else {
                            break;
                        }
                    }
                    if (cmd[command]) {
                        cmd[command](args);
                    }
                    else {
                        console.log('Available commands: ' + Object.keys(cmd));
                    }
                }
                else {
                    console.log('Malformed');
                }
            }
            catch (err) {
                console.log('Error in cmd: ' + err);
            }
            finally {
                delete Memory.cmd
            }
        }



    }
};