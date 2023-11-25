const express = require("express");
const quesRoutes = require("./routes/quesRoutes"); 
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api",quesRoutes);

// global error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "something went wrong!",
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening at port ${PORT}...`);
});
