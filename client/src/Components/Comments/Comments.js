import React, { useEffect, useState } from 'react';
import ChildComment from "./ChildComment.js";

function Comments() {
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
        commentsArray.reverse();
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
    <div>
      {/* map through array of objects to display each comment and its childComments */}
      {comments.map(comment => {
        return (
          comment.parentID == "" ? (
            <div>
              <ChildComment key={comment.id} comment={comment} allComments={comments} />
            </div>
          )
            : <div>
            </div>
        )
      })}
    </div >
  );
}

export default Comments;
