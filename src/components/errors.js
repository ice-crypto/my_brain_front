import React, { Component } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.logErrorToMyService = this.logErrorToMyService.bind(this);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    this.logErrorToMyService(error, info);
  }
  logErrorToMyService(e, i) {
    console.log("error");
    console.log(e);
    console.log("info");
    console.log(i);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
