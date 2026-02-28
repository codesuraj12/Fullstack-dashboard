import mongoose from "mongoose";

const taskschema =  new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    title :{

        type: String,
        required:true
    }
    
},
{ timestamps: true }

)

const Task = mongoose.model("Task", taskschema)
export default Task