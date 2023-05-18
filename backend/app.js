require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./Routes/router");
const app = express();
const port = 5000;
require("./db/connection");
require("./models/user");


app.use(cors());
app.use(express.json());

app.use(router);


app.listen(port,()=>{
    console.log("Server started on port " + port);
});