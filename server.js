require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => {
    app.emit('pronto');
})
.catch(e => console.log(e));

const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const flash = require('connect-flash');


const port = 3000;
const routs = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "default-src": ["'self'"],
            "script-src": ["'self'", "https://cdn.jsdelivr.net"],
            "style-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
            "connect-src": ["'self'", "https://cdn.jsdelivr.net"],
            "font-src": ["'self'", "https://cdn.jsdelivr.net"],
            "img-src": ["'self'", "data:"]
        }
    }
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'aksfjklajflnlfalfjkd qlq akdls adjkajfdhjasq as',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routs);

app.on('pronto', () => {
    app.listen(port, () =>{
        console.log('Acessar http://localhost:3000');
        console.log(`Example app listening on port ${port}`);
    });
})
