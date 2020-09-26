import React, { useState } from 'react';
import { Comment } from 'antd';

const ChildComment = ({ comment, allComments }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  // add filter to find child comments (if parentID matches the ID of the overall comment, then add to childComments)
  const childComments = () => allComments.filter(child => child.parentID === comment.id)

  const like = (id) => {
    fetch("http://localhost:5000/updateAction?id=" + id + "&action=like");
  };

  const dislike = (id) => {
    fetch("http://localhost:5000/updateAction?id=" + id + "&action=dislike");
  };

  const addReply = (parentID) => {
    fetch("http://localhost:5000/submitReply?name=" + name + "&content=" + content + "&parentID=" + parentID);
  }

  return (
    <div>
      <Comment
        author={<h4>{comment.name}</h4>}
        content={
          <div>
            <p>Content: {comment.content}</p>
            <p>Likes: {comment.likes}</p>
            <p>Dislikes: {comment.dislikes}</p>
            <form onSubmit={() => like(comment.id)}>
              <button>
                like
              </button>
            </form>
            <form onSubmit={() => dislike(comment.id)}>
              <button>
                dislike
              </button>
            </form>
            <form onSubmit={() => addReply(comment.id)}>
              <input
                id="name"
                onChange={e => setName(e.target.value)}
                placeholder="Name">
              </input>
              <input
                id="content"
                onChange={e => setContent(e.target.value)}
                placeholder="Reply"
              ></input>
              <button type="submit">Reply</button>
            </form>
          </div>
        }
        datetime={comment.time}
      >
        {/* for each child, also map through its childComments to recursively map through children of the children, etc. */}
        {childComments().map(comment => {
          return (
            (
              < ChildComment
                key={comment.id}
                comment={comment}
                allComments={allComments}
              />
            ))
        })}
      </Comment>
    </div>
  )
}

export default ChildComment;