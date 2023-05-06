const mongoose = require('mongoose');

var exampleSchema = new mongoose.Schema({
   teamname: { type: String,unique: true, required: true},
   country: { type: String, required: true},
   teamvalue: { type: Number, required: true},
   stadium: { type: String, required: true},
}, {collection: 'example'});

mongoose.model('example', exampleSchema);
