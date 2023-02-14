import express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

import dotenv from 'dotenv';
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use('/posts',postRoutes);
app.use('/user',userRoutes);


dotenv.config();

// const CONNECTION_URL = 'mongodb+srv://jisnu:abcd123456@cluster0.opblgdt.mongodb.net/?retryWrites=true&w=majority';
// const CONNECTION_URL='mongodb://localhost:27017';
 const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);