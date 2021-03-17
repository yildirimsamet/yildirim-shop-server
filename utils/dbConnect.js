const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose.connect(
    process.env.MONGO_URI,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    (err) => {
      if (err) console.log(err);
      console.log("DB Baglandı.");
    }
  );
};
module.exports = dbConnect;
