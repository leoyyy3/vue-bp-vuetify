var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Survey = new Schema ({
    productId: { type: String, required: true, unique: true, index: true},
    questions: { type: [Schema.Type.ObjectId] },
    results: []
})