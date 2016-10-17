var debug = function(msg, cats) {
    for (var i in cats) {
        if (doCats.indexOf(cats[i]) > -1) {
            console.log(msg);
            return
        }
    }
};

// END debug.js