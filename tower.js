var tower = {
    targets: function() {
        var out = {};
        for (var r in rooms) {
            out[r] = {
                hostiles: Game.rooms[r].find(FIND_HOSTILE_CREEPS),
                injured: Game.rooms[r].find(FIND_MY_CREEPS, {filter:(c)=>{return (c.hits< c.hitsMax)}}),
                structures: [
                    Game.rooms[r].find(FIND_STRUCTURES, {filter:(s)=>{return (s.structureType==STRUCTURE_WALL|| s.structureType==STRUCTURE_RAMPART) && s.hits<100000}})
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
tower.phase2 = tower.phase1;
tower.emergency = tower.phase1;

// END tower.js
