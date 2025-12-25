const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth/authRoutes');

const app = express();
app.use(express.json());

app.use('/auth/api', authRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error connection", err));


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
})