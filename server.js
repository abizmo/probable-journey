const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routes'));

app.listen(PORT, () => {
  console.log('listening...');
});