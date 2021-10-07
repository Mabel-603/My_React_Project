import React,{Component} from 'react'
import {Card,Button,Table, message,Modal,Form,Input} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons'
import {reqCatagoryList,reqAddCatagory,reqUpdateCatagory} from '../../api/index'
import {createSaveCateAction} from '../../redux/action_creators/category_action'
import {PAGE_SIZE} from '../../config/index'
import { connect } from 'react-redux';

const {Item} = Form
@connect(
  state=>({}),
  {saveCategory:createSaveCateAction}
)
 class Category extends Component{
 formRef = React.createRef();
state={
  catagoryList:[],//商品分类列表
  visible:false,//控制弹窗的展示或隐藏
  operType:"",//操作类型（新增？修改？）
  isLoading:true,//是否处于加载中
  modalCurrentValue:'',//弹窗显示的值---用于数据回显
  modalCurrentId:''//当前修改分类的id
}

componentDidMount(){
   //一上来，就请求商品分类列表
  this.getCatagoryList()
}
 //获取商品分类列表
getCatagoryList = async()=>{
  let result = await reqCatagoryList();
  this.setState({isLoading:false})
  const {status,data,msg} = result;
  if(status===0){
    this.setState({catagoryList:data.reverse()})
    //把商品的分类信息放入redux
    this.props.saveCategory(data)
  }
 
  else message.error(msg,1)
}
//用于展示弹窗--作为新增
 showAdd = () => {
  this.setState({
    visible:true,//展示弹窗
    operType:'add',//类型更改为添加
    modalCurrentValue:'',//弹窗回显的值
    modalCurrentId:''//当前操作的id
})};
 //用于展示弹窗--作为修改
 showUpdate = (item) => {
  const {_id,name} = item;//获取当前要修改分类的id、name
  this.setState({
    modalCurrentValue:name,//当前名字存入state
    modalCurrentId:_id,//当前操作的id存入stat
    visible:true,//展示弹窗
    operType:'update'//操作方式变为更新
  })
  setTimeout(() => {
    this.formRef.current.setFieldsValue({categoryName:name}) //设置更新分类时表单的回显值
  }, 100);
};
//真正执行新增的操作
 toAdd = async(values)=>{
  let result =await reqAddCatagory(values)
  let {status,data,msg} = result;
  if(status === 0) {
    message.success('新增商品分类成功')
    let catagoryList = [...this.state.catagoryList]
    catagoryList.unshift(data)
    this.setState({catagoryList,visible:false})
    this.formRef.current.resetFields();//重置表单
  }
  if(status === 1) message.warning(msg,1)
}
 toUpdate = async(categoryObj)=>{
 let result =await reqUpdateCatagory(categoryObj)
 const {status} = result;
 if(status === 0){
   message.success('更新分类名成功',1)
   this.getCatagoryList()//重新请求商品列表
   this.setState({visible:false})//隐藏弹窗
   this.formRef.current.resetFields();//重置表单
 }else{
   message.warning('更新失败',1)
   this.setState({visible:false})//隐藏弹窗
   this.formRef.current.resetFields();//重置表单
 }
}
 //点击弹窗ok按钮的回调
 handleOk = () => {
   const {operType} = this.state;
  this.formRef.current.validateFields().then(async(values,err)=>{
    if(err){
      message.warning('表单输入有误,请检查!',1)
      return
    }
    if(operType === 'add') this.toAdd(values);
    if(operType === 'update') {
      const categoryId = this.state.modalCurrentId;
      const categoryName = values.categoryName;
      const categoryObj = {categoryId,categoryName}
      this.toUpdate(categoryObj)
    };
  })
  
};
//点击弹窗取消按钮的回调
 handleCancel = () => {
  this.setState({visible:false})
  this.formRef.current.resetFields();
};

  render(){
    const dataSource = this.state.catagoryList;
    let {operType,visible} = this.state
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        // dataIndex: 'name',
        key: 'age',
        render:(item)=>{return <Button type="link" onClick={()=>{this.showUpdate(item)}}>修改分类</Button>},
        align:'center',
        width:'25%'
      },
    ];

    return (
      <div>
        <Card  extra={<Button type="primary" onClick={this.showAdd} icon={<PlusCircleOutlined />}>添加</Button>} >
          <Table 
          dataSource={dataSource}
          columns={columns} 
          bordered
          rowKey="_id"
          pagination={{pageSize:PAGE_SIZE,showQuickJumper:true}}
          loading={this.state.isLoading}
          />
        </Card>
        <Modal 
          title={operType === "add" ? '新增分类':'修改分类'}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <Form ref={this.formRef} >
            <Item name="categoryName" rules={[{required:true,message: '分类名必须输入!'}]}>
              <Input placeholder="请输入分类名" /> 
            </Item>
          </Form>
        </Modal>
      </div>
     
    )
  }
}
export default Category