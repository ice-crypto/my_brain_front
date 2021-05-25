import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Cascader, Select, Form, Input, InputNumber, DatePicker, Button} from 'antd';
import AxiosWrapper from '../functions/AxiosWrapper';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class BookNew extends Component{
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
    this.onRootSelectChange = this.onRootSelectChange.bind(this);
    this.state = {
      root_categories: [],
      select_tree: [],
      categories: [],
      price: -1
    }
  }
  onChange(value) {
    console.log(value);
    this.setState({categories: value});
  }
  onChangeNumber(value) {
    this.setState({price: value});
  }
  onRootSelectChange(value) {
    console.log(value);
    AxiosWrapper(
      "GET",
      `/api/v1/categories/${value}`,
      null,
      (res) => {
        console.log(res.data);
        this.setState({select_tree:res.data});
      }
    );
  }
  onFinish(values) {
    values.categories = this.state.categories;
    values.price = this.state.price;
    AxiosWrapper(
      "POST",
      "/api/v1/books",
      {book: values},
      (res) => console.log(res)
    );
  };
  onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  };
  getRootCategories() {
    AxiosWrapper(
      "GET",
      '/api/v1/categories',
      (res) => {
        console.log(res.data);
        let tmp = [];
        res.data.forEach(node => tmp.push({value:node.id,label:node.title}))
        this.setState({root_categories:tmp});
      }
    );
  }
  componentDidMount() {
    this.getRootCategories();
  }
  render() {
    return(
      <>
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
          name="title"
          rules={[{ required: true, message: 'Please input Book title.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Book price"
          name="price"
        >
          <InputNumber min={1} max={100000} onChange={this.onChangeNumber} defaultValue={1000}/>
        </Form.Item>
        <Form.Item
          label="Select Category"
          name="categories"
        >
          <Cascader options={this.state.select_tree} onChange={this.onChange} placeholder="Please select" changeOnSelect/>,
        </Form.Item>
        <Form.Item
          label="Book published Date"
          name="published_at"
          rules={[{ required: true, message: 'Please input Book published date.' }]}
        >
          <DatePicker />
        </Form.Item>

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

export default BookNew
