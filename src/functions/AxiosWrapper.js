import React, { Component } from 'react'
import axios from 'axios';
import { csrfToken } from 'rails-ujs'

export default function AxiosWrapper(method,url,data,callback,errors=()=>{}) {
  axios.defaults.baseURL = 'http://stagingaccessoryriver.net';
  axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
  axios({
    method : `${method}`,
    url : `${url}`,
    data : data
  })
  .then((response)=> {
    console.log(response);
    callback(response);
  })
  .catch((error)=> {
    console.error(error);
    errors(error);
  });
}
