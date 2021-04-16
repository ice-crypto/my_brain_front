import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { Tree } from 'antd';
import CollectionCreateForm from '../components/tree_modal'

class TreeUpdatableObj extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gData: props.gData,
      expandedKeys: ['0','0-0', '0-0-0', '0-0-0-0'],
      visible: false,
      target: '',
      removes:props.removes
    };
    this.onRightClick = this.onRightClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onCreate     = this.onCreate.bind(this);
    this.removeClick = this.removeClick.bind(this);
  }


  onDrop = info => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...this.state.gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      gData: data,
    });
  };

  onRightClick = info => {
    this.setState({
      target: info.node.key,
      visible: true
    });
  }

  onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  onCreate = (values) => {
    this.setState({visible: false});
    const data = [...this.state.gData];
    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    let insert_node;
    let targetObj;
    loop(data, this.state.target, (item, index, arr) => {
      targetObj = item
    });
    if ((targetObj.children || []).length == 0) {
      insert_node = [{title: values.node,key: targetObj.key+"-0"}]
      loop(data, targetObj.key, item => {
        item["children"] = insert_node;
      });
    }else{
      let size;
      loop(data, targetObj.key, (item, index, arr) => {
        size = item.children.length;
      });
      insert_node = {title: values.node,key: targetObj.key+"-"+size}
      loop(data, targetObj.key, item => {
        item.children.unshift(insert_node);
      });
    }
    this.setState({
      gData: data,
    });
  };

  removeClick = () => {
    const data = [...this.state.gData];
    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };

    loop(data, this.state.target, (item, index, arr) => {
      var tmp = this.state.removes
      tmp.push(item['value']);
      this.setState({removes:tmp});
      arr.splice(index,1);
    });
    this.setState({gData: data});
  }

  render() {
    return (
      <>
        <Tree
          className="draggable-tree"
          defaultExpandedKeys={this.state.expandedKeys}
          draggable
          blockNode
          defaultExpandAll
          onRightClick={this.onRightClick}
          onSelect={this.onSelect}
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
          treeData={this.state.gData}
        />
        <CollectionCreateForm
          visible={this.state.visible}
          onCreate={this.onCreate}
          onCancel={() => {
            this.setState({visible: false});
          }}
          onClick={this.removeClick}
          target={this.state.target}/>
      </>
    );
  }
}

export default TreeUpdatableObj
