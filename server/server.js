const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

const firebase = require("firebase");
const firebaseConfig = require("./firebase.json");
firebase.initializeApp(firebaseConfig);

app.get("/readAllComments", (req, res) => {
    var comments = firebase.database().ref('comments');
    comments.on("value", snapshot => {
        res.send(snapshot.val())
    });
})

app.listen(port, () => console.log(`Listening on port ${port}`));