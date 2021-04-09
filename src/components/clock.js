import React from 'react';

const FormattedDate = (props) => {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
      isStop: props.isStop
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    let date = this.state.date;
    date.setSeconds(date.getSeconds() + 1);
    this.setState({
      date: date
    });
  }

  render() {
    if (this.state.isStop) {
      clearInterval(this.timerID);
      this.setState({isStop:false});
    }
    return (
      <div>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}

export default Clock;
