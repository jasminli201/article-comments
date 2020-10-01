import React, { useState } from 'react';
import { Form, Input, Modal, Comment, Button, Tooltip } from 'antd';
import { LikeTwoTone, DislikeTwoTone } from '@ant-design/icons';
import "./ChildComment.css";

const { TextArea } = Input;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const tailLayout = {
  wrapperCol: { offset: 5, span: 19 },
};

const ChildComment = ({ comment, allComments }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  // visible is for the modal
  const [visible, setVisible] = useState(false);

  // add filter to find child comments (if parentID matches the ID of the overall comment, then add to childComments)
  const childComments = () => allComments.filter(child => child.parentID === comment.id)

  // for like and dislike  
  const like = (id) => {
    fetch("http://localhost:5000/updateAction?id=" + id + "&action=like");
    window.location.reload();
  };
  const dislike = (id) => {
    fetch("http://localhost:5000/updateAction?id=" + id + "&action=dislike");
    window.location.reload();
  };

  const addReply = (parentID) => {
    fetch("http://localhost:5000/submitReply?name=" + name + "&content=" + content + "&parentID=" + parentID);
    window.location.reload();
    setVisible(false);
  }

  return (
    <div>
      <Comment
        author={<h3>{comment.name}</h3>}
        content={
          <div>
            <p>{comment.content}</p>
            <div id="action">
              <Button type="primary" onClick={() => setVisible(true)}>Reply</Button>
              <Modal
                title="Reply to"
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={[null]}
              >
                <Form
                  {...layout}
                  onFinish={() => addReply(comment.id)}
                >
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                  >
                    <Input
                      onChange={e => setName(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Reply"
                    name="reply"
                    rules={[{ required: true, message: 'Please input your reply!' }]}
                  >
                    <TextArea
                      rows={4}
                      id="content"
                      onChange={e => setContent(e.target.value)}
                    ></TextArea>
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Reply
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
            <Form
              id="action"
              onFinish={() => like(comment.id)} >
              <Form.Item>
                < Tooltip title="like">
                  <Button htmlType="submit" shape="circle" icon={<LikeTwoTone />} />
                </Tooltip>
                {comment.likes}
              </Form.Item>
            </Form>
            <Form
              id="action"
              onFinish={() => dislike(comment.id)} >
              <Form.Item>
                < Tooltip title="dislike">
                  <Button htmlType="submit" shape="circle" icon={<DislikeTwoTone />} />
                </Tooltip>
                {comment.dislikes}
              </Form.Item>
            </Form>
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