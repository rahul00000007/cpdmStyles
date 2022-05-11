const express = require("express");
const bodyParser = require("body-parser");
require("dotenv/config");
require("./startup/db")();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
require("./models/styles");
const cpdmRoute = require("./routes/cpdm");
app.use(cpdmRoute);
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
fs = require('fs')
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));
var port = Number(process.env.PORT || 3000);
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
});
module.exports = app;
/// Test the Swagger http://localhost:3000/api-docs/#/