const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require('cookie-parser')
const connectDB = require("./src/database/db");
const session = require('express-session')
const passport = require('./src/middleware/passportMiddleware')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

//swagger docs settings
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ProjectX",
      version: "1.0.0",
      description: "An api for projectX"
    },
    servers: [
      {
        url: 'https://projectx-f5wv.onrender.com',
        description: "Staging Server"


      },
      {
        //update to production url
       url: 'http://localhost:8000',
        description: "Development Server"

      }
     
    ]
  },
  apis: ["./src/routes/*.js"]
};

const specs = swaggerJsDoc(options)
 




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
    res.status(200).json({
      message: 'welcome to projectX api',
      docroute: 'go to /api/docs for api documentation'
    })
  })

//routes
app.use('/api/user', userRoutes);
//swagger docs route
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs))



//PORT
const PORT = process.env.PORT || 8000;


// Listen to our routes
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});