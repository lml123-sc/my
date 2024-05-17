import React, { useState } from "react";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import About from "../coms/About";
import Home from "../coms/Home";
import Counter from "../coms/Counter";
import { Layout, Menu, MenuProps } from "antd";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./index.less";

interface Layouts {}

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const Layouts = (props: any) => {
  const {} = props;

  return (
    <div style={{ height: '100%'}}>
      <Layout style={{ height: '100%'}}>
        <Layout.Header style={{ display: "flex", alignItems: "center" }}>
          <Header />
        </Layout.Header>
        <Layout.Content>
          <Layout style={{ display: 'flex', flexDirection: 'row' }}>
            <Sider width={200} style={{ height: '100%'}}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
                items={items2}
              />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/counter" element={<Counter />}></Route>
              </Routes>
            </Content>
          </Layout>
        </Layout.Content>
      </Layout>
    </div>
  );
};

export default Layouts;
