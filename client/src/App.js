import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  // useState is a hook that returns a pair: current state value and a function to update state
  // arg to useState is the initial state
  const [comments, setComments] = useState([]);

  async function fetchComments() {
    let response = await fetch("http://localhost:5000/readAllComments");
    response.json()
      .then(response => {
        // map through object of objects to turn it into array of objects
        var commentsArray = Object.keys(response).map(key => {
          return response[key];
        })
        setComments(commentsArray);
      });
  }

  // useEffect adds ability to perform side effects from a function component
  // same as componentDidMount, update and unmount -> into one API
  // runs after flushing changes to the DOM
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* map through array of objects to display each comment's content */}
        {comments.map(comment => {
          return (
            <div>
              <p>Time: {comment.time}</p>
              <p>Content: {comment.content}</p>
              <p>Likes: {comment.likes}</p>
              <p>Dislikes: {comment.dislikes}</p>
              <p>Replies: {comment.replies}</p>
            </div>
          )
        })}
      </header>
    </div>
  );
}

export default App;
