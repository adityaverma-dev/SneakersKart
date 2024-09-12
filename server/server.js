const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');
const passport = require('passport')
const { jwtAuthStrategy } = require('./middleware/passport')
const { handleError, ConverttoapiError } = require("./middleware/apiError")


//mongodb+srv://admin:<password>@cluster0.6jpvg0o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const mongoURI = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority&appName=Cluster0`;


mongoose.connect(mongoURI)

app.use(express.json());

/// sanitize
app.use(xss())
app.use(mongoSanitize());

//passport
app.use(passport.initialize());
passport.use('jwt', jwtAuthStrategy);

///routes

app.use('/api', routes)

//Handle erros
app.use(ConverttoapiError);
app.use((err, req, res , next) => {
  handleError(err, res)
})



app.use(express.static('client/build'));
if(process.env.NODE_ENV === 'production'){
const path = require('path');
app.get('/*', (req,res) =>{
res.sendFile(path.resolve(__dirname,'../client', 'build', 'index.html'))
});
}

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})