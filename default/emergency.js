module.exports = {
    emergency: function(creep) {
        var targets = Memory.currentEnemies;
        if (targets.length) {
            creep.moveTo(targets[0].pos);
        }
    }
};