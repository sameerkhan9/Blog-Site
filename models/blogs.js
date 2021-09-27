const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: { 
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true}); // timestamps automatically adds time when there is updation or deletion etc.


// model name usually starts with capital letter
const Blog = mongoose.model('Blog', blogSchema); // it automatically pluralises and looks for 'blogs' in database
module.exports = Blog;