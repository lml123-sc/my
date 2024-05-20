/*
 * @Author: 浮云<huangbo@cai-inc.com>
 * @Date: 2021-08-28 15:20:23
 * @LastEditTime: 2021-09-06 10:52:27
 * @LastEditors: 浮云<huangbo@cai-inc.com>
 * @Description:
 */
import { request } from 'antd';

const urls = {
  delete: '/kbs/api/materialDirectory/deleteDirectory', // 删除
  add: '/kbs/api/materialDirectory/create', // 添加
  edit: '/kbs/api/materialDirectory/updateDirectory', // 编辑
  fetchTreeData: '/kbs/api/materialDirectory/directory/list',
  reqMove: '/kbs/api/materialDirectory/directoryMove',
  manageTree: '/kbs/api/materialDirectory/directoryOperate',
};

export async function reqAdd(params) {
  return request(urls.add, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function fetchTreeData(params) {
  return request(urls.fetchTreeData, {
    params,
  });
}

export async function reqEdit(params) {
  return request(urls.edit, {
    params,
  });
}

export async function reqDelete(params) {
  return request(urls.delete, {
    params,
  });
}

export async function reqMove(params) {
  return request(urls.reqMove, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function manageTree(params) {
  return request(urls.manageTree, {
    params,
  });
}
