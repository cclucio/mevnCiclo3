const mongoose = require('mongoose');
const { Schema } = mongoose;

const Task = new Schema({
    tittle: String,
    description: String
});

module.exports = mongoose.model('Task', Task);
