const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

app.get("/hello", (req, res) => {
    res.send({ "hello": "hello world" })
});

app.listen(port, () => console.log(`Listening on port ${port}`));