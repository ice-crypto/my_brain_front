import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Cascader, Select, Form, Input, InputNumber, DatePicker, Button, Alert, Card,Row, Col} from 'antd';
import ProblemPanel from '../components/problem_panel';
import QuestionPanel from '../components/question';
import Clock from '../components/clock';
import axios from 'axios';
import { csrfToken } from 'rails-ujs'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class ProblemTodaySolve extends Component{
  constructor() {
    super();
    axios.defaults.baseURL = 'http://localhost:3000';
    this.getQuestions = this.getQuestions.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onFinishClick = this.onFinishClick.bind(this);
    this.formRef = React.createRef();
    this.state = {
      data: [],
      questions: [],
      counter: 0,
      results: [],
      isShow: true,
      submitDisabled: false,
      nextDisabled: true,
      date: new Date('2000/1/1'),
      clockStop: false,
      response_status: ''
    }
  }
  getQuestions() {
    axios.get(`/api/v1/problems/today_questions`)
      .then(res => {
        console.log(res);
        this.setState({
          questions:res.data,
          isShow: res.data.length<=1?false:true
        });
      }).catch(err => {
        console.log('err:', err);
    });
  }
  onFinish(values) {
    let results=[],ok=1;
    let data = this.state.data;
    this.state.questions[this.state.counter].answers.forEach((answer, i) => {
      let result;
      if (answer == values[i].answer) {
        result = 'success';
      }else {
        result = 'error';
        ok--;
      }
      results.push({result:result,answer:answer});
    });
    data.push(
      {
        problem_id: this.state.questions[this.state.counter].id,
        correct: ok >= 0? true:false,
        timesec: 400
      }
    );
    this.setState({
      results:results,
      data: data,
      date: new Date('2000/1/1'),
      clockStop: true,
      submitDisabled: true,
      nextDisabled: false
    });
    console.log(this.state.questions[this.state.counter]);
    console.log(this.state.data);
  }
  onFinishFailed(values) {
    console.log(values);
  }
  onNextClick() {
    if (this.state.questions.length == (this.state.counter+1)+1) {
      this.setState({counter:this.state.counter+1,isShow:false});
    }else{
      this.setState({
        counter:this.state.counter+1,
        results: []
      });
    }
    this.setState({submitDisabled: false,nextDisabled: true});
    this.formRef.current.resetFields();
  }
  onFinishClick() {
    
    this.setState({response_status: 'success'});
  }
  componentDidMount() {
    this.getQuestions();
  }

  render() {
    let question_body = this.state.questions.length > 0 ?
      this.state.questions[this.state.counter].body : [];
    let answer_list = this.state.results.map((row,i)=>{
      let message = `問題${i+1} 答え: ${row.answer}`;
      return <Col key={i.toString()}><Alert message={message} type={row.result}/></Col>;
    });
    let next_btn,StatusBar;
    if (this.state.isShow) {
      next_btn = <Button type="primary" onClick={this.onNextClick} disabled={this.state.nextDisabled}>Next</Button>;
    }else{
      next_btn = <Button type="primary" onClick={this.onFinishClick} disabled={this.state.nextDisabled}>Finish</Button>;
    }
    if (this.state.response_status != '') {
      StatusBar = <Alert message={this.state.response_status} type={this.state.response_status} />;
    }
    return(
      <>
      {StatusBar}
      <Clock date={this.state.date} isStop={this.state.clockStop}/>
      <Form
        {...layout}
        name="basic"
        ref={this.formRef}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Card title="以下の空欄を埋めなさい。" style={{ width: 300 }}>
          <QuestionPanel
            body={question_body}
            results={this.state.results}
          />
        </Card>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" disabled={this.state.submitDisabled}>
            Submit
          </Button>
        </Form.Item>
        {next_btn}
      </Form>
      <Row gutter={[16, 16]}>
        {answer_list}
      </Row>
      </>
    )
  }
}

export default ProblemTodaySolve
