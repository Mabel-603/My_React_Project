import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import store from './redux/store.js'

ReactDOM.render(<App store={store}/>,document.getElementById('root')) 
store.subscribe(()=>{//subscribe订阅了store内部状态的修改
  ReactDOM.render(<App store={store}/>,document.getElementById('root')) 
})