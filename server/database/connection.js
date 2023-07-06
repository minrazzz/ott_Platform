const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
   try {
      await mongoose.connect(
         "mongodb+srv://min:12345@cluster2.7bi6wzf.mongodb.net/",
         {
            useNewUrlParser: true,
            useUnifiedTopology: true,
         }
      );
      console.log("databaseConnected!!");
   } catch (error) {
      console.log(error);
   }
};
dbConnection();
