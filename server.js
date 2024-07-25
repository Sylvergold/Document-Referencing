 require ('dotenv').config();
 const express = require("express");
 const mongoose = require("mongoose");
const router= require('./router/router')
 const PORT = process.env.PORT;
 const url = process.env.URL;

 const app = express();
 app.use(express.json());
app.use("/api/v1/",router)

 app.listen(PORT, () => {
     console.log(`Server is listening to ${PORT}`);
 });

mongoose.connect(url).then(() => {
     console.log('Database connected successfully');

 }).catch((error) => {
     console.log('Error connecting to database:', error.message);
     });
