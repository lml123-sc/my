import React, { useEffect, useMemo, useState } from "react";
import { get, isEmpty } from "lodash";
import { Button, Menu } from "antd";
import { BrowserRouter as Router,Link } from "react-router-dom";

import { connect } from "dva";

const SubMenu = Menu.SubMenu;

const SiderMenu = (props) => {
  const { example, history } = props;
  const menu = example.menuList;
  const [init, setInit] = useState(false);
  const [menuState, setMenuState] = useState({
    defaultOpenKeys: String[""],
    defaultSelectedKeys: String[""],
  });

  useEffect(() => {
    if (menu.length > 0) {
      // 菜单数量大于 0 时，对菜单设置默认的展开和选中节点
      const hash = location.hash.slice(1).split("?")[0];
      menu.forEach((m, i) => {
        let children = get(m, "children", [{ title: "", href: "" }]);
        children = isEmpty(children) ? [] : children;
        children.forEach((c, j) => {
          if (c.href.includes(hash)) {
            setMenuState({
              defaultOpenKeys: [`${i}`],
              defaultSelectedKeys: [`${i}_${j}`],
            });
          }
        });
      });
      setInit(true);
    }
  }, [menu.length]);

  return (
    <Router>
      {menu.length > 0 && init && (
        <Menu
          style={{ width: 200 }}
          mode="inline"
          className="doc-menu"
          defaultOpenKeys={menuState.defaultOpenKeys}
          defaultSelectedKeys={menuState.defaultSelectedKeys}
        >
          {menu.map((item, index) => {
            return (
              <SubMenu
                key={index}
                title={
                  <span>
                    <span>{item.label}</span>
                  </span>
                }
              >
                {item.children.map((child, i) => (
                  <Menu.Item key={`${index}_${i}`}>
                    <Link to={child.href}>{child.label}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          })}
        </Menu>
      )}
    </Router>
  );
};

export default connect(({ example }) => ({
  example,
}))(SiderMenu);
