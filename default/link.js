var role = {
    targets: function() {
        return {
            //E58S8: {from: ['57ddbf52c64074f64e2f1d2d'], to: [Game.getObjectById('57ddccbe3379dcf753c3be11'), Game.getObjectById('57ef8408a10a26f35ae5c1a1')]}, // from:ids, to:objects
            //E58S7: {from: ['57eadbb2962b285967d49c7c'], to: [Game.getObjectById('57eaef4a0fe7d4d93854953c')]}
            E13S56: {from: [], to: []},
            E16S57: {from: [], to: []}
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
role.phase2 = role.emergency = role.phase1;

module.exports = role;