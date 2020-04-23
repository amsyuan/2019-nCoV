/**
 * Created by Yuan on 4/3/20.
 */
/**
 * Created by Yuan on 3/26/20.
 */

import React, {Component} from 'react';


import $ from 'jquery'

//import $ from '../../js/lib/jquery';

//import echarts from 'echarts/lib/echarts';


import ReactEcharts from 'echarts-for-react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts';

import  'echarts/lib/chart/bar';
import  'echarts/lib/chart/map';


import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import 'echarts/map/js/china';
import 'echarts/map/js/world';


function getObjectKeys(object)
{
    var keys = [];
    for (var property in object)
        keys.push(object[property]['name']);
    //console.log(keys);
    return keys;
}

function getObjectValues(object)
{
    var values = [];
    for (var property in object)
        values.push({'value':object[property]['value'],
            'cured':object[property]['cured'],'dead':object[property]['dead'],'active':object[property]['active'],
            'visualMap':false,'itemStyle':{'color':"red"}
        });
    //console.log(values);
    return values;
}

/*function getConfirmedValues(object)
{
    var values = [];
    for (var property in object)
        values.push({'value':object[property]['value'],
            'visualMap':false,'itemStyle':{'color':"red"}
        });
    //console.log(values);
    return values;
}*/

function getCuredValues(object)
{
    var values = [];
    for (var property in object)
        values.push({'value':object[property]['cured'],
            'visualMap':false,'itemStyle':{'color':"blue"},tooltip:false,
        });
    //console.log(values);
    return values;
}

function getDeadValues(object)
{
    var values = [];
    for (var property in object)
        values.push({'value':object[property]['dead'],
            'visualMap':false,'itemStyle':{'color':"green"},tooltip:false,
        });
    //console.log(values);
    return values;
}


//data url
const uploadedDataURL = "data/epidata.json";

class WorldMap extends Component {

    constructor(props){
        super(props);
        this.state = {
            totalData1:[],
            totalData2:[],
            totalData3:[],
            cases_day_country:[],
            current_country : 'China'
        };
        //this.echartsReact = React.createRef()
    }


    getData() {
        fetch(uploadedDataURL)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                this.setState({totalData1: data.world, totalData2: data.world, totalData3: data.world,cases_day_country: data.cases_day_country})
                //console.log(this.state)

            })
            .catch(e => console.log('错误:', e))
    }

    getOption() {

        const totalData1 = this.state.totalData1
        const totalData2 = this.state.totalData2
        const totalData3 = this.state.totalData3
        const cases_day_country = this.state.cases_day_country
        var current_country = this.state.current_country
        //var current_country = 'United Kingdom'


        //console.log(cases_day_country[current_country])

        //console.log(getObjectValues(cases_day_country[current_country]))

        const world_pieces = [
            {
                "max": 1000000,
                "min": 100000,
                "label": "> 100000"
            },
            {
                "max": 100000,
                "min": 50000,
                "label": "50000 - 100000"
            },
            {
                "max": 50000,
                "min": 10000,
                "label": "10000 - 50000"
            },
            {
                "max": 10000,
                "min": 5000,
                "label": "5000 - 10000"
            },
            {
                "max": 5000,
                "min": 1000,
                "label": "1000 - 5000"
            },
            {
                "max": 1000,
                "min": 500,
                "label": "500 - 1000"
            },
            {
                "max": 500,
                "min": 0,
                "label": "0 - 500"
            },
        ]

        //
        const option = {
            animation: false,
            title: {
                text: 'Current hCoV-19 Infection Situation Worldwide',
                subtext: 'Update Time: 2020-04-22',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',

                formatter: function(params) {
                    //console.log(params)
                 let tip = ''
                 if (params.data) {
                     if ('cured' in params.data && 'dead' in params.data)
                     {
                         tip =
                             params.name +
                             '：<br>确诊：' +
                             params.data['value'] +
                             '例<br>治愈：' +
                             params.data['cured'] +
                             '例<br>死亡：' +
                             params.data['dead'] +
                             '例<br>现存：' +
                             params.data['active'] +
                             '例'
                     }
                     return tip
                 }
                 }

            },

            visualMap: {
                show: true,
                type: 'piecewise',
                pieces: world_pieces,
                left: 'left',
                top: 'bottom',
                calculable: true

                /*align: 'right',
                top: '2%',
                right: 0,*/
            },

            color:['red', 'blue', 'green'],

            legend: {
                orient: 'horizontal',
                left: 'right',
                data: ['Confirmed', 'Cured', 'Dead'],

                //selectedMode: 'single',
            },

            toolbox: {
                show: false,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            grid: {
                left: '60%',
                width: '40%'
            },

            geo: [{
                 roam: true,
                type: 'map',
                map: 'world',
                left: 'left',
                right: 'middle',

                label: {
                    normal: {
                        fontSize: '10',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                /*itemStyle: {
                 normal: {
                 borderColor: '#aaa',
                 areaColor: '#555'
                 },
                 }*/
            }],

            yAxis: [{
                //type: 'value',
                name: current_country,
                boundaryGap: true,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: true
                },
                axisTick: {
                    show: true
                },
                //,
                /*data:[1,2,3,4],
                name: 'Cases'
                min: 0,
                max: 250,*/
                //interval: 20000
            }],

            xAxis: [{
                //type: 'value',
                axisTick: {
                    alignWithLabel: false
                },
                axisLine: {
                    show: true
                },
                splitLine: {
                    show: false
                },
                data: getObjectKeys(cases_day_country[current_country]),

                //data:['a','b','c','d'],
            }],

            series: [
                {
                    z:0,
                    name: 'Confirmed',
                    type: 'map',
                    showLegendSymbol: false,
                    geoIndex: 0,

                    /*label: {
                     normal: {
                     show: true
                     },
                     emphasis: {
                     show: true
                     }
                     },*/

                    data: totalData1,
                },
                {
                    z:0,
                    name: 'Cured', //cured
                    type: 'map',
                    geoIndex: 0,
                    showLegendSymbol: false,
                    //data: totalData2,
                },
                {
                    z:0,
                    name: 'Dead', //dead
                    type: 'map',
                    geoIndex: 0,
                    showLegendSymbol: false,
                    //data: totalData3,
                },
                {
                    name: 'Confirmed',
                    z: 2,
                    type: 'bar',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true,
                            position: 'top',
                        }
                    },
                    yAxisIndex: 0,
                    itemStyle: {
                     emphasis: {
                     color: "rgb(0,153,78)"
                     }
                     },
                    //data: cases_day_country[current_country],
                    data: getObjectValues(cases_day_country[current_country])
                },
                {
                    name: 'Cured',
                    z: 2,
                    type: 'bar',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            color: "rgb(0,153,78)"
                        }
                    },
                    data: getCuredValues(cases_day_country[current_country])
                },
                {
                    name: 'Dead',
                    z: 2,
                    type: 'bar',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            color: "rgb(0,153,78)"
                        }
                    },
                    data: getDeadValues(cases_day_country[current_country])
                }
            ]
        }
        //console.log(this.state)
        return option;
    }

    componentWillMount() {
    }

    componentDidMount(){

        //const { provinceName, mapList } = this.props

        /*const province = provinceName ? provinceMap[provinceName] : ''

        const chinaMapJson = await getChinaJson()
        echarts.registerMap('china', chinaMapJson.data)*/

        this.getData()

        /*var myChart = echarts.init(document.getElementById('map'));
         myChart.setOption(option);*/

    };


    onChartClick = (params)=>{
        // Do what you want to do on click event. params depend on the  type of  chart
        this.state.current_country = params.name
        this.echartsReact.getEchartsInstance().setOption(this.getOption())
        //console.log(params.name)
        //console.log(this.echartsReact.props.option)
    }

    _onEvents = {
        'click': this.onChartClick,
        //'click': this.onChartClick.bind(this),
        //'dataZoom': this.onDataZoom,
    }

    /*onChartReadyCallback=()=>{
        setTimeout(()=>{
            this.setState({
                loadingChart: false
            });
        } ,2000);
    }*/


    render(){
        return(
            <ReactEcharts
                ref={(e) => { this.echartsReact = e }}
                className = 'mapbox'
                option={this.getOption()}
                notMerge={true}
                onEvents= {this._onEvents}
           />
        )
    }

}

// lazyUpdate={(this.getOption(),false)}
//onChartReady={this.onChartReadyCallback}

export default WorldMap;