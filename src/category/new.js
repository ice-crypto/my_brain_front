import React, { Component } from 'react';
import axios from 'axios';
import { csrfToken } from 'rails-ujs'
import { Button } from 'antd'
import 'antd/dist/antd.css';
import TreeAddableObj from '../components/tree_addable';
import RootNode from '../components/root_node';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class CategoryNew extends Component{
  constructor() {
    super();
    this.state = {
      gData: [],
      isShow: false
    }
    this.postCategories = this.postCategories.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }
  onFinish = (values: any) => {
    console.log('Success:', values);
    this.setState({gData:[{title: values.root_node, key:'0-0'}]})
    this.setState({isShow: true});
    console.log(this.state.gData);
  };
  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  handleButton() {
    this.postCategories();
    console.log("handleButton");
  }
  postCategories(event) {
    axios.defaults.baseURL = 'http://127.0.0.1:3000';
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
    axios({
      method : "POST",
      url : "/api/v1/categories",
      data : {category: {data: this.state.gData}}
    })
    .then((response)=> {
      console.log(response);
    })
    .catch((error)=> {
      console.error(error);
    });
  }
  render() {
    let TreeAdd;
    if (this.state.isShow) {
      TreeAdd = <TreeAddableObj gData={this.state.gData}/>;
    }
    return(
      <>
        <RootNode onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}/>
        {TreeAdd}
        <Button
          type="primary"
          onClick={this.handleButton}
        >
          Post Categories
        </Button>
        <p>category new</p>
      </>
    )
  }
}
export default CategoryNew
