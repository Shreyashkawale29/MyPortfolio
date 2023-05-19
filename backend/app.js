require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/connection");
// const router = require("./Routes/router");
const port = 5000;


app.use(cors());
app.use(express.json());

// app.use(router());


app.listen(port,()=>{
    console.log("Server started on port " + port);
});