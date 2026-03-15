const mongoose = require("mongoose");

const dbConnect = async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/authDB");
        console.log("MongoDB connected");
    }catch(error){
        console.log("Error while connecting DB:", error);
        process.exit(1)
    }
}

module.exports = dbConnect;

