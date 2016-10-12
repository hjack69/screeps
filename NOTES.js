Memory.cmd = "spawn -role: , -room: E63N59"

Memory.cmd = 'getCreeps -role: , -room: E63N59'

for(var i in Memory.creeps) {if(!Game.creeps[i]) {delete Memory.creeps[i];}}

var randint = function(s, b) {return Math.floor((Math.random()*b)+s);}