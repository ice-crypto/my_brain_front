import React, { Component } from 'react';
import axios from 'axios';
import { csrfToken } from 'rails-ujs'
import { Button, Select, Tabs} from 'antd'
import 'antd/dist/antd.css';
import TreeAddableObj from '../components/tree_addable';
import TreeUpdatable from '../components/tree_updatable';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const { TabPane } = Tabs;

class CategoryEdit extends Component{
  constructor() {
    super();
    axios.defaults.baseURL = 'http://stagingaccessoryriver.net';
    this.getCategories = this.getCategories.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
    this.onRootSelectChange = this.onRootSelectChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.state = {
      gData: [],
      removes: [],
      isShow: false
    }
  }
  handleButton() {
    this.postCategories();
    console.log("handleButton");
  }
  onFinish = (values: any) => {
    this.setState({gData:[{title: values.root_node, key:'0-0'}]})
    this.setState({isShow: true});
    console.log(this.state.gData);
  };
  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  onRootSelectChange(value) {
    console.log(value);
    axios.get(`/api/v1/categories/${value}`)
      .then(res => {
        this.setState({isShow:true,gData:res.data});
        console.log(this.state.gData);
      }).catch(err => {
        console.log('err:', err);
    });
  }
  getCategories() {
    axios.get(`/api/v1/categories`)
      .then(res => {
        console.log(res.data);
        let tmp = [];
        res.data.forEach(node => tmp.push({value:node.id,label:node.title}))
        this.setState({categories: tmp});
      }).catch(err => {
        console.log('err:', err);
    });
  }
  postCategories(event) {
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
    axios({
      method : "POST",
      url : `/api/v1/categories/update_recursive`,
      data : {category: {data: this.state.gData,removes: this.state.removes}}
    })
    .then((response)=> {
      console.log(response);
    })
    .catch((error)=> {
      console.error(error);
    });
  }
  componentDidMount() {
    this.getCategories();
  }
  render() {
    let TreeAdd;
    if (this.state.isShow) {
      TreeAdd = <TreeUpdatable gData={this.state.gData} removes = {this.state.removes} visible={this.state.isShow}/>;
    }
    return(
      <>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a root category"
          onChange={this.onRootSelectChange}
          options={this.state.categories}
        ></Select>
        {TreeAdd}
        <Button
          type="primary"
          onClick={this.handleButton}
        >
          Post Categories
        </Button>
      </>
    )
  }
}
export default CategoryEdit
