import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Card,Button,Form,Input,Select, message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons';
import {reqCatagoryList,reqAddProduct,reqProdById,reqUpdateProduct} from '../../api'
import PicturesWall from'./picture_wall'
import RichTextEditor from './rich_text_editor'

const {Item} = Form

const {Option} = Select
@connect(
  state=>({
    categoryList:state.categoryList,
    productList:state.productList
  })
)
 class AddUpdate extends Component {
  formRef = React.createRef()
   state = {
    categoryList:[],//商品分类列表
    operaType:'add',
    categoryId:'',
    name:'',
    desc:'',
    price:'',
    detail:'',
    imgs:[],
    _id:''

   }
  componentDidMount(){
    const {categoryList,productList} = this.props
    const {id} = this.props.match.params
    setTimeout(() => {
      this.formRef.current.setFieldsValue({//
        name:this.state.name,
        desc:this.state.desc,
        price:this.state.price,
        categoryId:this.state.categoryId,
      })
    }, 100);
    if(categoryList.length)this.setState({categoryList})
    else this.getCategoryList() //发请求获取商品分类列表
    console.log(this.state.categoryList);
    if(id){//只有点击修改,地址栏才会带id
      this.setState({operaType:'update'})
      if(productList.length){ //这部分做的是点击修改,商品数据回显
        let result = productList.find(item=>{
          return item._id === id
        })
        if(result){
          this.setState({...result})//此处没有放商品的图片,富文本内容,后续需要放 
          console.log(result);
          this.refs.pictureWall.setFileList(result.imgs)
          this.refs.richTextEditor.setRichText(result.detail)
        }
      }
      else this.getProductList(id)
   
  }
}
  getProductList = async(id)=>{
    let result = await reqProdById(id)
    const {data,status} = result;
    if(status === 0) {
      this.setState({...data})
      setTimeout(() => {//(self)执行此函数时上面的定时器已经执行完毕,因此需要重新设置
        this.formRef.current.setFieldsValue({//
          name:this.state.name,
          desc:this.state.desc,
          price:this.state.price,
          categoryId:this.state.categoryId,
        })
      }, 100);
      this.refs.pictureWall.setFileList(data.imgs)
      this.refs.richTextEditor.setRichText(data.detail)
    }
    
  }
  getCategoryList = async()=>{
   let result = await reqCatagoryList()
   let {status,data,msg} = result
   if(status === 0) this.setState({categoryList:data})
   else message.error(msg)
}
  onFinish =async(values)=>{
      let {operaType,_id} = this.state
       //从上传组件中获取已经上传的图片数组
      let imgs = this.refs.pictureWall.getImgArr()
      //从富文本组件中获取用户输入的文字转换为富文本的字符串
      let detail = this.refs.richTextEditor.getRichText()
      let result
      if(operaType==='add')  result = await reqAddProduct({...values,imgs,detail})//新增商品
      else  result = await reqUpdateProduct({...values,imgs,detail,_id}) //更新商品
      const {status,msg} = result
      if(status === 0) {
        message.success('操作成功')
        this.props.history.replace('/admin/prod_about/product')
      }
      else message.error(msg)
  
  }
  onFinishFailed=()=>{

  }
  render() {
    const {operaType} = this.state
    return (
      <Card title={
        <div>
         <Button type='link' size='small' onClick={()=>{this.props.history.goBack()}}><ArrowLeftOutlined style={{fontSize:'20px'}}/>返回</Button>
          <span>{operaType==='update' ? '商品修改' : '商品添加'}</span>
        </div>
      } 
       >
        <Form 
        labelCol={{md:2}} 
        wrapperCol={{md:7}}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        ref={this.formRef}
        > 
         <Item label='商品名称' name='name'  rules={[{required: true, message: '请输入商品名称!'}]}>
           <Input placeholder="商品名称" ></Input>
         </Item>
         <Item label='商品描述' name='desc'   rules={[{required: true, message: '请输入商品名称!'}]}>
           <Input placeholder="商品描述"></Input>
         </Item>
         <Item label='商品价格' name='price' rules={[{required: true, message: '请输入商品名称!'}]}>
           <Input placeholder="商品价格" prefix="￥" addonAfter='元' type="number"></Input>
         </Item>
         <Item label='商品分类' name='categoryId' rules={[{required: true, message: '请输入商品名称!'}]}>
           <Select>
             <Option value='' >请选择分类</Option>
             {this.state.categoryList.map((item)=>{
               return <Option key={item._id} value={item._id}>{item.name}</Option>
             })}
           </Select>
         </Item>
         <Item label='商品图片'  wrapperCol={{md:12}}>
           <PicturesWall ref='pictureWall'/>
         </Item>
         <Item label='商品详情' wrapperCol={{md:16}} >
            <RichTextEditor  ref="richTextEditor"/>
         </Item>

        <Button type='primary' htmlType="submit">提交</Button> 
        </Form>
      </Card>
    )
  }
}
export default AddUpdate
