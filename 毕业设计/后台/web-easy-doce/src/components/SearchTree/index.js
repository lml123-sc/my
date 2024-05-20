import React, { useEffect } from "react";
import { Tree, Input, Modal, Form, message, Popover } from "antd";
import "./index.less";
import { get } from "lodash";
// import { reqDelete, reqEdit, fetchTreeData, reqAdd, reqMove, manageTree } from './services';
import { treeList } from "../../../mockData/mapTree";

const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

// id: 14
// name: "手册根目录"
// path: "14"
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children && node.children.length) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

@Form.create()
class SearchTree extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: "",
    autoExpandParent: true,
    showModal: false,
    isEdit: false,
    curData: {},
    treeData: [],
    showOperation: false,
    confirmLoading: false,
    expandPath: [],
    prevExpandPath: [],
    defaultSelectedKeys: [],
    defaultExpandedKeys: [],
    init: false,
  };

  async componentDidMount() {
    setTimeout(() => {
      window.addEventListener("hashchange", this.endManage);
      window.onbeforeunload = this.endManage;
    }, 100);
    const { getRootDirectory } = this.props;
    const treeData = await this.loadTreeData();
    getRootDirectory && getRootDirectory(treeData[0]);
    // 默认展开第一个节点，并选中
    const firstNodeId = get(treeData, "[0].id");
    const secondNodeId = get(treeData, "[0].children[0].id", firstNodeId);
    this.setState({
      expandedKeys: [String(firstNodeId)],
      defaultSelectedKeys: [String(secondNodeId)],
      init: true,
    });
    this.props.onInit && this.props.onInit(treeData);
  }

  componentWillUnmount() {
    setTimeout(() => {
      window.removeEventListener("hashchange", this.endManage);
      // window.onbeforeunload = null;
    }, 0);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { expandPath } = nextProps;
    const { prevExpandPath } = prevState;
    const params = {};
    const dataList = [];
    const generateList = (data, parentNode) => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.path;
        const newNode = { key, title: node.name, parentNode, path: node.path };
        dataList.push(newNode);
        if (node.children && node.children.length) {
          generateList(node.children, newNode);
        }
      }
    };
    generateList(prevState.treeData, undefined);
    params.dataList = dataList;
    if (expandPath && expandPath.length && prevExpandPath !== expandPath) {
      params.expandPath = expandPath;
      params.prevExpandPath = expandPath;
      const expandedKeys = [];
      let curNode = dataList.find((it) => it.path === expandPath[0]) || {};
      while (curNode.parentNode) {
        expandedKeys.unshift(curNode.parentNode.path);
        curNode = curNode.parentNode;
      }
      params.expandedKeys = expandedKeys;
    }
    return params;
  }

  componentDidUpdate(prevProps) {
    if (this.props.treeConfig.type !== prevProps.treeConfig.type) {
      this.loadTreeData();
    }
    if (this.props.onReload) {
      if (this.props.onReload.treeReload !== prevProps.onReload.treeReload) {
        this.loadTreeData();
      }
    }
  }

  // endManage = (e) => {
  //   const { showOperation } = this.state;
  //   const { treeConfig: { type } } = this.props;
  //   if (showOperation) {
  //     manageTree({
  //       onOrOff: 0,
  //       type,
  //     });
  //     const event = window.event || e;
  //     const label = '监测到文件夹未退出编辑模式,已尝试为您退出';
  //     event.returnValue = label;
  //     alert('监测到文件夹未退出编辑模式,已尝试为您退出');
  //     return label;
  //   }
  // };

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
      expandPath: [],
    });
  };

  // treeData gData
  onDrop = async (info) => {
    // const { treeData } = this.props.treeConfig || {};
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split("-");
    let operationTree = [];
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);
    // const dragNodesKeys = info.dragNodesKeys;
    const loop = (data, key, callback, parent) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr, parent);
        }
        if (item.children.length) {
          return loop(item.children, key, callback, item);
        }
      });
    };
    const data = JSON.parse(JSON.stringify(this.state.treeData));
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (info.dropToGap) {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr, parent) => {
        ar = arr;
        i = index;
        operationTree = parent;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    } else {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
        operationTree = item;
      });
    }

    // const { success, message: msg } = await reqMove({
    //   id: dragObj.id,
    //   parentId: operationTree.id,
    //   parentChildren: operationTree.children,
    // });
    // if (success) {
    //   this.loadTreeData();
    // } else {
    //   message.error(msg);
    // }
  };

  getOperations = (item) => {
    const { setFieldsValue } = this.props.form;
    const { type } = this.props.treeConfig;
    let operation = [];
    operation = [
      {
        label: "新建子目录",
        handleClick: (data) => {
          this.setState({
            showModal: true,
            isEdit: false,
            curData: data.dataRef,
          });
        },
      },
      {
        label: "编辑",
        handleClick: (data) => {
          this.setState(
            {
              showModal: true,
              isEdit: true,
              curData: data.dataRef,
            },
            () => {
              setFieldsValue({ name: data.dataRef.name });
            }
          );
        },
      },
      {
        label: "删除",
        handleClick: (data) => {
          const ref = Modal.confirm({
            title: "确认要删除吗?",
            closable: true,
            onOk: async () => {
              const { id } = data.dataRef;
              //   const { success, message: msg } = await reqDelete({
              //     id,
              //     type,
              //   });
              //   success ?
              //     // eslint-disable-next-line no-sequences
              //     (ref.destroy(), this.loadTreeData())
              //     : message.error(msg);
            },
          });
        },
      },
    ];
    // 根目录只有新建权限
    if (item.pid === 0) {
      operation = [
        {
          label: "新建子目录",
          handleClick: (res) => {
            this.setState({
              showModal: true,
              isEdit: false,
              curData: res.dataRef,
            });
          },
        },
      ];
    }
    // 格式树二级不可新建
    // if (this.props.treeConfig.type === '4' && item.pid !== 0) {
    //   operation = [
    //     {
    //       label: '编辑',
    //       handleClick: (res) => {
    //         this.setState(
    //           {
    //             showModal: true,
    //             isEdit: true,
    //             curData: res.dataRef,
    //           },
    //           () => {
    //             setFieldsValue({ name: res.dataRef.name });
    //           }
    //         );
    //       },
    //     },
    //     {
    //       label: '删除',
    //       handleClick: (data) => {
    //         const ref = Modal.confirm({
    //           title: '确认要删除吗?',
    //           closable: true,
    //           onOk: async () => {
    //             const { id } = data.dataRef;
    //             const { success, message: msg } = await reqDelete({
    //               id,
    //               type,
    //             });
    //             success ?
    //               // eslint-disable-next-line no-sequences
    //               (ref.destroy(), this.loadTreeData())
    //               : message.error(msg);
    //           },
    //         });
    //       },
    //     },
    //   ];
    // }
    return operation;
  };

  formatSearchedTitle = (item) => {
    const { searchValue, expandPath } = this.state;
    const PopoverContent = `${item.title}: ${item.id}`;
    if (expandPath && expandPath.length && item.path === expandPath[0]) {
      return (
        <Popover content={PopoverContent}>
          <span style={{ color: "#FF3030" }}>{item.title}</span>
        </Popover>
      );
    }
    const index = item.title.indexOf(searchValue);
    const beforeStr = item.title.substr(0, index);
    const afterStr = item.title.substr(index + searchValue.length);
    const title =
      index > -1 ? (
        <Popover content={PopoverContent}>
          <span>
            {beforeStr}
            <span style={{ color: "#FF3030" }}>{searchValue}</span>
            {afterStr}
          </span>
        </Popover>
      ) : (
        <Popover content={PopoverContent}>
          <span>{item.title}</span>
        </Popover>
      );
    return title;
  };

  renderTreeNodes = (data) => {
    console.log('==data==', data)
    const { expandedKeys } = this.state;
    return data.map((item) => {
      item.title = item.name || item.title;
      item.key = item.path || item.key;

      const popoverProps = {
        placement: "bottom",
        getPopupContainer: () => document.querySelector(".searchTree"),
      };
      const operations = this.getOperations(item);
      const title = this.formatSearchedTitle(item);
      const isFold = expandedKeys.indexOf(item.key) === -1;
      if (item.fileType === 1) {
        return (
          <TreeNode
            title={
              this.props.renderTitle ? this.props.renderTitle(item) : title
            }
            key={item.key}
            dataRef={item}
            popoverProps={popoverProps}
            showOperation={false}
            icon={
              <div
                className="easy-doc-iconfont easy-doc-icon-topic"
                style={{ color: "rgb(117,171,158)" }}
              />
            }
          />
        );
      }
      if (item.children) {
        return (
          <TreeNode
            title={
              this.props.renderTitle ? this.props.renderTitle(item) : title
            }
            key={item.key}
            dataRef={item}
            popoverProps={popoverProps}
            operation={operations}
            icon={
              <i
                className={`easy-doc-iconfont ${
                  isFold
                    ? "easy-doc-icon-wenjianjia"
                    : "easy-doc-icon-wenjianjia-zhankai"
                } folderColor`}
              />
            }
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={this.props.renderTitle ? this.props.renderTitle(item) : title}
          key={item.key}
          dataRef={item}
          popoverProps={popoverProps}
          operation={operations}
          icon={
            <i
              className={`easy-doc-iconfont ${
                isFold
                  ? "easy-doc-icon-wenjianjia"
                  : "easy-doc-icon-wenjianjia-zhankai"
              } folderColor`}
            />
          }
        />
      );
    });
  };

  onSearch = (value) => {
    if (value) {
      const expandedKeys = this.state.dataList
        .map((item) => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, this.state.treeData);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      this.setState({
        expandedKeys,
        searchValue: value,
        autoExpandParent: true,
        expandPath: [],
      });
    } else {
      this.setState({
        searchValue: value,
        expandPath: [],
      });
    }
  };

  handleOk = () => {
    const {
      form: { validateFields },
      treeConfig: { type },
    } = this.props;
    const { isEdit, curData } = this.state;
    validateFields(async (err, data) => {
      if (!err) {
      }
    });
  };

  handleCancel = () => {
    this.setState({
      showModal: false,
    });
  };

  loadTreeData = async () => {
    return treeList;
  };

  render() {
    const {
      autoExpandParent,
      expandedKeys,
      showModal,
      isEdit,
      treeData = treeList,
      showOperation,
      confirmLoading,
      init,
    } = this.state;
    const {
      headTitle,
      filterBtn,
      onSelect,
      supportOperation = true,
      //   form: { getFieldDecorator, setFieldsValue },
      //   treeConfig: { type },
      showSearch = true,
      showIcon = true,
      selectedKeys,
    } = this.props;
    const treeParams = selectedKeys ? { selectedKeys } : {};

    // const { treeData = [], ...resConfig } = treeConfig;
    const operation = [
      {
        label: "新建子目录",
        handleClick: (data) => {
          this.setState({
            showModal: true,
            isEdit: false,
            curData: data.dataRef,
          });
        },
      },
      {
        label: "编辑",
        handleClick: (data) => {
          this.setState(
            {
              showModal: true,
              isEdit: true,
              curData: data.dataRef,
            },
            () => {
              setFieldsValue({ name: data.dataRef.name });
            }
          );
        },
      },
      {
        label: "删除",
        handleClick: (data) => {
          const ref = Modal.confirm({
            title: "确认要删除吗?",
            closable: true,
            onOk: async () => {
              // const { id } = data.dataRef;
              // const { success, message: msg } = await reqDelete({
              //   id,
              //   type,
              // });
              // success ?
              //   // eslint-disable-next-line no-sequences
              //   (ref.destroy(), this.loadTreeData())
              //   : message.error(msg);
            },
          });
        },
      },
    ];
    return (
      <div className="searchTree">
        <div className="searchTree-head">
          {/* <span>{headTitle}</span> */}
          {/* {filterBtn} */}
        </div>
        <div className="searchTree-search">
          {/* {showSearch && ( */}
          <Search
            placeholder={this.props.searchPlaceholder || "搜索文件夹"}
            onChange={(e) => {
              this.onSearch(e.target.value);
            }}
            onSearch={this.onSearch}
            maxLength={50}
          />
          {/* )} */}
          {supportOperation && (
            <span
              className="setting"
              onClick={() => {
                manageTree({
                  onOrOff: showOperation ? 0 : 1,
                  type,
                }).then(({ success, message: msg }) => {
                  if (success) {
                    this.setState({ showOperation: !showOperation });
                  } else {
                    Modal.error({
                      content: msg,
                    });
                  }
                });
              }}
            >
              {/* <Icon type={showOperation ? "check" : "setting"} /> */}
            </span>
          )}
        </div>
        <>
          {init && (
            <Tree
              showIcon={showIcon}
              // showLine
              className="tree"
              onSelect={(_, e) => {
                onSelect &&
                  onSelect(
                    JSON.parse(JSON.stringify(e.selectedNodes[0].props.dataRef))
                  );
              }}
              showOperation={showOperation}
              operation={operation}
              // {...resConfig}
              disableCancelSelected
              onExpand={this.onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              noShowIcon
              draggable={showOperation}
              onDrop={this.onDrop}
              // defaultSelectedKeys={[type]}
              // {...treeParams}
              treeData={treeList}
            />
          )}
        </>

        {showModal && (
          <Modal
            visible={showModal}
            title={isEdit ? "编辑" : "新建"}
            okText="确定"
            onCancel={this.handleCancel}
            onOk={this.handleOk}
            closable={false}
            confirmLoading={confirmLoading}
          >
            <Form layout="horizontal">
              <FormItem label="文件夹名称" {...formItemLayout}>
                {getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "请输入" },
                    {
                      max: 50,
                      message: "最多输入50个字符",
                    },
                    {
                      validator: (rule, value, callback) => {
                        if (/\s+/.test(value)) {
                          callback("请不要输入空格");
                        } else {
                          callback();
                        }
                      },
                    },
                  ],
                })(<Input maxLength={50} />)}
              </FormItem>
            </Form>
          </Modal>
        )}
      </div>
    );
  }
}

export default SearchTree;
