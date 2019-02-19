require('dotenv').config();

var express = require('express');
var app = express();
var user = require('./controllers/usercontrollers');
var skin = require('./controllers/skincontroller');
var sequelize = require('./db');
var bodyParser = require('body-parser');

sequelize.sync();

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use('/user', user);
app.use(require('./middleware/validate-session'));
app.use('/skin', skin);

// app.use('/test', test);
// app.use('/api', api);
// user controller used here
// skin controller used here
// app.use('/api/log', log);

app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT}`));
