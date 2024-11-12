const mongoose = require("mongoose");
mongoose
  .connect('mongodb://localhost:27017/DACS2')
  .then(() => console.log('DB connection successful!')).catch(err=>{
    console.log(err)
  });
//VM
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/DACS2')
.then(() => console.log('DB connection successful!'))
.catch(err => console.log(err));

  // mongoose.connect('mongodb://192.168.101.23:27017/DACS2')
  // .then(() => console.log('DB connection successful!'))
  // .catch(err => console.log(err));