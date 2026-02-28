import express from "express";
import { Userregistration,Loginuser } from "../controller/authcontroller.js";
import protect from "../middleware/authmiddleware.js";
import Task from "../models/Task.js";

const router = express.Router()

router.post('/register' ,Userregistration)

router.post('/login',Loginuser)

router.get('/profile',protect, async(req,res)=>{
    res.json(req.user)
})

// UPDATE profile
router.put("/profile", protect, async(req, res) => {
  try {
    const user = req.user;

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all tasks for logged in user
router.get("/tasks", protect, async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

// Create new task
router.post("/tasks", protect, async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    user: req.user._id,
  });
res.json(task)
})


// Delete task
router.delete("/tasks/:id", protect, async(req,res) => {


try {
  
  const task = await Task.findById(req.params.id);
if(!task){
  return res.status(404).json({message:'Task not Found'})
}

if(task.user.toString() !== req.user._id.toString()){
   return res.status(401).json({ message: "Not authorized" });
}
    await task.deleteOne();
 res.json({ message: "Task deleted" });

} catch (error) {
   res.status(500).json({ message: "Server Error" });
}

})

export default router