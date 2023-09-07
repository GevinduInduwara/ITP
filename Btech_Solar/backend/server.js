require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')
const repairsRoutes = require('./routes/repairs')
const projectRouter = require("./routes/projects.js");
const employeeRouter = require("./routes/Employee");
const inventoryRoutes =require('./routes/inventory')
const promotionRouter = require("./routes/Promotions.js");
const postRoutes = require('./routes/posts');

const cors = require('cors');

// express app
const app = express()

// middleware
app.use(cors());
app.use(express.json({limit: '5mb'}))

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/repairs', repairsRoutes)
app.use("/project",projectRouter);
app.use("/employee",employeeRouter);
app.use('/api/inventory',inventoryRoutes)
app.use("/promotion",promotionRouter);
app.use(postRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })