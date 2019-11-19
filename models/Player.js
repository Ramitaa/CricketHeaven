const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const PlayerSchema = new Schema({
    id: { 
        type: String,
        required: true
    },
    fullName: {
        type: String, 
        required: true
    },
    birth: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    imageURL: {
        type: String,
        required: true
    },
    battingStyle: {
        type: String,
        required: true
    },
    bowlingStyle: {
        type: String,
        required: true
    },
    majorTeams: {
        type: String,
        required: true
    },
    searchDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = Player = mongoose.model('players', PlayerSchema);

