import React,{Component} from 'react'
import {Card,Button,Input,Table,message,Modal,Form,Tree} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import dayjs from 'dayjs'
import {reqRoleList,reqAddRole,reqAuthRole} from '../../api'
import menuList from '../../config/menu_config'
import {PAGE_SIZE} from '../../config/index'
import {connect} from 'react-redux'
const {Item} = Form
const {TreeNode} = Tree;
@connect(
  state=>({username:state.userInfo.user.username}),
  {}
)
 class Role extends Component{
  formRef = React.createRef()
  state={
    isShowAdd:false,
    isShowAuth:false,
    roleList:[],
    menuList,
    checkedKeys: [],//选中的菜单
    _id:''//当前操作的角色id
  }
  getRoleList=async()=>{
    let result = await reqRoleList();
    const {data,status} = result;
    if(status === 0){
      this.setState({roleList:data})
      console.log(this.state.roleList);
    }
  }
  componentDidMount(){
  this.getRoleList()
  }
   //用于展示新增弹窗
  showAdd=()=>{
    this.setState({isShowAdd:true})
    
  }
  //新增角色--确认按钮
  handleOk=()=>{
    this.formRef.current.validateFields().then(async(values,err)=>{
     let result =await reqAddRole(values)
     const{status,msg} = result
     if(status === 0) {
      message.success('新增角色成功')
      this.getRoleList()
      this.setState({isShowAdd:false})
      this.formRef.current.resetFields()//没有在showAdd中重置,是因为最开始表单中没有值,获取的就是undefined
                                        //因此在每次添加成功后去重置表单
     }
     else message.error(msg)
    })
    
  }
  //新增角色--取消按钮
  handleCancel=()=>{
    this.setState({isShowAdd:false})
  }
  //用于展示授权弹窗
  showAuth =(id)=>{
    const {roleList} = this.state;
    let result = roleList.find(item=>{ return item._id === id})
    if(result) this.setState({checkedKeys:result.menus})
    this.setState({isShowAuth:true,_id:id})
  }
   //授权弹窗--确认按钮
  handleAuthOk=async ()=>{
    const {_id,checkedKeys} = this.state
    const {username} = this.props
    let result = await reqAuthRole({_id,menus:checkedKeys,auth_name:username})
    const {status,msg} = result;
    if(status === 0){
     message.success('授权成功',1)
    this.setState({isShowAuth:false})
    this.getRoleList()
    }
    else message.error(msg,1)
  }
  //授权弹窗--取消按钮
  handleAuthCancel=()=>{
    this.setState({isShowAuth:false})
  }
 
//-------------------tree----start--------------
onCheck = checkedKeys => this.setState({ checkedKeys });
renderTreeNodes = (data) =>
      data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        ); 
      }
      return <TreeNode key={item.key} {...item} />;
  });
//-----------tree-----end-----------
  render(){
    const dataSource = this.state.roleList
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render:(time)=>dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss')
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
        render:(time)=> time ? dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss') : ''
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
      },
      {
        title: '操作',
        key: 'option',
        render:item=><Button type='link' onClick={()=>{this.showAuth(item._id)}}>设置权限</Button>
      }
    ];
    //treeData是属性菜单的源数据
    const treeData = this.state.menuList
    return (
      <div>
      <Card 
       title={<Button type="primary" onClick={()=>{this.showAdd()}}><PlusCircleOutlined/>新增角色</Button>} >
        <Table 
        dataSource={dataSource}
         columns={columns} 
         bordered
         rowKey="_id"
         loading={this.state.isLoading}
         pagination={{
          pageSize:PAGE_SIZE,
          total:this.state.total,
          current:this.state.current,
          onChange:this.getProductList
         }}
         />
      </Card>
        {/* 新增角色提示框 */}
        <Modal
          title="新增角色"
          visible={this.state.isShowAdd}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form ref={this.formRef}>
            <Item name='roleName' rules={ [
                  {required: true, message: '角色名必须输入' },
                ]}>
                <Input placeholder="请输入角色名" />
            </Item>
          </Form>
        </Modal>
        {/* 设置权限提示框 */}
        <Modal
          title="设置权限"
          visible={this.state.isShowAuth}
          onOk={this.handleAuthOk}
          onCancel={this.handleAuthCancel}
          okText="确认"
          cancelText="取消"
        >
          
           <Tree
            checkable //允许选中
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            defaultExpandAll={true}
            // treeData={treeData}
          >
            <TreeNode title='平台功能' key='top' >
               {this.renderTreeNodes(treeData)} 
            </TreeNode> 
          </Tree> 
          
        

        </Modal>
    </div>
    )
  }
}

export default Role