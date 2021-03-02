import React, { Component } from 'react';
import 'antd/dist/antd.css';
import TreeAddableObj from '../components/tree_addable';

const gData = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        disabled: true,
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
            disableCheckbox: true
          },
          {
            title: "leaf",
            key: "0-0-0-1"
          },
        ]
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: (
              <span
                style={{
                  color: "#1890ff"
                }}
              >
                sss
              </span>
            ),
            key: "0-0-1-0"
          }
        ]
      }
    ]
  }
];

class CategoryNew extends Component{
  constructor() {
    super();
  }
  render() {
    return(
      <>
        <TreeAddableObj gData={gData}/>
        <p>category new</p>
      </>
    )
  }
}
export default CategoryNew
