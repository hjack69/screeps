/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('test');
 * mod.thing == 'a thing'; // true
 */
 
var test = function() {
    var locations = [
        {'x': 5, 'y': 12},
        {'x': 6, 'y': 12},
        {'x': 6, 'y': 13},
        {'x': 6, 'y': 14},
        {'x': 7, 'y': 13},
        {'x': 7, 'y': 14},
        {'x': 7, 'y': 15},
        {'x': 8, 'y': 15},
        {'x': 9, 'y': 15},
        {'x': 10, 'y': 15},
        {'x': 11, 'y': 15},
        {'x': 12, 'y': 15},
        {'x': 13, 'y': 15},
        {'x': 14, 'y': 15},
        {'x': 15, 'y': 15},
        {'x': 16, 'y': 15},
        {'x': 17, 'y': 15},
        {'x': 18, 'y': 15},
        {'x': 19, 'y': 15},
        {'x': 20, 'y': 15},
        {'x': 21, 'y': 15},
        {'x': 22, 'y': 15},
        {'x': 23, 'y': 15},
        {'x': 24, 'y': 15},
        {'x': 25, 'y': 15},
        {'x': 26, 'y': 15},
        {'x': 27, 'y': 15},
        {'x': 28, 'y': 15},
        {'x': 29, 'y': 15},
        {'x': 30, 'y': 15},
        {'x': 30, 'y': 16},
        {'x': 30, 'y': 17},
        {'x': 30, 'y': 18},
        {'x': 30, 'y': 19},
        {'x': 30, 'y': 20},
        {'x': 30, 'y': 21},
        {'x': 30, 'y': 22},
        {'x': 19, 'y': 16},
        {'x': 19, 'y': 17},
        {'x': 19, 'y': 18},
        {'x': 19, 'y': 19},
        {'x': 19, 'y': 20},
        {'x': 19, 'y': 21},
    ]
    Game.rooms['E19S58'].memory.roads = locations;
    for (var v=0; v < Game.rooms['E19S58'].memory.roads.length; v++) { 
        var p = Game.rooms['E19S58'].memory.roads[v];
        var h = Game.rooms['E19S58'].lookAt(p.x, p.y);
        var pave = true;
        for (var item in h) {
            if (item.type == 'constructionSite') {
                pave = false;
            }
        }
        if (pave) {
            Game.rooms['E19S58'].createConstructionSite(p.x, p.y, STRUCTURE_ROAD);
        }
    }

}

module.exports = {
    'test': test
};

