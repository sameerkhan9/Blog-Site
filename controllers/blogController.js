//
const Blog = require('../models/blogs');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', { blog: result, title: 'Blog Details' });
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Blog not found' });
            
        });
};

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a blog' });
};

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
};

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id) // when we use fetch(AJAX request) , we cannot redirect on the server, we have to send json or text data back to the browser
        .then((result) => {
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            res.status(404).res.render('404', { title: 'Blog not found' });
        });
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete

};