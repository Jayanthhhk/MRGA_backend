const express = require('express')
const app = express()
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const vendorRoutes = require('./routes/vendorRoutes')
const bodyParser = require('body-parser')
const firmRoutes = require('./routes/firmRoutes')
const ProductRoutes = require('./routes/ProductRoutes')
const path = require('path')


const PORT = process.env.PORT || 4000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
  console.log('MongoDB connected')
})
  .catch((err)=>{
  console.log('MongoDB connection error:', err)
})

app.use(bodyParser.json())
app.use('/vendor',vendorRoutes)
app.use('/firm',firmRoutes)
app.use('/product',ProductRoutes)
app.use('/uploads',express.static(`uploads`))


app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})

app.use('/',(req,res)=>{
  res.send('Hello from home')
})