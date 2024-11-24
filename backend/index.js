const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const app = express();
const userRouter = require('./routes/user');
const hotelRouter = require('./routes/hotel');
const roomRouter = require('./routes/room')
const cityRouter = require('./routes/city')

const port = 8080;

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

// Cấu hình CORS trước khi định nghĩa các route
app.use(cors({
  origin: 'http://localhost:3000'  // Cho phép truy cập từ localhost:3000
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/user', userRouter);
app.use('/api/hotel', hotelRouter);
app.use('/api/room', roomRouter)
app.use('/api/city', cityRouter)

app.listen(process.env.PORT || port, () => 
  console.log(`Example app listening on port ${process.env.PORT || port}!`)
);
