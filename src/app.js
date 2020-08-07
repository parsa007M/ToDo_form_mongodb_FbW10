// ! Requirement: ===============================================

const express = require('express');
const path = require('path');

const app = express();

// Route:
const indexRoutes = require('./routes/index');

// ! Settings: ===============================================

// Setting:
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

// Middlewares:
app.use(express.urlencoded({extended:false}))

// ! Map your path & Route: =====================================
// Use Routes:
app.use('/', indexRoutes);

// ! listen Port: ===============================================
// Port
app.listen(4000);