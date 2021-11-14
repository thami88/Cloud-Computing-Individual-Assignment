const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let News = new Schema({
    news_description: {
        type: String
    },
    news_date: {
        type: String
    } 
});

module.exports = mongoose.model('News', News);