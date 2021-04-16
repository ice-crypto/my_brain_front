import React, { Component } from "react";
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';


class MarkDownEditor extends Component{
  constructor(){
    super();
    this.state = {
      markdown:'',
      textValue:'',
      files: []
    }
    this.handleDrop = this.handleDrop.bind(this);
  }
    handleDrop(data, e){
        let files = e.dataTransfer.files;
        if(files.length > 0){
            let file = files[0];
            alert('FileName : ' + file.name );
            console.log(file);
            let tmp = this.state.files;
            tmp.push(file);
            let tmp2 = this.state.markdown+`<img src="${file.name}">`;
            this.setState({files:tmp,textValue:tmp2});
            console.log(tmp2);
        }
    }
    render(){
      return(
          <SimpleMDE onChange={(e) => this.setState({markdown:e})} value={this.state.textValue} events={{'drop':this.handleDrop}}/>
      )
    }
}
export default MarkDownEditor;
