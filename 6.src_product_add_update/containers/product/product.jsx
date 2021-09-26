import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Card,Button,Select,Input,Table, message} from 'antd';
import {PlusCircleOutlined,SearchOutlined} from '@ant-design/icons';
import {reqProductList,reqUpdateProdStatus,reqSearchProduct} from '../../api'
import {createSaveProductAction} from '../../redux/action_creators/product_action'
import {PAGE_SIZE} from '../../config/index'


const {Option} = Select;
@connect(
state =>({}),
{saveProduct:createSaveProductAction}
)
 class Product extends Component{
  state = {
    productList:[],
    current:1,
    total:'',
    keyword:'',
    searchType:'productName',
    isLoading:true
  }
  componentDidMount(){
    this.getProductList()
    }
  getProductList = async(number=1)=>{
    let result
    if(this.isSearch){
      const {searchType,keyword} = this.state;
       result = await reqSearchProduct(number,PAGE_SIZE,searchType,keyword)
    }
    else  result = await reqProductList(number,PAGE_SIZE);
    console.log(result);
    const {status,data} = result
    if(status === 0){
     this.setState({
       productList:data.list,
       total:data.total,
       current:data.pageNum,
       isLoading:false
    })
    //把获取的商品列表存入到redux中
    this.props.saveProduct(data.list)
    }else message.error('初始化商品列表失败')
  }
  updateProdStatus = async({_id,status})=>{
    let productList = [...this.state.productList]
    if(status === 1) status =2;
    else status = 1;
   let result = await reqUpdateProdStatus(_id,status)
   if(result.status === 0){
     message.success('更新商品状态成功')
     productList = productList.map((item)=>{
       if(item._id === _id){
        item.status = status
       }
       return item;
     })
     this.setState({productList})
   }
   else message.error('更新商品状态失败')
  }
  search = async()=>{
    this.isSearch = true;
    this.getProductList()
  }

  render(){
    const dataSource = this.state.productList;
    
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width:'15%',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        align:'center',
        width:'10%',
        render:price => '￥'+price
      },
      {
        title: '状态',
        // dataIndex: 'status',
        key: 'status',
        align:'center',
        width:'10%',
        render:item=>{
          return(
            <div>
              <Button 
              type={item.status===1 ? 'danger':'primary'}
              onClick={()=>{this.updateProdStatus(item)}}
              >{item.status===1 ? '下架':'上架'}</Button><br/>
              <span>{item.status===1 ? '在售':'已停售'}</span>
            </div>
          )
        }
      },
      {
        title: '操作',
        // dataIndex: 'opera',
        key: 'opera',
        align:'center',
        width:'10%',
        render:item=>{
          return(
            <div>
              <Button type="link" onClick={()=>{this.props.history.push(`/admin/prod_about/product/detail/${item._id}` )}}>详情</Button><br/>
              <Button type="link" onClick={()=>{this.props.history.push(`/admin/prod_about/product/add_update/${item._id}`)}}>修改</Button><br/>
              
            </div>
          )
        }
      },
    ];
    return (
      <div>
        <Card title={
          <div>
           <Select defaultValue="name" style={{ width: 120 }} onChange={(value)=>{this.setState({searchType:value})}}>
            <Option value="name">按名称搜索</Option>
            <Option value="desc">按描述搜索</Option>
          </Select>
          <Input 
          placeholder="请输入搜索关键字" 
          style={{width:'25%',margin:'10px'}}
          allowClear
          onChange ={(event)=>{this.setState({keyword:event.target.value})}}
          />
          <Button 
          type="primary"
          onClick ={this.search}
          ><SearchOutlined />搜索</Button>
          </div>
        }
        
        extra={<Button type="primary" onClick={()=>{this.props.history.push('/admin/prod_about/product/add_update')}}><PlusCircleOutlined/>添加商品</Button>} >
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
      </div>
    )
  }
}
export default Product