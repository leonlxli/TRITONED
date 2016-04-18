// Node.js Dependencies
const express = require("express");
const app = express();
const http = require("http").createServer(app);
var mongoose = require('mongoose');
var handlebars = require('express-handlebars');
var io = require('socket.io')(http);

// const io = require("socket.io")(http);
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require('passport');

require("dotenv").load();
var models = require("./models");

var router = {
    index: require("./routes/index"),
    chat: require("./routes/chat"),
    newPost: require("./routes/newPost"),
    comments: require("./routes/comments")
};

var parser = {
    body: require("body-parser"),
    cookie: require("cookie-parser")
};

var strategy = {
    Twitter: require('passport-twitter').Strategy
};


// Database Connection
var db = mongoose.connection;
console.log(process.env.MONGOLAB_URI);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/cogs121');

db.on('error', console.error.bind(console, 'Mongo DB Connection Error:'));
db.once('open', function(callback) {
    console.log("Database connected successfully.");
});


// session middleware
var session_middleware = session({
    key: "session",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
        mongooseConnection: db
    })
});

// Middleware
app.set("port", process.env.PORT || 3000);
app.engine('html', handlebars({
    defaultLayout: 'layout',
    extname: '.html'
}));
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(parser.cookie());
app.use(parser.body.urlencoded({
    extended: true
}));
app.use(parser.body.json());
app.use(require('method-override')());
app.use(session_middleware);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new strategy.Twitter({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
        console.log(profile.id);
        models.User.findOne({
            twitterID: profile.id
        }, function(err, user) {
            // (1) Check if there is an error. If so, return done(err);
            if (err) {
                return done(err);
            }
            if (!user) {
                var newUser = new models.User({
                    "twitterID": profile.id,
                    "token": token,
                    "username": profile.screen_name,
                    "displayName": profile.displayName,
                    "photo": profile.photos[0]
                });
                newUser.save();
                return done(null, profile);
            } else {
                process.nextTick(function() {
                    user.twitterID = profile.id;
                    user.token = token;
                    user.username = profile.username;
                    user.displayName = profile.displayName;
                    user.photo = profile.photos[0];
                    user.save();
                    return done(null, profile);
                });
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Routes
app.get("/", router.index.view);
app.get("/chat", router.chat.view);
app.get("/newPost", router.newPost.view);
app.post("/newPost", router.newPost.post);
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/chat',
        failureRedirect: '/'
    }));
app.get('/comments', router.comments.view);
app.post('/comments', router.comments.post);
app.post('/comments/delete', router.comments.delete);
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
app.post('/chat/delete', router.chat.delete);


// More routes here if needed


io.use(function(socket, next) {
    session_middleware(socket.request, {}, next);
});

var currentlyOnline = 0;

io.on('connection', function(socket) {
    console.log('user connected');
    currentlyOnline += 1;
    io.emit('online', JSON.stringify({
        online: currentlyOnline
    }));
    socket.on('disconnect', function() {
            if (currentlyOnline > 0) {
                currentlyOnline -= 1;
                io.emit('online', JSON.stringify({
                    online: currentlyOnline
                }));
            }

            console.log('user disconnected');
        })
        // socket.on('newComment', function(comment) {
        //     var user = socket.request.session.passport.user;
        //     models.Posts.findOne({
        //         _id: comment.parent_post_id
        //     }, function(err, post) {
        //         var newComment = {
        //             'username': user.username,
        //             'photo': user.photos[0].value,
        //             'message': comment.comment,
        //         }
        //         post.comments.push(newComment);
        //         post.save(function(err, news) {
        //             if (err) console.log(err);
        //             newComment['parent_id'] = comment.parent_post_id
        //             io.emit('newComment', JSON.stringify(newComment));
        //         });
        //     });
        // })
        // socket.on('getGym', function(Thisgym) {
        //     console.log("Helloooooo");
        //     app.get("/chat", function(req, res) {
        //         console.log("test");
        //         mongoose.model('Posts').find({gym:Thisgym}).sort({
        //             date: -1
        //         }).exec(function(err, posts) {
        //             console.log(posts);
        //             if (err) {
        //                 console.log(err);
        //             } else {
        //                 res.render("chat", {
        //                     'newsfeed': posts
        //                 });
        //             }
        //         });
        //     })
        // });
    socket.on('newsfeed', function(msg) {
        var user = socket.request.session.passport.user;
        console.log('newsfeed');
        console.log(msg)
        io.emit('newsfeed', JSON.stringify(msg));
    });
})

/* TODO: Server-side Socket.io here */

http.listen(app.get("port"), function() {
    console.log("Express server listening on port " + app.get("port"));
});