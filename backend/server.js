const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const newsRoutes = express.Router();
const PORT = 4000;

let News = require('./model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/test', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

newsRoutes.route('/').get(function(req, res) {
    News.find(function(err, news) {
        if (err) {
            console.log(err);
        } else {
            res.json(news);
        }
    });
});

newsRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    News.findById(id, function(err, news) {
        res.json(news);
    });
});

newsRoutes.route('/update/:id').post(function(req, res) {
    News.findById(req.params.id, function(err, news) {
        if (!news)
            res.status(404).send("data is not found");
        else
            news.news_description = req.body.news_description;
            news.news_date = req.body.news_date;

            news.save().then(news => {
                res.json('News updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

newsRoutes.route('/add').post(function(req, res) {
    let news = new News(req.body);
    news.save()
        .then(news => {
            res.status(200).json({'news': 'news added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new news failed');
        });
});

app.use('/news', newsRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});