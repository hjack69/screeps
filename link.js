var linker = {
    targets: function() {
        return {
            W61N59: {from: [], to: []} // from:ids, to:objects
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
linker.phase2 = linker.emergency = linker.phase1;