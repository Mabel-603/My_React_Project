import React from 'react'
import ReactDOM  from "react-dom"
import {Provider} from 'react-redux'
import store from './redux/store'
import App from './App'



ReactDOM.render(<Provider store={store}><App/></Provider>,document.getElementById('root'))//让所有组件都可以得到state数据
// store.subscribe(()=>{//要记得订阅,不然状态不会发生变化
//   ReactDOM.render(<App store={store}/>,document.getElementById('root'))
// })