import React, { Component } from 'react';
import { Input, Button, Form } from 'antd';
import QuestionSelect from '../components/questionselect';
import 'antd/dist/antd.css';

const { TextArea } = Input;

var counter = 1;

const QuestionBox = ({index,message,status,answer}) => {return <Form.Item noStyle name={[index,'answer']} validateStatus={status} help={answer}><input placeholder={message}/></Form.Item>;}

class QuestionPanel extends Component{
  constructor(props) {
    super(props);
    this.state = {
      results: props.results
    }
  }

  render() {
    let BodyDOM;
    let question_box = this.props.body.length > 0?this.props.body.split(''):[];
    let isReturn = true;
    BodyDOM = question_box.map((s,index)=>{
      if (s == '[') {
        isReturn = false;
        if (question_box.slice(index+1,index+4).join(',').replace(/,/g,'') == 'box'){
          let question_index = question_box.slice(index+4,question_box.indexOf(']',index)).join(',').replace(/,/g,'');
          return <QuestionBox
          index={question_index}
          message={'問'+(question_index)}
          status={this.state.results.length>0?this.state.results[question_index].result:''}
          answer={this.state.results.length>0?this.state.results[question_index].answer:''}
          />;
        }else if (question_box.slice(index+1,index+7).join(',').replace(/,/g,'') == 'select') {
          return <QuestionSelect index={question_box.slice(index+4,index+5)} message={'問'+(question_box.slice(index+4,index+5))}/>;
        }else {
          return '<else>';
        }
      }else if (s == ']') {
        isReturn = true;
      }else if(isReturn){
        return s;
      }else{
        return;
      }
    });
    return(
      <>
        {BodyDOM}
      </>
    )
  }
}
export default QuestionPanel
