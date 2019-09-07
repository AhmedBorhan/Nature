const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ActivitySchema = new Schema({
    title: [{
        languag: {
            type: String,
            enum: ['en', 'ar', 'kr']
        },
        text: {
            type: String
        }
    }],
    description: [{
        languag: {
            type: String,
            enum: ['en', 'ar', 'kr']
        },
        text: {
            type: String
        }
    }],
    images: [{
        name: String,
        url: String
    }],
    videos: [{
        url: String
    }],
    location: {
        city: {
            type: String,
            enum: ['slemani', 'hawler', 'karkuk', 'dhok', 'hallabja']
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


