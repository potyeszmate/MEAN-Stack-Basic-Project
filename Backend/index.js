const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const path = require('path');


const app = express();

const port = 3000;
const dbUrl = 'mongodb+srv://potyeszmate:password1234@prf-claster.wbtvog6.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbUrl);

mongoose.connection.on('connected', () => {
    console.log('db is connected')
})

mongoose.connection.on('error', (err) => {
    console.log('error: ', err)
})

require('./example.model');
require('./player.model');
require('./user.model');

require('./bootstrap')();


const userModel = mongoose.model('users');

// middleware
app.use(expressSession({
    secret: 'prf2023szia',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    credentials: true
};
  
  app.use(cors(corsOptions));

  app.use(express.static(path.join(__dirname, 'public')));


passport.use('local', new LocalStrategy(async function(username, password, done) {
    try {
        const user = await userModel.findOne({ username: username });
        if (!user) return done(null, false, { message: 'User not found' });
        user.comparePassword(password, function(error, isMatch) {
            if (error) return done(error, false);
            if(!isMatch) return done(null, false, { message: 'Wrong password' });
            return done(null, isMatch);
        });
    } catch (err) {
        return done('hiba a lekeres soran', null);
    }
}));

passport.serializeUser(function(user, done) {
    if (!user) return done('nincs megadva beleptetheto user', null);
    return done(null, user);
})

passport.deserializeUser(function(user, done) {
    if (!user) return done('nincs kileptetheto user', null);
    return done(null, user);
})

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => {
    res.send('Hello World!!')
});

app.use('/', require('./routes'));

app.use((req, res, next) => {
    //console.log("hibakezelo");
    //res.status(404).send('A kert eroforras nem talalhato');
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
