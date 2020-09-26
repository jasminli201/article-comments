import React, { useState } from 'react';

function CommentForm() {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    fetch("http://localhost:5000/submitComment?name=" + name + "&content=" + content);
  }

  return (
    <div >
      <h2>Any thoughts?</h2>
      <form onSubmit={() => handleSubmit()}>
        <input
          id="name"
          onChange={e => setName(e.target.value)}
          placeholder="Name"
        ></input>
        <input
          id="content"
          onChange={e => setContent(e.target.value)}
          placeholder="Comment"
        ></input>
        <button type="submit">Comment</button>
      </form>
    </div>
  );
}

export default CommentForm;
