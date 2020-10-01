import React, { useState } from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

function Navbar() {
  const [current] = useState("");

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[current]}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Trending</Menu.Item>
          <Menu.Item key="3">Articles</Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
}

export default Navbar;
