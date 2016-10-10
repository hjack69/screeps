module.exports = {bodies:[
    // controller level 1, no extensions, 300 max
    {
        harvester: [WORK, CARRY, CARRY, MOVE, MOVE],
        upgrader: [WORK, CARRY, CARRY, MOVE, MOVE],
        builder: [WORK, CARRY, CARRY, MOVE, MOVE],
        paver: [WORK, CARRY, CARRY, MOVE, MOVE],
        maintainer: [WORK, CARRY, CARRY, MOVE, MOVE],
        wallMaintainer: [WORK, CARRY, CARRY, MOVE, MOVE],
        mover: [WORK, CARRY, CARRY, MOVE, MOVE],
        towerFiller: [WORK, CARRY, CARRY, MOVE, MOVE],
        spawner: [WORK, CARRY, MOVE],
        energyMiner: [WORK, WORK, CARRY, MOVE],
        defender: [ATTACK, ATTACK, MOVE, MOVE],
        healer: [HEAL, MOVE],
        hoarder: [WORK, CARRY, CARRY, MOVE, MOVE],
        claimer: [WORK, CARRY, CARRY, MOVE, MOVE],
        scruffy: [WORK, CARRY, CARRY, MOVE, MOVE],
        resourceMiner: [WORK, WORK, CARRY, MOVE],
        hunter: [TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE],
    },
    // controller level 2, 5 extensions, 550 max
    {
        harvester: [WORK, CARRY, CARRY, MOVE, MOVE],
        upgrader: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        builder: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        paver: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        maintainer: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        wallMaintainer: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        mover: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
        towerFiller: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
        spawner: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
        energyMiner: [WORK, WORK, WORK, WORK, CARRY, MOVE],
        defender: [TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE],
        hunter: [TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE],
        support: [TOUGH, MOVE, TOUGH, MOVE, MOVE, HEAL, MOVE, HEAL],
        healer: [MOVE, MOVE, HEAL, HEAL],
        hoarder: [WORK, CARRY, CARRY, MOVE, MOVE],
        claimer: [CLAIM, MOVE],
        scruffy: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
        drudge: [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE],
        resourceMiner: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        tank: [TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE]
    },
    // controller level 3, 10 extensions, 800 max
    {
        harvester: [WORK, CARRY, MOVE],
        upgrader: [WORK, WORK, WORK, CARRY, MOVE, MOVE],
        builder: [WORK, WORK, CARRY, MOVE],
        paver: [WORK, CARRY, MOVE],
        maintainer: [WORK, CARRY, MOVE],
        wallMaintainer: [WORK, CARRY, MOVE, CARRY, MOVE],
        mover: [WORK, CARRY, MOVE, CARRY, MOVE],
        towerFiller: [WORK, CARRY, MOVE, CARRY, MOVE],
        spawner: [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
        energyMiner: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE],
        defender: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK],
        hunter: [TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK],
        support: [MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL],
        healer: [MOVE, MOVE, HEAL, HEAL],
        hoarder: [WORK, CARRY, MOVE],
        claimer: [CLAIM, MOVE, MOVE],
        scruffy: [WORK, CARRY, MOVE, CARRY, MOVE],
        drudge: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        resourceMiner: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        tank: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
    },
    // controller level 4, 20 extensions, 1300 max
    {
        harvester: [],
        upgrader: [],
        builder: [],
        paver: [],
        maintainer: [],
        wallMaintainer: [],
        mover: [],
        towerFiller: [],
        spawner: [],
        energyMiner: [],
        defender: [],
        healer: [],
        hoarder: [],
        claimer: []
    },
    // controller level 5, 30 extensions, 1800 max
    {
        harvester: [],
        upgrader: [],
        builder: [],
        paver: [],
        maintainer: [],
        wallMaintainer: [],
        mover: [],
        towerFiller: [],
        spawner: [],
        energyMiner: [],
        defender: [],
        healer: [],
        hoarder: [],
        claimer: []
    },
    // controller level 6, 40 extensions, 2300 max
    {
        harvester: [],
        upgrader: [],
        builder: [],
        paver: [],
        maintainer: [],
        wallMaintainer: [],
        mover: [],
        towerFiller: [],
        spawner: [],
        energyMiner: [],
        defender: [],
        healer: [],
        hoarder: [],
        claimer: []
    },
    // controller level 7, 50 extensions, 5300 max
    {
        harvester: [],
        upgrader: [],
        builder: [],
        paver: [],
        maintainer: [],
        wallMaintainer: [],
        mover: [],
        towerFiller: [],
        spawner: [],
        energyMiner: [],
        defender: [],
        healer: [],
        hoarder: [],
        claimer: []
    },
    // controller level 8, 60 extensions, 12300 max
    {
        harvester: [],
        upgrader: [],
        builder: [],
        paver: [],
        maintainer: [],
        wallMaintainer: [],
        mover: [],
        towerFiller: [],
        spawner: [],
        energyMiner: [],
        defender: [],
        healer: [],
        hoarder: [],
        claimer: []
    },
]};