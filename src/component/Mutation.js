/**
 * Created by Yuan on 4/16/20.
 */


import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import * as d3 from "d3";

//const uploadedDataURL = "data/ball_data.csv"

const uploadedDataURL = "data/mutation.csv"

class Mutation extends Component {

    componentDidMount() {
        this.draw();
    }

    draw()
    {
            // set the dimensions and margins of the graph
            var margin = {top: 40, right: 0, bottom: 0, left: 40},
            width = 1000 - margin.left - margin.right,
            height = 800 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            var svg = d3.select("#mutation")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


            //const colors = ["#ffffff","red","gray","gray","blue","magenta"];

            //Read the data
            d3.csv(uploadedDataURL, function(data) {

                //console.log(data)

            // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
            var myGroups = d3.map(data, function(d){return d.position;}).keys()
            var myVars = d3.map(data, function(d){return d.acc_id;}).keys()

                //console.log(myGroups)
                //console.log(myVars)

                /*for(var i=0; i<myGroups.length; i++){
                    myGroups[i] = parseInt(myGroups[i]) + 266;
                }*/

            // Build X scales and axis:
            var xScale = d3.scale.ordinal()
                //.range([ 0, width ])
            .domain(myGroups)
            .rangeBands([ 0, width ])
            //.padding(0.05);
            //
            var xTicks = xScale.domain().filter(function(d,i){ return !(i%50); } );

                console.log(xScale.domain(),xTicks)



            var  xAxis = d3.svg.axis().scale(xScale).orient("top")
                .tickValues(xTicks)
                .tickSize(1)

            svg.append("g")
            .style("font-size", 8)
                //.style("stroke", "black")
            .attr("transform", "translate(0," + 0 + ")")
            .call(xAxis)
            //.select(".domain").remove();

            // Build Y scales and axis:
            var yScale = d3.scale.ordinal()
            .domain(myVars)
            .rangeBands([0, height])
            //.padding(0.05);

            /*var  yAxis = d3.svg.axis().scale(yScale).orient("left").tickSize(0)
            svg.append("g")
            .style("font-size", 1)
            .call(yAxis)
            .select(".domain").remove();*/

            // Build color scale
            /*var myColor = d3.scaleSequential()
            .interpolator(d3.interpolateInferno)
            .domain([1,100])*/
             //var myColor = d3.scale.ordinal()
             //.domain([0,5])
             //.range(colors)
                //console.log(xScale)
                //console.log(yScale)

             var colors2 = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]


            // create a tooltip
            var tooltip = d3.select("#mutation")
            .append("div")
                //.attr("width", 100)
                //.attr("height", 100)
            .style("opacity", 0)
            .attr("class", "tooltip")
            //.style("background-color", "white")
            //.style("background-color", "black")
            .style("border", "solid")
            .style("border-width", "1.5px")
            .style("border-radius", "5px")
            //.style("border-color", colors2[])
            .style("padding", "5px")

            // Three function that change the tooltip when user hover / move / leave a cell
            var mouseover = function(d) {

             tooltip
            .style("opacity", 1)
                 //.html("The exact value of<br>this cell is: " + d.value)
                 //.style("left", (d3.mouse(this)[0]+70) + "px")
                 //.style("top", (d3.mouse(this)[1]) + "px")

             d3.select(this)
            .style("stroke", "orange")
            .style("stroke-width", 20)
            .style("opacity", 0.3)
        }
            var mousemove = function(d) {
                console.log(d3.mouse(this))
            tooltip
            .html("Effect: " + d.mutation_ann.split('|')[3] + "<br>" +
                  "Orf: " + d.mutation_ann.split('|')[4] + "<br>" +
                  //"value: " + + d.value + "<br>" +
                  "Nucleotide: " + d.mutation_ann.split('|')[0] + "<br>" +
                  //"Codon: " + d.mutation_ann.split('|')[1] + "<br>" +
                  "Amino Acid: " + d.mutation_ann.split('|')[2] + "<br>" +
                  "Virus: " + d.head + "<br>" +
                  "Position: " + (parseInt(d.position))
            )
            //.style("left", (d3.mouse(this)[0]) + "px")
            //.style("top", (d3.mouse(this)[1]) + "px")
                .style("background-color", colors2[0])
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .style("opacity", 1)

        }
            var mouseleave = function(d) {
            tooltip
            .style("opacity", 0)

             d3.select(this)
            .style("stroke", "none")
            .style("opacity", 1)
        }

            // add the squares
            var enterGroup = svg.selectAll()
                .data(data, function(d) {
                    if (d.value !=0)
                        //return d
                        return d.position+':'+d.acc_id;
                })
            .enter()
            .append("rect")
            .attr("x", function(d) { return xScale(d.position) })
            .attr("y", function(d) { return yScale(d.acc_id) })
            //.attr("rx", 4)
            //.attr("ry", 4)
            .attr("width", xScale.rangeBand())
            .attr("height", yScale.rangeBand())
              //  .attr("width", 4)
              //  .attr("height", 4)
            .style("fill", function(d) {
                    //non-coding
                        if (d.value == 1)
                        return "cyan"
                    //Del
                        if (d.value == 2)
                        return "gray"
                    //Unknown
                        if (d.value == 3)
                        return "gray"
                    //Syn
                        if (d.value == 4)
                        return "blue"
                    //Non-Syn
                        if (d.value == 5)
                        return "magenta"
                } )
            //.style("stroke-width", 0)
            //.style("stroke", "none")
            //.style("opacity", 0.8)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
        })

            // Add title to graph


            // Add subtitle to graph
            svg.append("text")
            .attr("x", 0)
            .attr("y", -25)
            .attr("text-anchor", "left")
            .style("font-size", "14px")
            //.style("fill", "grey")
            .style("max-width", 400)
            .text("Colors represent mutations, magenta: Non-synonymous, blue: Synonymous. (Loading...)");



    }

    draw1()
    {
        const mutation_width = 600;
        const mutation_height = 800;

        //console.log('heatmap draw')
        var array_data = [];
        // 一句话定义了众多变量， 定义了块儿的位置、宽高、小格子的边长等等与布局有关的变量
        var margin = { top: 30, right: 0, bottom: 150, left: 50 },
            //width = 960 - margin.left - margin.right,        // 所有格子区域的宽度，即Heatmap的宽度
            //height = 1830 - margin.top - margin.bottom,
            width = mutation_width - margin.left - margin.right,
            height = mutation_height - margin.top - margin.bottom,
            gridSize = Math.floor(height / 24),    // 求地板，即去掉小数部分，width分成24份
            legendElementWidth = gridSize * 2,    // 底下长条的长度，是格子边长的两倍
            buckets = 9,        // 一共9种颜色级别
            colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],
        // alternatively colorbrewer.YlGnBu[9]
        // days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        //times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];
            tests = ["G","MIN","PTS","FGM","FGA","FGP","FTM","FTA","FTP","3PM","3PA","3PP","ORB","DRB","TRB","AST","STL","BLK","TO","PF"];
        // 函数，读取 CSV 文件
        d3.csv(uploadedDataURL, //function(d) {}, function(error, data) {} );

            // 每一行的数据
            /*function(d) {
             return {
             day: +d.day,
             hour: +d.hour,
             value: +d.value
             };
             },*/

            function(error, data) {

                console.log(data)
                /*if(error){
                 console.log(error);
                 }
                 console.log(csvdata);*/
                // colorScale：颜色级别
                var colorScale = d3.scale.quantile()        // 按分位数取值，可使每个区域内元素个数相等
                    .domain([0, buckets - 1, d3.max(data, function (d) { return d.G; })])  // 定义域
                    // domain([0, n, 数据的最大值]);
                    .range(colors);    // 值域：是颜色数组，函数的返回值是代表某种颜色的字符串

                // 设置chart，svg
                var svg = d3.select("#mutation_heatmap").append("svg") // 选择“chart”（就是div），加入一个svg，设置属性跟div一样大
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")    // 在svg内加入一个g（group组），并设置元素g的显示位置
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                // 编辑姓名行
                /*var dayLabels = svg.selectAll(".nameLabel")
                    .data(data)
                    .enter()    // 为data中每一项创建一个".dayLabel"
                    .append("text")    // 为days中每一项创建一的".dayLabel"添加文本，下面全是设置文本的属性
                    .text(function (d, i) { return data[i].name; })
                    .attr("x", 0)
                    .attr("y", function (d, i) { return i * gridSize; })
                    .style("text-anchor", "end")
                    .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
                    .attr("class", function (d, i)
                    { return ((i >= 0 && i <= 4) ? "nameLabel mono axis axis-workweek" : "nameLabel mono axis"); }
                );*/

                // 编辑测试项行
                var timeLabels = svg.selectAll(".testLabel")
                    .data(tests)
                    .enter().append("text")
                    .attr("font-size",10)
                    .text(function(d) { return d; })
                    .attr("x", function(d, i) { return i * gridSize; })
                    .attr("y", -10)
                    .style("text-anchor", "middle")
                    //.attr("transform", "translate(" + gridSize / 2 + ", -6)")
                    .attr("transform", function (d, i) {
                        return "rotate(90," + i * gridSize +","+-10+")";
                    })
                    //.attr("transform", "rotate(90)")
                    .attr("class", function(d, i) {
                        return ((i >= 7 && i <= 16) ? "testLabel mono axis axis-worktime" : "testLabel mono axis"); }
                );

                // 画出格子，暂不涂色，color[0]
                for (var i = 0; i < 50; i++){
                    array_data[i*20] = data[i].G;
                    array_data[i*20+1] = data[i].MIN;
                    array_data[i*20+2] = data[i].PTS;
                    array_data[i*20+3] = data[i].FGM;
                    array_data[i*20+4] = data[i].FGA;
                    array_data[i*20+5] = data[i].FGP;
                    array_data[i*20+6] = data[i].FTM;
                    array_data[i*20+7] = data[i].FTA;
                    array_data[i*20+8] = data[i].FTP;
                    array_data[i*20+9] = data[i].P3PM;
                    array_data[i*20+10] = data[i].P3PA;
                    array_data[i*20+11] = data[i].P3PP;
                    array_data[i*20+12] = data[i].ORB;
                    array_data[i*20+13] = data[i].DRB;
                    array_data[i*20+14] = data[i].TRB;
                    array_data[i*20+15] = data[i].AST;
                    array_data[i*20+16] = data[i].STL;
                    array_data[i*20+17] = data[i].BLK;
                    array_data[i*20+18] = data[i].TO;
                    array_data[i*20+19] = data[i].PF;
                }


                var heatMap = svg.selectAll(".score")
                    .data(array_data)
                    .enter()        // 为data中每一项创建一个".hour"
                    .append("rect")
                    .attr("x", function(d, i){ return (i % 20)*gridSize;})
                    .attr("y", function(d, i){ return parseInt(i / 20)*gridSize;})
                    .attr("rx", 6)
                    .attr("ry", 6)
                    //.attr("class", "hour bordered")
                    .attr("width", gridSize)
                    .attr("height", gridSize)
                    .style("fill", "#FFFFFF");

                // duration(1000) 在1000ns也就是1s内将格子图上色
                heatMap.transition().duration(1000)
                    .style("fill", function(d) {
                        if (d < 10)
                        return "#FFFFFF";
                        else
                        return colorScale(d);
                    });

                // 鼠标停留显示value
                heatMap.append("title").text(function(d) { return d.G; });

                // legend 是一个有7个组的什么东西，，，
               /* var legend = svg.selectAll(".legend")
                    .data([0].concat(colorScale.quantiles()), function(d) { return d; })    // 由data获得的元素个数为7
                    .enter().append("g")
                    .attr("class", "legend");

                legend.append("rect")
                    .attr("x", function(d, i) { return legendElementWidth * i; })
                    .attr("y", height)
                    .attr("width", legendElementWidth)
                    .attr("height", gridSize / 2)
                    .style("fill", function(d, i) { return colors[i]; });

                legend.append("text")
                    .attr("class", "mono")
                    .text(function(d) { return ">= "+Math.round(d); })
                    .attr("x", function(d, i) { return legendElementWidth * i; })
                    .attr("y", height + gridSize);*/
            });
    }

    render()
    {
        return <div id="mutation"></div>
    }
}

export default Mutation;