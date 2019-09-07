const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AdminSchema = new Schema({
    name : {
        type : String
    },
    password : {
        type : String
    }
}, {
    timestamps: true
});

AdminSchema.methods = {};

module.exports = Admin = mongoose.model('admin', AdminSchema);
