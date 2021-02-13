const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importing routes
const public = require('./router/public');

const app = express();

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

bodyParser.json(['text/JSON']);

const dbURL = '';
mongoose.connect(dbURL).then(app.listen(3000)).catch((error) => {
    console.log(error);
});

app.use(cors())

app.use('/public', public);
