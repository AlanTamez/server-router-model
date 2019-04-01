const express = require('express');
const app = express();

//Body parser es para que pueda ser utilizado correctamente los post
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const uuid = require('uuid');
//Router
const blogRouter = require('./router')

app.use('/blogs/api', jsonParser, blogRouter);

//port 8080 pero se puede poner cualquiera
app.listen(8080, () => {
  console.log('Your app is running in port 8080');
});