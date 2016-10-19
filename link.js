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
