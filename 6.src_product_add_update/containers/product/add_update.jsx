import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Card,Button,Form,Input,Select, message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons';
import {reqCatagoryList,reqAddProduct} from '../../api'
import PicturesWall from'./picture_wall'
import RichTextEditor from './rich_text_editor'

const {Item} = Form

const {Option} = Select
@connect(
  state=>({
    categoryList:state.categoryList,
    productList:state.productList,
  })
)
 class AddUpdate extends Component {
  
   state = {
    categoryList:[],
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
  //   const {setFieldsValue} = this.props.form;
  //   // 这里就能实现指定表单设置value
	//   setTimeout(()=>{
	// 	setFieldsValue({"name": "Tom"})
	//  },500)
    console.log(this.props);
    const {categoryList,productList} = this.props
    const {id} = this.props.match.params
    if(id) this.setState({operaType:'update'})
    if(productList.length){
      let result = productList.find(item=>{
        return item._id === id
      })
      this.setState({...result})
    }
    if(categoryList.length) this.setState({categoryList})
    else this.getCategoryList()
  }
  getCategoryList = async()=>{
   let result = await reqCatagoryList()
   let {status,data,msg} = result
   if(status === 0) this.setState({categoryList:data})
   else message.error(msg)
}
  onFinish =async(values)=>{
       //从上传组件中获取已经上传的图片数组
      let imgs = this.refs.pictureWall.getImgArr()
      //从富文本组件中获取用户输入的文字转换为富文本的字符串
      let detail = this.refs.richTextEditor.getRichText()
      console.log({...values,imgs,detail});
      let result = await reqAddProduct({...values,imgs,detail})
      console.log(result);
      const {status,msg} = result
      if(status === 0) {
        message.success('操作成功')
        this.props.history.replace('/admin/prod_about/product')
      }
      else message.error(msg)
    
  
  }
  // onFinish = (values)=>{
  //   console.log(values);
  //   }
  onFinishFailed=()=>{

  }
  render() {
    const {operaType} = this.state
   const {name,desc,price} = this.state
   console.log(name,desc,price);
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
        // initialValues={{
        //   categoryId:'',
        //   name:name,
        //   desc:desc
        // }}
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
