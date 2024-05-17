import React, { useEffect, useMemo, useState } from "react";
import { get, isEmpty } from "lodash";
import { Menu } from "antd";
// import { Link } from "dva/router";
import { Link } from "react-router-dom";
// import { connect } from "dva";
// import { useSetState } from "ahooks";

const SubMenu = Menu.SubMenu;

const SiderMenu = ({ menu = [] }) => {
  const [init, setInit] = useState(false);
  const [menuState, setMenuState] = useSetState({
    defaultOpenKeys: [],
    defaultSelectedKeys: [],
  });

  useEffect(() => {
    if (menu.length > 0) {
      // 菜单数量大于 0 时，对菜单设置默认的展开和选中节点
      const hash = location.hash.slice(1).split("?")[0];
      menu.forEach((m, i) => {
        let children = get(m, "children", []);
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
    <>
      {menu.length > 0 && init && (
        <Menu
          style={{ width: 200 }}
          mode="inline"
          className="doc-menu"
          defaultOpenKeys={menuState.defaultOpenKeys}
          defaultSelectedKeys={menuState.defaultSelectedKeys}
        >
          {menu.map((item, index) => {
            const { title, children = [], icon, href = "" } = item;
            if (children && children.length) {
              return (
                <SubMenu
                  key={index}
                  title={
                    <span>
                      <span className={`easy-doc-iconfont easy-doc-icon-${icon}`} />
                      <span>{title}</span>
                    </span>
                  }
                >
                  {children.map((child, i) => (
                    <Menu.Item key={`${index}_${i}`}>
                      <Link to={child.href}>{child.title}</Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            }
            return (
              <Menu.Item key={index}>
                {href ? (
                  <Link to={href}>
                    <span className={`easy-doc-iconfont easy-doc-icon-${icon}`} />
                    <span>{title}</span>
                  </Link>
                ) : (
                  <>
                    <span className={`easy-doc-iconfont easy-doc-icon-${icon}`} />
                    <span>{title}</span>
                  </>
                )}
              </Menu.Item>
            );
          })}
        </Menu>
      )}
    </>
  );
};

export default SiderMenu
