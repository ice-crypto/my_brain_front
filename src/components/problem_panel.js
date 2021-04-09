import React, { Component } from 'react';
import { Input, Button, Form } from 'antd';
import 'antd/dist/antd.css';

const { TextArea } = Input;

var counter = 1;

class Panel extends Component{
  constructor(props) {
    super(props);
    this.onTextClick = this.onTextClick.bind(this);
    this.onSelectClick = this.onSelectClick.bind(this);
    this.state = {
      problem_counter: 0
    }
  }

  onTextClick() {
    document.getElementById('problem').value += `[box${counter}]`
    counter += 1;
  }
  onSelectClick() {
    document.getElementById('problem').value += `[select${counter}{1,}{2,}{3,}{4,}]`;
  counter +=1;
  }
  render() {
    return(
      <>
      <Button type="primary" onClick={this.onTextClick}>
        Text Input
      </Button>
      <Button type="primary" onClick={this.onSelectClick}>
        Text Select
      </Button>
      <Form.Item
        label="Problem body"
        name="body"
      >
        <TextArea rows={8} id="problem"/>
      </Form.Item>
      </>
    )
  }
}
export default Panel
