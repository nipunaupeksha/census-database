const express = require('express');
const bodyParser = require('body-parser');

const census = require('./Server/routes/census-routes');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,access-control-allow-origin");
  next();
});

app.use('/census', census);

app.listen(port, () => {
    console.log('Server started on port ' + port );
});

