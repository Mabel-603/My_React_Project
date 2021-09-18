import React,{Component} from 'react'
import {connect} from 'react-redux'
import {creteDemo1Action} from '../../redux/action_creators/test-action'

class Admin extends Component{
  componentDidMount(){
    console.log(this.props);
  }
    render(){
      return(
      <div>
        Admin
      </div>
      )
    }
}
export default  connect(
state => ({peiqi:state.test}),
{
demo1:creteDemo1Action
}
)(Admin)