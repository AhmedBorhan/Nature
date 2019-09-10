const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ActivitySchema = new Schema({
    title: {
        kr:String,
        ar:String,
        en:String
    },
    description: {
        kr: String,
        ar: String,
        en: String
    },
    images: [{
        name: String,
        url: String
    }],
    videos: [{
        url: String
    }],
    location: {
        city: {
            type: String
        },
        street: {
            type: String
        }
    },
    views: Number,
    date: Date
}, {
    timestamps: true
});

ActivitySchema.index({ '$**': 'text' });

module.exports = Activity = mongoose.model('activity', ActivitySchema);


