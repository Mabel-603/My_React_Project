import React, { Component } from 'react'
import {Button,Card,List,message} from 'antd'
import {connect} from 'react-redux'
import {ArrowLeftOutlined} from '@ant-design/icons';
import {reqProdById,reqCatagoryList} from '../../api/index'
import './detail.less'

const {Item} = List
@connect(
state=>({
  productList:state.productList,
  categoryList:state.categoryList
})
)
 class Detail extends Component {
  state = {
    categoryId:'',
    categoryName:'',
    desc:'',
    detail:'',
    imgs:[],
    name:'',
    price:'',
    isLoading:true
  }
  componentDidMount(){
    const {id} = this.props.match.params
    const reduxProdList = this.props.productList
    const reduxCataList = this.props.categoryList
    if(reduxProdList.length){
      let result = reduxProdList.find(item=>item._id === id)
      if(result){
        this.categoryId = result.categoryId
        if(result) this.setState({...result})
      }
    }
    else this.getProdById(id)
    if(reduxCataList.length){
      let result = reduxCataList.find((item)=>{
        return item._id === this.categoryId
      })
      this.setState({categoryName:result.name,isLoading:false})
    }else this.getCategorylist()

  }
  getProdById = async(id)=>{
  let result = await reqProdById(id)
  const {status,data,msg} = result
  if(status === 0){
    this.categoryId = data.categoryId
    this.setState({...data})
  } 
    //  const {categoryId,desc,detail,imgs,name,price} = data;
    //  this.setState({categoryId,desc,detail,imgs,name,price})
  else message.error(msg)
  }
  getCategorylist = async()=>{
   let result = await reqCatagoryList()
   const {status,data,msg} = result
   if(status === 0){
    let result = data.find(item => item._id === this.categoryId)
    this.setState({categoryName:result.name,isLoading:false})
   }
   else message.error(msg)
   
  }
  render() {
    return (
        <Card title={
          <div className='left-top'>
           <Button type='link' size='small' onClick={()=>{this.props.history.goBack()}}><ArrowLeftOutlined style={{fontSize:'20px'}}/></Button>
            <span>商品详情</span>
          </div>
        } 
         >
          <List loading={this.state.isLoading}> 
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
             <span className="prod-data">{this.state.categoryName}</span>
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
      
    )
  }
}
export default Detail
