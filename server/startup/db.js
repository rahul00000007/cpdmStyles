const mongoose = require("mongoose");

module.exports = function () {
  mongoose.connect(
    "mongodb+srv://Rahul:u8DPPIjGA56Vqv3G@cluster0.myhem.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("connected to db");
      }
    }
  );
};
