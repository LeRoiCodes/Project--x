const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require('cookie-parser')
const connectDB = require("./src/database/db");
const session = require('express-session')
const passport = require('./src/middleware/passportMiddleware')

// Initialize Express
const app = express();
const userRoutes = require('./src/routes/userRoutes');


// connect to database
connectDB();


app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

  app.use(passport.initialize());

  app.get('/', (req, res) => {
    res.send('welcome to projectX use /api/user to make your auth calls')
  })

//routes
app.use('/api/user', userRoutes);



//PORT
const PORT = process.env.PORT || 8000;


// Listen to our routes
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});