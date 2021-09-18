import React,{Component} from 'react'
import { Redirect, Route,Switch } from 'react-router-dom'
import "antd/dist/antd.css"
import Login from './containers/login/login'
import Admin from './containers//admin/admin'

export default class App extends Component{
    render(){
      return(
      <div className="app">
        <Switch>
         <Route path="/login" component={Login}/>
         <Route path="/admin" component={Admin}/>
         <Redirect to="/login"/> 
        </Switch>
      </div>
      )
    }
}