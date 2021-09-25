const express = require('express');
const path = require('path');
const routes = require('./controllers/index');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

// Establish sequelize connection
const sequelize = require('./config/connection');

// Import express session and create new SequelizeStore
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Create session and link to SequelizeStore
const sess = {
    secret: 'Super secret secret',
    cookie: {
        // Set session to expire after 1 hour
        maxAge: 3600000
    },
    resave: false,
    saveUnitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// Set handlebars as default template engine
const hbs = exphbs.create({helpers});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Connect HTML to CSS and JS files
app.use(express.static(path.join(__dirname, 'public')));
// Connect to controllers folder
app.use(routes);

sequelize.sync().then(()=>{
    app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
});