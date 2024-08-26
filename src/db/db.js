const mongoose = require('mongoose')

const dbConnect = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB Connection Successfull ");
    } catch (error) {
        console.log("DB Connection Failure : "+ error);
    }
}

module.exports = dbConnect