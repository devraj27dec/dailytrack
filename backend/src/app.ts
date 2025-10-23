import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const PORT = process.env.PORT || 3000;
// import UserRoute from './routes/user.route.js'
// import TaskRoute from './routes/task.route.js'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req:any, res:any) => {
  res.json('Hello, World!');
});

// app.use('/api/v1/user', UserRoute)
// app.use('/api/v1/task' , TaskRoute)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


export default app;