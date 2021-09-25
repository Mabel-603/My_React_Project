import React, { Component } from 'react'
import {Button,Card,List,message} from 'antd'
import {connect} from 'react-redux'
import {ArrowLeftOutlined} from '@ant-design/icons';
import {reqProdById} from '../../api/index'
import './detail.less'

const {Item} = List
@connect(
state=>({productList:state.productList})
)
 class Detail extends Component {
  state = {
    categoryId:'',
    desc:'',
    detail:'',
    imgs:[],
    name:'',
    price:'',
  }
  componentDidMount(){
    const {id} = this.props.match.params
    const reduxProdList = this.props.productList
    if(reduxProdList.length){
      let result = reduxProdList.find(item=>item._id === id
      )
      if(result) this.setState({...result})
        // const {categoryId,desc,detail,imgs,name,price} = result
        // this.setState({categoryId,desc,detail,imgs,name,price})
    }
    else this.getProdById(id)
  }
getProdById = async(id)=>{
 let result = await reqProdById(id)
 const {status,data,msg} = result
 if(status === 0) this.setState({...data})
  //  const {categoryId,desc,detail,imgs,name,price} = data;
  //  this.setState({categoryId,desc,detail,imgs,name,price})
 else message.error(msg)
}

  render() {
    return (
      <div>
        <Card title={
          <div className='left-top'>
           <Button type='link' size='small' onClick={()=>{this.props.history.goBack()}}><ArrowLeftOutlined style={{fontSize:'20px'}}/></Button>
            <span>商品详情</span>
          </div>
        } >
          <List > 
           <Item className='item'>
             <span className="prod-title">商品名称：</span>
             <span className="prod-data">{this.state.name}</span>
           </Item>
           <Item className='item'>
             <span className="prod-title">商品描述：</span>
             <span className="prod-data">{this.state.desc}</span>
           </Item>
           <Item className='item'>
             <span className="prod-title">商品价格:  </span>
             <span className="prod-data">{this.state.price}</span>
           </Item>
           <Item className='item'>
             <span className="prod-title">所属分类：</span>
             <span className="prod-data">{this.state.categoryId}</span>
           </Item>
           <Item className='item'>
             <span className="prod-title">商品图片：</span>
             {
               this.state.imgs.map((item,index)=>{
                 return <img key={index} src={`/upload/`+item} alt="商品图片"/>
               })
             }
           </Item>
           <Item className='item'>
             <span className="prod-title">商品详情：</span>
             <span className="prod-data" dangerouslySetInnerHTML={{__html:this.state.detail}}></span>
           </Item>

          </List>
        </Card>
        
      </div>
    )
  }
}
export default Detail
