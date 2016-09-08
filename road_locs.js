var set_locs = function() {
    Game.rooms['E19S58'].memory.paths = [];
    // IGNORE CREEPS
    // get all source locations
    var sources = Game.rooms['E19S58'].find(FIND_SOURCES);
    // get controller location
    var cntrl = Game.rooms['E19S58'].controller;
    // get all spawn locations
    var spwns = Game.rooms['E19S58'].find(FIND_MY_SPAWNS);
    // for each source:
    for (var s in sources) {
        // path from current source to controller
        var p = Game.rooms['E19S58'].findPath(s.pos, cntrl.pos, {ignoreCreeps: true});
        for (var v in p) {
            Game.rooms['E19S58'].memory.paths.concat([{'x': v.x, 'y': v.y}]);
        }
        // for each spawn:
        for (var spn in spns) {
            // path from current source to current spawn
            p = Game.rooms['E19S58'].findPath(s.pos, spn.pos, {ignoreCreeps: true});
            for (var v in p) {
                Game.rooms['E19S58'].memory.paths.concat([{'x': v.x, 'y': v.y}]);
            }
        }
    }
}
                    
module.exports = {
    'set_locs': set_locs
}