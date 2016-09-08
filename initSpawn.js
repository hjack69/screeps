function shuffle (arr) {
    var i = 0, j = 0, temp = null;
    for (i = arr.length-1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

function init() {
    Memory.spawn_queue = shuffle([
        'upgrader', 'upgrader', 'upgrader', 'upgrader', 
        'harvester', 'harvester', 'harvester', 'harvester',
        'mover', 'mover',
        'paver', 'paver',
        'builder', 'builder', 'builder',
        'towerFiller', 'towerFiller', 
        'maintainer', 'maintainer', 'maintainer'
        ]);
}

module.exports = {
    'init': init,
    'shuffle': shuffle
};