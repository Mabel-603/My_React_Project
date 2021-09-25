import React, { Component } from 'react'
import {Button} from 'antd'

export default class add_update extends Component {
  render() {
    return (
      <div>
         我是新增页面，或许也可能是修改页面
         <Button onClick={()=>{this.props.history.goBack()}}>返回</Button>
      </div>
    )
  }
}
