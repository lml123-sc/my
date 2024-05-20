import React, { useState } from "react";
import Header from "./Header";
import About from "../components/About";
import Home from "../components/Home";
import Counter from "../components/Counter";
import { Layout, Menu, MenuProps } from "antd";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.less";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SiderMenu from "./Sider";
import TabMaterialLibrary from "../routes/TabMaterialLibrary/index";

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
  const { history } = props;

  return (
    <div style={{ height: "100%" }}>
      <Layout style={{ height: "100%" }}>
        <Layout.Header style={{ display: "flex", alignItems: "center" }}>
          <Header />
        </Layout.Header>
        <Layout.Content>
          <Layout style={{ display: "flex", flexDirection: "row" }}>
            <Sider width={200} style={{ height: "100%" }}>
              <SiderMenu history={history} />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Router>
                <Routes>
                  <Route path="/" element={< TabMaterialLibrary/>}></Route>
                </Routes>
              </Router>
            </Content>
          </Layout>
        </Layout.Content>
      </Layout>
    </div>
  );
};

export default Layouts;
