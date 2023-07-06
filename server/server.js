const express = require("express");
const app = express();
require("./database/connection");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const Router = require("./routes/userRoutes");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//Routes
app.use("/api/user", Router);

const PORT = 8000;
app.listen(PORT, () => {
   console.log("Server started", PORT);
});
