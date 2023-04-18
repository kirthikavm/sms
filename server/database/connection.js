const mongoose = require('mongoose');
const connectDB = async()=>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("Db connected successfully");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
module.exports=connectDB;