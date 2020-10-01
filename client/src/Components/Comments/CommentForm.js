import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const { TextArea } = Input;
const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 22 },
};

function CommentForm() {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    fetch("http://localhost:5000/submitComment?name=" + name + "&content=" + content);
    window.location.reload();
  }

  return (
    <div >
      <h2>Any thoughts?</h2>
      <Form
        {...layout}
        onFinish={() => handleSubmit()}
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
          label="Comment"
          name="comment"
          rules={[{ required: true, message: 'Please input your comment!' }]}
        >
          <TextArea
            rows={4}
            id="content"
            onChange={e => setContent(e.target.value)}
          ></TextArea>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Comment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CommentForm;
