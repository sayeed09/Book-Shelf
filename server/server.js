const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

const { User } = require('./models/user');
const { Book } = require('./models/book');
const { auth } = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());

const Port = process.env.Port || 3001;

// POST
app.post('/api/book', (req, res) => {
    const book = new Book(req.body);

    book.save((err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            bookId: doc._id
        })
    })
})

app.post('/api/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, error: err });
        res.status(200).json({
            success: true,
            user: doc
        })
    })
})

app.post('/api/login', (req, res) => {

    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user) return res.status(200).json({ isAuth: false, Message: "User not Found!" });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({ isAuth: false, Message: "Wrong Password " })
        });
        user.generateToken((err, user) => {
            if (err) return res.send(err)
            res.cookie('auth', user.token).json({
                isAuth: true,
                id: user._id,
                email: user.email
            })
        })
    });
})




//GET
app.get('/api/getBook', (req, res) => {
    let id = req.query.id;
    Book.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
});

app.get('/api/books', (req, res) => {
    //api/books?skip=skip&limitlimit&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;
    Book.find().skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
});

app.get('/api/getReviewer', (req, res) => {
    let id = req.query.id;

    User.findById(id, (err, user) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            name: user.name,
            lastName: user.lastName
        })
    })
})

app.get('/api/getAllUsers', (req, res) => {

    User.find({}, (err, user) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            user: user
        })
    })
})

app.get('/api/users_post', (req, res) => {
    let id = req.query.id;

    User.find({ OwnerId: id }).exec((err, user) => {
        if (err) return res.status(400).json({ success: false });
        res.json({
            User: user
        })
    })
})

app.get('/api/logout', auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).json({ success: false });
        res.json({ success: true })
    })
})

app.get('/api/auth', auth, (req, res) => {
    res.json({
        user: user
    })
})


//UPDATE
app.post('/api/update_book', (req, res) => {
    Book.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    });
});




// DELETE
app.delete('/api/delete_book', (req, res) => {
    let id = req.query.id;

    Book.findByIdAndRemove(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    })
})



app.listen(Port, () => {
    console.log("SERVER IS RUNNING");
})