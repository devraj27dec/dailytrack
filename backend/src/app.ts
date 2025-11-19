import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3000;

import AuthRoute from './routes/auth.route.js'
import TaskRoute from './routes/task.route.js'
import passport from './lib/passport.js';


app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use(passport.initialize())

app.get('/', (req:any, res:any) => {
  res.json('Hello, World!');
});


app.use('/auth' , AuthRoute)
app.use('/api/v1/task' , TaskRoute)




app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;