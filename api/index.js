import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();

const PORT = 5000;
dotenv.config();
app.use(cors());

app.route('/').get((req, res) => {
  res.json({ message: 'Hello world' });
});

app.listen(PORT, () => console.log('Server is running'));
