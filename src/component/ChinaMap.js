/**
 * Created by Yuan on 3/26/20.
 */

import React, {Component} from 'react';


import $ from 'jquery'

//import $ from '../../js/lib/jquery';

//import echarts from 'echarts/lib/echarts';


import ReactEcharts from 'echarts-for-react';
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


class ChinaMap extends Component {

    constructor(props){
        super(props);
        this.state = {
            totalData:[],
            cases_day_province:[],
            current_province : '北京'
        };
    }

    getData() {
        fetch(uploadedDataURL)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                this.setState({totalData: data.china, cases_day_province: data.cases_day_province})
                console.log(this.state)
                //console.log(this.state)

            })
            .catch(e => console.log('错误:', e))
    }

    getOption() {

        const totalData = this.state.totalData
        const cases_day_province = this.state.cases_day_province
        var current_province = this.state.current_province

        const china_pieces = [
            {
                "max": 100000,
                "min": 50000,
                "label": " > 50000"
            },
            {
                "max": 50000,
                "min": 1000,
                "label": "1000 - 50000"
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
                "min": 100,
                "label": "100 - 500"
            },
            {
                "max": 100,
                "min": 0,
                "label": "< 100"
            }
        ]

        //
        const option = {
            animation: false,
            title: {
                text: 'Current hCoV-19 Infection Situation in China',
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


            color:['red', 'blue', 'green'],

            legend: {
                orient: 'horizontal',
                left: 'right',
                data: ['Confirmed', 'Cured', 'Dead'],
                //selectedMode: 'single',
            },
            visualMap: {
                show: true,
                type: 'piecewise',
                pieces: china_pieces,
                left: 'center',
                top: 'center',
                calculable: true
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
            geo: {
                roam: true,
                type: 'map',
                map: 'china',
                left: 'left',

                label: {
                    normal: {
                        fontSize: '10',
                        show: true
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
                regions: [{
                    name: '南海诸岛',
                    value: 0,
                    fontSize: '0',
                    itemStyle: {
                        normal: {
                            opacity: 100,
                            label: {
                                show: false,
                            }
                        },
                    }
                }],
            },

            yAxis: [{
                type: 'value',
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
                name: current_province
            }],

            xAxis: [{
                type: 'category',
                data: getObjectKeys(cases_day_province[current_province]),
                axisTick: {
                    alignWithLabel: false
                }
            }],

            series: [
                {
                    z:0,
                    name: 'Confirmed',
                    type: 'map',
                    showLegendSymbol: false,
                    geoIndex: 0,

                    label: {
                     normal: {
                     show: false
                     },
                     emphasis: {
                     show: true
                     }
                     },

                    data: totalData,
                },
                /*{
                    z:0,
                    name: 'Active',
                    type: 'map',
                    geoIndex: 0,
                    showLegendSymbol: false,
                    data: []
                },
                {
                    z:0,
                    name: 'Death',
                    type: 'map',
                    geoIndex: 0,
                    showLegendSymbol: false,
                    data: []
                },*/
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
                    itemStyle: {
                     emphasis: {
                     color: "rgb(0,153,78)"
                     }
                     },
                    yAxisIndex: 0,

                    data: getObjectValues(cases_day_province[current_province])
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
                            position: 'top',
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            color: "rgb(0,153,78)"
                        }
                    },
                    data: getCuredValues(cases_day_province[current_province])
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
                            position: 'top',
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            color: "rgb(0,153,78)"
                        }
                    },
                    data: getDeadValues(cases_day_province[current_province])
                },
            ]
        }
        //console.log(this.state)
        return option;
    }

    componentWillMount() {
    }

    componentDidMount(){
        this.getData();
        /*var myChart = echarts.init(document.getElementById('map'));
        myChart.setOption(option);*/

    };

    onChartClick = (params)=>{
        // Do what you want to do on click event. params depend on the  type of  chart
        this.state.current_province = params.name
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

//lazyUpdate={(this.getOption(),false)}
// onChartReady={this.onChartReadyCallback}

export default ChinaMap;