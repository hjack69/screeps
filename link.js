var role = {
    targets: function() {
        return {
            E58S8: {from: [], to: []}, // from:ids, to:objects
            E58S7: {from: [], to: []}
        };
    },
    phase1: function(l, t) {
        if (l.energy) {
            var tlist = t.linker[l.room.name];
            if (tlist.from.indexOf(l.id)>-1) {
                if (tlist.to.length) {
                    l.transferEnergy(l.pos.findClosestByRange(tlist.to, {filter:(s)=>{return s.energy<s.energyCapacity/2}}));
                }
            }
        }
    }
};
role.phase2 = role.emergency = role.phase1;

module.exports = role;