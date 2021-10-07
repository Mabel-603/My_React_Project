import React,{Component} from 'react'
import {Card} from 'antd'
import ReactECharts from 'echarts-for-react';

export default class Pie extends Component{
    
  getOption = () => {
    return {
        title : {//标题组件，包含主标题和副标题
            text: '某站点用户访问来源',//主标题文本
            subtext: '纯属虚构',//副标题文本
            x:'center'//水平方向居中
        },
        tooltip : {//提示框组件
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"//提示框浮层内容格式器,{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
        },
        legend: {
            orient: 'vertical',//图例列表的布局朝向
            left: 'left',//图例组件离容器左侧的距离。
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ],
                // roseType: 'area',//南丁格尔图(玫瑰图),所有扇区圆心角相同，仅通过半径展现数据大小
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
  }

  getOption2 = () => {
    return  {
        backgroundColor: '#2c343c',
    
        title: {
            text: 'Customized Pie',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                name:'访问来源',
                type:'pie',
                radius : '55%',//设置饼图半径
                center: ['50%', '50%'],//饼图的中心（圆心）坐标
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:274, name:'联盟广告'},
                    {value:235, name:'视频广告'},
                    {value:400, name:'搜索引擎'}
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',//扇区圆心角展现数据的百分比，半径展现数据的大小。
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',//玫瑰片颜色
                        shadowBlur: 200,//图形阴影的模糊大小
                        shadowColor: 'rgba(0, 0, 0, 0.5)'//玫瑰阴影
                    }
                },
    
                // animationType: 'scale',//初始动画效果,缩放效果，配合设置 animationEasing='elasticOut' 可以做成 popup 的效果。
                // animationEasing: 'elasticOut',
                // animationDelay: function (idx) {
                //     return idx * 20000;
                // }
            }
        ]
    };
  }

  
  render() {
    return (
      <div>
        <Card title='饼图一'>
          <ReactECharts option={this.getOption()} style={{height: 300}}/>
        </Card>
        <Card title='饼图一'>
          <ReactECharts option={this.getOption2()} style={{height: 300}}/>
        </Card>

      </div>
    )
  }
}