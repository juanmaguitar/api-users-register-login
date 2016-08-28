const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const port = process.env.PORT || 8080;
const app = express();

const dbURI = 'mongodb://localhost/test';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// pretty print json output
app.set('json spaces', 2);

// log all requests to the console
app.use(morgan('dev'));

require('./db')(dbURI);

//app.get('/', (req, res) => res.send('Welcome to the home page!'));
app.get('/', (req, res) => {
  res.json({ hello: 'world' })
})


app.get('/api', (req, res) => res.json({ message: 'hooray! welcome to our api!' }));

require('./models');
app.use('/api', require('./routes/users'));

// don't listen in test mode
if (require.main === module) {
  app.listen(port, () => console.log(`Magic happens on port ${port}`));
} else {
  console.log("testing mode...")
}

module.exports = app
