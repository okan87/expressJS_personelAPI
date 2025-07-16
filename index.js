"use strict";

/* --------------------------------
! EXPRESSJS - PERSONELAPI PROJECT
-------------------------------- */
require('dotenv').config();
require('express-async-errors');
const express = require('express');
const dbConnection = require('./src/configs/dbConnection');
const errorHandler = require('./src/middlewares/errorHandler');
const jwtAuthMiddleware = require('./src/middlewares/jwtAuthMiddleware');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 8000;


// HTTP request logger
app.use(morgan('dev'));

// JSON parser middleware
app.use(express.json());

// Searching&Sorting&Pagination:
app.use(require('./src/middlewares/findSearchSortPage'))



// Root endpoint
app.all('/', (req, res) => {
  // JWT varsa, kullanıcı bilgisi ve login durumu döndür
  let isLogin = false;
  let user = null;
  // Authorization header kontrolü
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = require("jsonwebtoken").verify(token, process.env.ACCESS_KEY, {
        algorithms: ["HS256"],
      });
      isLogin = true;
      user = decoded;
    } catch (err) {
      // Token geçersizse login false kalır
    }
  }
  res.send({
    error: false,
    message: "Welcome to Personel API",
    isLogin,
    user
  });
});

//Routes
app.use('/departments', jwtAuthMiddleware, require('./src/routes/department.router'))
app.use('/personnels', jwtAuthMiddleware, require('./src/routes/personnel.router'))
app.use('/auth', require('./src/routes/auth.router'))


// Centralized error handler (should be last middleware)
app.use(errorHandler);



// Connect to DB and start server
dbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running http://127.0.0.1:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to DB:", err.message);
        process.exit(1);
    });

