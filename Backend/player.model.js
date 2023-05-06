const mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
   playername: { type: String, unique: true, required: true},
   value: { type: Number, required: true},
   goals : { type: Number, required: true},
   country : { type: String, required: true},
   teamname : { type: String, required: true},

}, {collection: 'player'});

mongoose.model('player', playerSchema);


