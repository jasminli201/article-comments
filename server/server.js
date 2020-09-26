const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

const firebase = require("firebase");
const firebaseConfig = require("./firebase.json");
firebase.initializeApp(firebaseConfig);

function getTime() {
  var currentDate = new Date().toLocaleString()
  return currentDate;
}

app.get("/readAllComments", (req, res) => {
  var commentRef = firebase.database().ref('comments');
  commentRef.orderByChild("time").once("value", snapshot => {
    res.send(snapshot.val())
  });
})

app.get("/submitComment", (req, res) => {
  // documentation about commentRef.push:
  // generates a unique key based on a timestamp, so list items will automatically be ordered chronologically
  // no write conflicts will occur if multiple users add a comment at the same time
  let comment = {
    content: req.query.content,
    dislikes: 0,
    likes: 0,
    name: req.query.name,
    parentID: "",
    time: getTime(),
  }
  var ref = firebase.database().ref('comments');
  ref.push(comment)
    .then((snapshot) => {
      // add ID to make it easier to retrieve childComments
      ref.child(snapshot.key).update({ "id": snapshot.key })
    });
  res.send("submitted");
})

app.get("/submitReply", (req, res) => {
  let reply = {
    content: req.query.content,
    dislikes: 0,
    likes: 0,
    name: req.query.name,
    parentID: req.query.parentID,
    time: getTime(),
  }
  var ref = firebase.database().ref('comments');
  ref.push(reply)
    .then((snapshot) => {
      ref.child(snapshot.key).update({ "id": snapshot.key })
    });
  res.send("submitted");
})

app.get("/getComment", (req, res) => {
  var commentRef = firebase.database().ref('comments/' + req.query.id);
  commentRef.once("value", snapshot => {
    res.send(snapshot.val())
  });
})

app.get("/updateAction", (req, res) => {
  if (req.query.action == "like") {
    firebase.database()
      .ref('comments')
      .child(req.query.id)
      .child('likes')
      .set(firebase.database.ServerValue.increment(1))
  } else {
    firebase.database()
      .ref('comments')
      .child(req.query.id)
      .child('dislikes')
      .set(firebase.database.ServerValue.increment(1))
  }
  res.send("updated")
})

app.listen(port, () => console.log(`Listening on port ${port}`));