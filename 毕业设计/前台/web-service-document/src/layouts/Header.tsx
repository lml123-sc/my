import React from 'react';
import { Menu, Dropdown, message } from 'antd';
import { get } from 'lodash';
// import { connect } from 'dva';
// import { getLoginUrl } from 'src/utils/utils';

const Header = (props: any) => {
  const { commonInfo, dispatch } = props;
  const { userName = '' } = get(commonInfo, 'userInfo', {});

  const menu = (
    <Menu
      onClick={async ({ key }) => {
        if (key === '1') {

          // let target_url= getLoginUrl();

          // location.href = `/api/login/logout?target=${encodeURIComponent(
          //   target_url
          // )}`;
          // const { success, message: msg } = await dispatch({
          //   type: 'commonInfo/logout',
          // });
          // if (success) {
          //   location.href = getLoginUrl();
          // } else {
          //   message.error(msg);
          // }
        }
      }}
    >
      <Menu.Item key="0">修改信息</Menu.Item>
      <Menu.Item key="1">退出登入</Menu.Item>
    </Menu>
  );
  return (
    <div className="doc-header">
      <span className="easy-doc-iconfont easy-doc-icon-touxiang" />
      123
      <Dropdown
        overlay={menu}
        // getPopupContainer={() => document.querySelector('.doc-header')}
      >
        <a
          className="ant-dropdown-link"
          href="#"
          onClick={e => e.preventDefault()}
        >
          <div className="user-container">
            <div className="user-name" title={userName}>{userName}</div>
          </div>
        </a>
      </Dropdown>
    </div>
  );
};
/**
 * 原始逻辑：在登录页登陆成功后，将用户信息保存在 localStorage 中，再进行跳转页面。这样刷新页面时，用户信息必定存在。
 * 现在没有使用项目中的登录页，使用采云学院的登陆页，改为在 dva 中进行请求并保存，在 header 中使用。
 */
export default Header

