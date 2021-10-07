import React, { Component } from 'react';
import { EditorState,convertToRaw,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'; //这不是antd组件,而是一个库
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'//要记得手动引入样式


export default class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  getRichText = ()=>{
    const {editorState} = this.state
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }
  setRichText = (html)=>{
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState
      })
    }

  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          //wrapperClassName="demo-wrapper" //最外侧容器的样式
          //editorClassName="demo-editor"//编辑区域的样式
          editorStyle={{
            border:' 1px solid black',
            paddingLeft:'10px',
            lineHeight: '10px',
            minHeight: '200px'
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
        
      </div>
    );
  }
}