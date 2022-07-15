require("dotenv").config();

const express = require("express");
const workouts = require("./routes/workoutroute");
const mongoose = require("mongoose");
var cors = require("cors");


// express app
const app = express();
app.use(cors());


// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workouts);

//connect db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(" connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// listen for requests
