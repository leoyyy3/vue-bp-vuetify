var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Question = new Schema ({
    question: { type: String, required: true },
    options: { type: [Schema.Types.Mixed] },
    _childId: Schema.Types.ObjectId
})