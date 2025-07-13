"use strict";

/* --------------------------------
! EXPRESSJS - PERSONELAPI PROJECT
-------------------------------- */
require('dotenv').config();
require('express-async-errors');
const express = require('express');
const dbConnection = require('./src/configs/dbConnection');
const errorHandler = require('./src/middlewares/errorHandler');
const app = express();
const PORT = process.env.PORT || 8000;

// JSON parser middleware
app.use(express.json());

// Searching&Sorting&Pagination:
app.use(require('./src/middlewares/findSearchSortPage'))



// Root endpoint
app.all('/', (req, res) => {
    
    res.send('Personel API-canimsin');
    
});

//Routes
app.use('/departments', require('./src/routes/department.router'))
app.use('/personnels', require('./src/routes/personnel.router'))


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

