import React from 'react';
import { Menu, Dropdown, Icon, message } from 'antd';
import { get } from 'lodash';
import { connect } from 'dva';
import './index.less';
// import { getLoginUrl } from 'src/utils/utils';

const Header = (props) => {
  const { commonInfo, dispatch } = props;
  const { userName = '' } = get(commonInfo, 'userInfo', {});

  const menu = (
    <Menu
      onClick={async ({ key }) => {
        if (key === '1') {

          // let target_url= getLoginUrl();

          // window.location.href = `/api/login/logout?target=${encodeURIComponent(
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
      <Dropdown
        menu
        getPopupContainer={() => document.querySelector('.doc-header')}
      >
        <a
          className="ant-dropdown-link"
          href="#"
          onClick={e => e.preventDefault()}
        >
          <div className="user-container">
            <div className="user-name" title={userName}>{userName}</div>
          </div>
          {/* <Icon type="down" /> */}
        </a>
      </Dropdown>
    </div>
  );
};

export default Header
