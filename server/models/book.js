const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    review: {
        type: String,
        default: 'N/A'
    },
    price: {
        type: String,
        default: 'N/A'
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    pages: {
        type: String,
        required: true,
        default: 'N/A'
    },
    ownerId: {
        type: String,
        required: true
    }
}, { timeStamps: true });


const Book = mongoose.model('Book', bookSchema);

module.exports = { Book }