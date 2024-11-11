const mongoose = require("mongoose");
mongoose
  .connect('mongodb://localhost:27017/DACS2')
  .then(() => console.log('DB connection successful!')).catch(err=>{
    console.log(err)
  });