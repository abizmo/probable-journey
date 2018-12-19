const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routes'));

app.listen(3000, () => {
  console.log('listening...');
});