import React,{Component} from 'react'
import {Card,Button,Input,Table,message,Modal,Form,Select} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import dayjs from 'dayjs'
import {reqUserList,reqAddUser} from '../../api'
import {PAGE_SIZE} from '../../config/index'
import {connect} from 'react-redux'
const {Item} = Form
const {Option} = Select
@connect(
  state=>({username:state.userInfo.user.username}),
  {}
)
 class Role extends Component{
  formRef = React.createRef()
  state={
    isShow:false,//是否展示新增/更新弹窗
    userList:[],//用户列表
    roleList:[],//角色列表
    role_id:'',
  }
  getUserList = async()=>{
    let result = await reqUserList()
    const {status,data,msg} = result
    if(status === 0) this.setState({
      userList:data.users.reverse(),
      roleList:data.roles
    })
  }
  componentDidMount(){
    this.getUserList()
  }
  showAdd = ()=>{
    this.setState({isShow:true})
    setTimeout(() => {
      this.formRef.current.setFieldsValue({
        role_id:this.state.role_id //在展示出表单后再去给表单内容设置初始值
      })
    },100);
    
  }
  //新增用户弹窗----确定按钮回调
  handleOk = ()=>{
  this.formRef.current.validateFields().then(async(values,err)=>{
    if(err)  return
    console.log(values);
    let result = await reqAddUser(values)
    let {status,data,msg} = result;
    if(status === 0){
      message.success('添加用户成功',1)
      let userList = [...this.state.userList]
      userList.push(data)
      this.setState({userList,isShow:false})
      // this.formRef.current.resetFields();
    }
    else message.error(msg,1)
  })
  }
  //新增用户弹窗----取消按钮回调
  handleCancel=()=>{
  this.setState({isShow:false})
  }
 

  render(){
    const dataSource = this.state.userList
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render: time => dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss')
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        key: 'role_id',
        render:(id)=>{
          let result = this.state.roleList.find((item)=>{
            return item._id === id
          })
          if(result) return result.name
        }
      },
      {
        title: '操作',
        key: 'option',
        render: () => (
          <div>
            <Button  type='link' onClick={()=>{this.props.history.push(``)}}>修改
            </Button>
            <Button 
              type='link' 
             >删除
            </Button>
          </div>
          )
      }
    ];
    return (
      <div>
      <Card 
       title={<Button type="primary" onClick={()=>{this.showAdd()}}><PlusOutlined />创建用户</Button>} >
        <Table 
        dataSource={dataSource}
         columns={columns} 
         bordered
         rowKey="_id"
         pagination={{defaultPageSize:PAGE_SIZE}}
         />
      </Card>
        {/* 创建用户提示框 */}
        <Modal
          title="创建用户"
          visible={this.state.isShow}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form  labelCol={{span:4}} wrapperCol={{span:16}} ref={this.formRef}>
          <Item label='用户名' name='username'  rules={[{required: true, message: '用户名必须输入!'}]}>
           <Input placeholder="请输入用户名" ></Input>
          </Item>
          <Item label='密码' name='password'   rules={[{required: true, message: '密码必须输入!'}]}>
           <Input placeholder="请输入密码"></Input>
          </Item>
          <Item label='手机号' name='phone' rules={[{required: true, message: '手机号必须输入!'}]}>
           <Input placeholder="请输入手机号" ></Input>
          </Item>
          <Item label='邮箱' name='email' rules={[{required: true, message: '邮箱必须输入!'}]}>
           <Input placeholder="请输入邮箱" ></Input>
          </Item>
          <Item label='角色' name='role_id' rules={[{required: true, message: '必须选择一个角色!'}]}>
           <Select>
             <Option value='' >请选择一个角色</Option>
             {this.state.roleList.map((item)=>{
               return <Option key={item._id} value={item._id}>{item.name}</Option>
             })}
           </Select>
          </Item>

          </Form>
        </Modal>
        
       
    </div>
    )
  }
}

export default Role