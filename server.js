const path = require('path');
const express = require('express');
const session = require('express-session'); //without database linked on line 9
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store); //object returned by the require did not have session.store until we passed it. We are passing a paramater to connect-sessoion-sequelize

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = { //configuring how the sessions will be created
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ //telling the session library where to save session details permanently - in sequelize
    db: sequelize
  })
};

//session is data in server-side and cookies are data in the browser
//session is an object that stores details about the user experience - stored in the server
//cookies is just a file stored and managed by the browser - key value pairs inside. key name - value Mariah, DOB key - value 1993. Cookies are created by the server and kept by the browser

//Together they work. Inside the cookie is the session and the session ID
//Every request from browser to the server will go have the cookie and the cookie will contain the session data and the server responds accordinly.

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
