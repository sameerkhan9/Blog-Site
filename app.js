const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();


//connect to mongodb
const dbURI = 'mongodb+srv://sameerkhan:netsameer2021@cluster1-demo.ziwv2.mongodb.net/nodetuts?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');



// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));// middleware to accept form data




// routes
app.get('/', (req, res) => {
    // redirect to /blogs
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);


// 404 page, must be at the bottom , app.use will be used for every request
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
