const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.set('view engine', 'ejs');
// Serve static files
app.use("/public", express.static("public"));

// Your routes
app.use("/api/v1", require("./routes/index"));


// Error handling middleware
app.use((err, req, res, next) => {
  if(err){
    return res.status(500).json({ message: "خطایی رخ داده است", error: err.message });
  } else {
    return res.status(404).json({ message: "آدرس یافت نشد" });
  }
});

module.exports = app;
