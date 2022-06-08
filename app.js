const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const userRoute = require('./routes/user');
const newBlogRoute = require('./routes/newBlog');
const blogRoute = require('./routes/blog');
const blogPageRoute = require('./routes/blogPage');

//connecting database
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));


  //Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Home Route
app.get('/', (req, res)=>{
    res.send('this is home');
});

//Route middleware
app.use('/', userRoute);
app.use('/', newBlogRoute)
app.use('/', blogRoute);
app.use('/', blogPageRoute);

//error middleware
app.use(errorHandler);

//server production assets
// if(process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join("Frontend/build")))
// }

app.get('*', (req, res)=> {
  res.sendFile(path.resolve(__dirname, 'Frontend', 'build', 'index.html'))
});


const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`App running on port ${port}`);
});