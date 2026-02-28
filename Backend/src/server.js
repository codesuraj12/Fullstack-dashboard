import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/authroutes.js';
import cors from 'cors'


const app = express()

dotenv.config();
connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/auth' , router)

const PORT= process.env.PORT || 3000


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
