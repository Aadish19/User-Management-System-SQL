const express = require('express')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser') //it helps parsing json data through forms
const mysql = require('mysql');
const bodyParser = require('body-parser');

require('dotenv').config(); // center place for all credentials

const app = express();

const port = process.env.PORT || 5000;

// parsing Middleware
//Parse application/x--www-form-urlencoded
app.use(bodyparser.urlencoded({extended:false}))

//Parse Application/json
app.use(bodyParser.json());

app.use(express.static('static'))

// Templating Engine
app.engine('hbs',exphbs.engine({extname:'.hbs'}));
app.set('view engine','hbs');



const routes = require('./server/routes/users')
app.use('/',routes);

app.listen(port,(err)=>{
    if(err){console.error("Error in starting the server")}
    console.log(`Listening on port ${port}`);
})