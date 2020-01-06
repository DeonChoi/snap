const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const photoSchema = new Schema({
    photoID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;