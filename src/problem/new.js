import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Cascader, Select, Form, Input, InputNumber, DatePicker, Button,Alert } from 'antd';
import ProblemPanel from '../components/problem_panel';
import AnswerField from '../components/add_field';
import axios from 'axios';
import { csrfToken } from 'rails-ujs'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class ProblemNew extends Component{
  constructor() {
    super();
    axios.defaults.baseURL = 'http://localhost:3000';
    this.onChange = this.onChange.bind(this);
    this.onFormatChange = this.onFormatChange.bind(this);
    this.onBookChange = this.onBookChange.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.getFormats = this.getFormats.bind(this);
    this.getBooks = this.getBooks.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
    this.onRootSelectChange = this.onRootSelectChange.bind(this);
    this.state = {
      root_categories: [],
      select_tree: [],
      categories: [],
      formats: [],
      books: [],
      panelShow: false,
      data: {},
      response_status: ''
    }
  }
  onChange(value) {
    console.log(value);
    this.setState({categories: value});
  }
  onFormatChange(value) {
    console.log(value);
    let data = this.state.data;
    data.format_id = value;
    this.setState({data: data,panelShow: true});
  }
  onBookChange(value) {
    console.log(value);
    let data = this.state.data;
    data.books_id = value;
    this.setState({data: data});
  }
  onRootSelectChange(value) {
    console.log(value);
    axios.get(`/api/v1/categories/${value}`)
      .then(res => {
        console.log(res.data);
        this.setState({select_tree:res.data});
      }).catch(err => {
        console.log('err:', err);
    });
  }
  onFinish(values) {
    let data;
    values.categories = this.state.categories;
    data = values.book_id;
    delete values.book_id;
    console.log('Success:', values);
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
    axios({
      method : "POST",
      url : "/api/v1/problems",
      data : {problem: values,book: data}
    })
    .then((response)=> {
      console.log(response);
      this.setState({response_status: response.status == 201 ? 'success' : 'error'});
    })
    .catch((error)=> {
      console.error(error);
    });
  };
  onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  };
  getRootCategories() {
    axios.get(`/api/v1/categories`)
      .then(res => {
        console.log(res.data);
        let tmp = [];
        res.data.forEach(node => tmp.push({value:node.id,label:node.title}))
        this.setState({root_categories:tmp});
      }).catch(err => {
        console.log('err:', err);
    });
  }
  getFormats() {
    axios.get(`/api/v1/formats`)
      .then(res => {
        console.log(res.data);
        let tmp = [];
        res.data.forEach(format => tmp.push({value:format.id,label:format.problem_type}))
        this.setState({formats:tmp});
      }).catch(err => {
        console.log('err:', err);
    });
  }
  getBooks() {
    axios.get(`/api/v1/books`)
      .then(res => {
        console.log(res.data);
        let tmp = [];
        res.data.forEach(book => tmp.push({value:book.id,label:book.title}));
        this.setState({books:tmp});
      }).catch(err => {
        console.log('err:', err);
    });
  }
  componentDidMount() {
    this.getRootCategories();
    this.getBooks();
    this.getFormats();
  }

  render() {
    let Panel,StatusBar;
    if (this.state.panelShow) {
      Panel = <ProblemPanel/>;
    }
    if (this.state.response_status != '') {
      StatusBar = <Alert message={this.state.response_status} type={this.state.response_status} />;
    }
    return(
      <>
      {StatusBar}
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a root category"
        onChange={this.onRootSelectChange}
        options={this.state.root_categories}
      ></Select>
      <Form
        {...layout}
        name="basic"
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label="Book title"
          name="book_id"
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a problem book"
            onChange={this.onBookChange}
            options={this.state.books}
          ></Select>
        </Form.Item>
        <Form.Item
          label="Select Category"
          name="categories"
        >
          <Cascader options={this.state.select_tree} onChange={this.onChange} placeholder="Please select" changeOnSelect/>,
        </Form.Item>
        <Form.Item
          label="Problem Format"
          name="format_id"
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a problem format"
            onChange={this.onFormatChange}
            options={this.state.formats}
          ></Select>
        </Form.Item>

        {Panel}

        <AnswerField/>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </>
    )
  }
}

export default ProblemNew
