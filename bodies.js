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
