
import mongoose from "mongoose";

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongo connected successfull')
    } catch (error) {
        console.error(error)
    }
}

export default connectDb;