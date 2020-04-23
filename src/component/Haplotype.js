/**
 * Created by Yuan on 4/4/20.
 */



import React, {Component} from 'react';
import * as d3 from "d3";

import $ from 'jquery'


//d3v4.13.0

const uploadedDataURL = "data/2020-04-01-china-hap.json"

//const uploadedDataURL = "data/2020-03-29-world-hap.json"



/*function  draw() {

    const data = [12, 5, 6, 6, 9, 10]
    const width = 300
    const height = 200

    //const data = this.props.data;

    //const data = [12, 5, 6, 6, 9, 10];

    /*const svg = d3.select("body")
     .append("svg")
     .attr("width", w)
     .attr("height", h)
     .style("margin-left", 100);*/

    /*const svg = d3.select(document.getElementById('d3-bar')).append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 70)
        .attr("y", (d, i) => height - 10 * d)
        .attr("width", 65)
        .attr("height", (d, i) => d * 10)
        .attr("fill", "green")

    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text((d) => d)
        .attr("x", (d, i) => i * 70)
        .attr("y", (d, i) => height - (10 * d) - 3)

    console.log('draw ok')
}*/




class Haplotype extends Component {

    /*constructor(props){
        super(props);
        this.state = {
            nodes:[],
            links:[]
        };
    }

    getData() {
        fetch(uploadedDataURL)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                this.setState({nodes: data.nodes, links: data.links})
                //console.log(this.state)
                //console.log(this.state)

            })
            .catch(e => console.log('错误:', e))
    }


   os () {
        let ua = navigator.userAgent,
            isWindowsPhone = /(?:Windows Phone)/.test(ua),
            isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
            isAndroid = /(?:Android)/.test(ua),
            isFireFox = /(?:Firefox)/.test(ua),
            isChrome = /(?:Chrome|CriOS)/.test(ua),
            isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
            isPhone = /(?:iPhone)/.test(ua) && !isTablet,
            isPc = !isPhone && !isAndroid && !isSymbian;
        //console.log(isChrome)
        return {
            isTablet: isTablet,
            isPhone: isPhone,
            isAndroid: isAndroid,
            isPc: isPc
        };
    }*/

    drawhap() {

        d3.json(uploadedDataURL, function (graph) {

            console.log(graph)

            d3.selectAll(".svgContainer > *").remove();


            console.log('in drawhap')

            const colorCustom = ["#d62728", "#9467bd", "#8c564b", "#e377c2", "#1c7f7c",
                "#7f7f7f", "#bcbd22", "#17becf", "#1f77b4",
                "#ff7f0e", "#2ca02c", '#d48265', '#2f4554',
                '#61a0a8', '#91c7ae', '#749f83', '#ca8622',
                '#bd4829', '#546570', "#606dff", "#1d83f4",
                "#2f67b9", "#4548f4", "#123754", "#7f7f7f",
                "#f468c2", "#ffeb3b", "#346270", "#ff2f23",
                "#cf9e19", "#2507f4", "#f427ab", "#D84E0C",
                "#9c0df4", "#2b1a7f", "#ffeb3b", "#699f2c",
                "#ff19ec", "#75fff3", "#ca84ff", "#ff0c1b",
                "#1bff2c", "#b695f4", "#197f59", "#4548f4",
                "#419f42", "#2325f4", "rgba(62,21,60,0.91)"
            ];


            console.log('data nodes', graph.nodes)
            console.log('data links', graph.links)

            // 数据预处理
            let country = graph.nodes.map(a => a.pieChart.map(a => a.color))

            console.log('country', country)

            let uniqueCountry = []
            country.forEach(c => uniqueCountry = uniqueCountry.concat(c))
            uniqueCountry = Array.from(new Set(uniqueCountry))
            let countCount = uniqueCountry.map(a => 0)

            //safari sort 兼容性有问题
            graph.nodes.forEach(a => a.pieChart.forEach(b => countCount[uniqueCountry.indexOf(b.color)] += a.radius * b.percent))
            uniqueCountry.forEach((a, i) => uniqueCountry[i] = {"country": a, "count": countCount[i]})
            uniqueCountry.sort((a, b) => {
                return (b.count > a.count) ? 1 : (b.count < a.count) ? -1 : 0;
            }) //按照国家或城市的菌株数量排序


            // 不确定有何作用，暂时屏蔽
            // graph.nodes.forEach(b =>
            //     b.nodeLinks = graph.links.filter(
            //         a => a.target === b.id || a.source === b.id
            //     ).length
            // )

            var DEFAULT_OPTIONS = {
                radius: 30,
                outerStrokeWidth: 10,
                parentNodeColor: 'white',
                showPieChartBorder: false,
                pieChartBorderColor: 'white',
                pieChartBorderWidth: '2',
                showLabelText: false,
                labelText: 'text',
                labelColor: 'blue'
            };

            function drawParentCircle(nodeElement, options) {
                let outerStrokeWidth = 1;
                let radius = options.radius;
                let parentNodeColor = "white";

                nodeElement.insert("circle")
                    .attr("id", "parent-pie")
                    .attr("r", radius)
                    .attr("fill", function (d) {
                        return parentNodeColor;
                    })
                    .attr("stroke", function (d) {
                        return parentNodeColor;
                    })
                    .attr("stroke-width", outerStrokeWidth)
                ;
            }


            function drawPieChart(nodeElement, percentages, options) {
                var radius = options.radius;
                var halfRadius = radius / 2;
                var halfCircumference = 2 * Math.PI * halfRadius;
                var arc = d3.svg.arc();

                var pie = d3.layout.pie()
                    .value(function (d) {
                        return d.percent;
                    })
                var data_ready = pie(d3.entries(percentages))

                var percentToDraw = 0;
                for (var p in percentages) {
                    nodeElement
                        .insert('path', '#parent-pie + *')
                        .attr('d', arc({
                            innerRadius: 0,
                            outerRadius: radius,
                            startAngle: Math.PI * 2 * percentToDraw / 100,
                            endAngle: Math.PI * 2 * (percentToDraw + percentages[p].percent) / 100
                        })
                    )
                        .attr('fill', colorCustom[uniqueCountry.map(a => a.country).indexOf(percentages[p].color)])
                        .attr("stroke", colorCustom[uniqueCountry.map(a => a.country).indexOf(percentages[p].color)])
                        .attr("class", percentages[p].color)
                        .on("mouseleave", d => {
                            d3.select("#test").remove()
                            d3.selectAll("." + percentages[p].color)
                                .attr("stroke", null)
                        }
                    )
                    /*.on("mouseover", function (d) {
                     // d3.select("#test").remove()
                     const selection = svg.append('g')
                     .attr("id", "test")
                     .attr("transform", "translate(" + d3.select(this)._groups[0][0].__data__.x + "," + (d3.select(this)._groups[0][0].__data__.y - 20) + ")");

                     const backgroundRect = selection.selectAll('rect')
                     .data([null]);

                     const textHeight = d3.select(this)._groups[0][0].__data__.pieChart.length
                     backgroundRect.enter().append('rect')
                     .merge(backgroundRect)
                     .attr('rx', 10)
                     .attr('width', 150)
                     .attr('height', (textHeight+1) * 15)
                     .attr('fill', '#d4d4d5')
                     .attr('opacity', 0.8);

                     const groups = selection.selectAll('.tick2')
                     .data(d3.select(this)._groups[0][0].__data__.pieChart);
                     const groupsEnter = groups
                     .enter().append('g')
                     .attr('class', 'tick2');
                     groupsEnter
                     .merge(groups)
                     .attr('transform', (d, i) =>
                     `translate(0, ${(i+1) * 13})`
                     );
                     groups.exit().remove();

                     // console.log(groupsEnter);
                     groupsEnter.append('text')
                     .merge(groups.select('text'))
                     .text(d => {
                     // console.log(d);
                     return d.color + ":" + Math.round(d.percent) + "%";
                     }
                     )
                     .attr('dy', '0.32em')
                     .attr('x', 10);

                     d3.selectAll("." + percentages[p].color)
                     .attr("stroke-width", "5px")
                     .attr("stroke", "#ffcc00")

                     d3.select("#info").text("")
                     d3.select("#detail").text("")



                     // d3.select("#info")
                     //     .selectAll("tspan")
                     //     .data(d3.select(this)._groups[0][0].__data__.pieChart)
                     //     .enter()
                     //     .append('tspan')
                     //     .text(d => d.color + ":" + Math.round(d.percent) + "%")
                     //     .attr('y', d3.select(this)._groups[0][0].__data__.y)
                     //     .attr('dy', (d,i) => i + 'em')
                     //     .attr('x', d3.select(this)._groups[0][0].__data__.x + halfRadius)

                     d3.select("#detail").text("Virus").attr('x', width / 9 * 7-30)
                     d3.select("#detail")
                     .selectAll("tspan")
                     .data(d3.select(this)._groups[0][0].__data__.Virus)
                     .enter()
                     .append('tspan')
                     .text(d => d.name + " ("+d.date+")")
                     .on('click', function (d) {
                     window.open("https://bigd.big.ac.cn/ncov/genome/accession?q=" + d.acc, "_blank");
                     })
                     .on("mouseover", function (d) {
                     d3.select(this).style("cursor", "pointer")
                     })
                     .attr("font-size", "12px")
                     .attr('fill', "rgb(59,129,204)")
                     .attr('dy', '1em')
                     .attr('x', width / 9 * 7-30)

                     });*/
                    percentToDraw += percentages[p].percent;
                }

            }

            function drawTitleText(nodeElement, options) {
                let text = options.labelText

                nodeElement.append("text")
                    .text(String(text))
                    .attr("fill", "white")
                    .attr("dy", 4)
                    .attr("dx", -4)
                    .attr("class", "t1")
                    .attr("font-size", "10px");
                ;
            }

            let NodePieBuilder = {
                drawNodePie: function (nodeElement, percentages, options) {
                    //console.log(nodeElement)
                    drawParentCircle(nodeElement, options); //外层圈
                    //console.log(nodeElement)
                    drawPieChart(nodeElement, percentages, options); //扇形
                    drawTitleText(nodeElement, options); //圈里面的文字
                }
            };

            //自适应
            function responsivefy(svg) {
                let container = d3.select(svg.node().parentNode),
                    width = parseInt(svg.style("width")),
                    height = parseInt(svg.style("height")),
                    aspect = width / height;
                svg.attr("viewBox", "0 0 " + width + " " + height)
                    .attr("perserveAspectRatio", "xMinYMid")
                    .call(resize);
                d3.select(window).on("resize." + container.attr("id"), resize);

                function resize() {
                    let targetWidth = parseInt(container.style("width"));
                    svg.attr("width", targetWidth);
                    svg.attr("height", Math.round(targetWidth / aspect));
                }
            }

            //let winWidth = $('.ui.container').width();
            let winWidth = "100%";
            let winHeight = 600;
            let imageCenter;
            let legendTextSize = 8;

            //if (this.os.isAndroid || this.os.isPhone || this.os.isTablet) {
            //    winWidth = document.body.clientWidth || document.documentElement.clientWidth || window.screen.width
            //    winHeight = 500;
            //    legendTextSize = 10;
            //}

            let svg = d3.select(".svgContainer").append("svg")
                .attr("width", winWidth)
                .attr("height", winHeight)
            //.attr("viewBox", `${-winWidth/4} ${-winHeight/4} ${winWidth*2} ${winHeight*2}`)
                .call(responsivefy);

            let width = svg.attr("width")
            let height = svg.attr("height")

            //console.log(width)
            //console.log(height)


            // if (this.os.isAndroid || this.os.isPhone || this.os.isTablet) {
            //     imageCenter = d3.forceCenter(width / 9 * 6, height / 2);
            // }else{
            //    imageCenter = d3.forceCenter(width / 9 * 4, height / 2.5);
            // }


            /*var visF = svg.append("g").attr("id", "visF");

            function redrawVisF () {
                svg.attr("transform","translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
            }*/

            function rescale() {
                var trans=d3.event.translate;
                var scale=d3.event.scale;

                svg.attr("transform",
                    "translate(" + trans + ")"
                    + " scale(" + scale + ")");
            }

            let g = svg.append('g')
                //.call(d3.behavior.zoom().on('zoom', rescale))
            .call(d3.behavior.zoom().on('zoom', () => {
               g.attr('transform', d3.event.transform);
                    //g.attr('transform',redrawVisF);
            })); //图像的载体

            /*if (!mousedown_node && !mousedown_link) {
                // allow panning if nothing is selected
                svg.call(d3.behavior.zoom().on("zoom"), rescale);
                return;
            }

            if (!mousedown_node && !mousedown_link) {
                // allow panning if nothing is selected
                force.start();
                svg.call(d3.behavior.zoom().on("zoom"), null);
                return;
            }*/


            var lineScale = d3.scale.log()
                .domain(d3.extent(graph.links.map(a => a.distance)))
                .range([width / 4 * 35 / 300, width / 4]);

            var nodeScale = d3.scale.sqrt()
                .domain(d3.extent(graph.nodes.map(a => a.radius)))
                .range([width / 4 * 40 / 300 * 12 / 40, width / 4 * 40 / 300]);

            /*var simulation = d3.forceSimulation()
             .force("link", d3.forceLink()
             .id(function (d) {
             return d.id;
             })
             .distance(function (d) {
             return lineScale(d.distance) + nodeScale(d.source.radius) / 2 + nodeScale(d.target.radius) / 2
             }).strength(1)) //link长度的距离固定
             .force("charge", d3.forceManyBody().distanceMin(50))
             .force("center", imageCenter);*/

            //var nodes = {};
            var nodes = graph.nodes;
            var links = graph.links;

            /*var links = [
             {source: 'H', target: 'I'},
             {source: 'H', target: 'J'},
             {source: 'I', target: 'J'},
             {source: 'J', target: 'K'},
             ];*/


            //var links = []

            /*var sources = [];
            var targets = [];


            for (var i = 0; i < graph.links.length; i++) {
                sources[i] = parseInt(graph.links[i].source)
                targets[i] = parseInt(graph.links[i].target)
            }

            console.log('sources', sources)


            links.forEach(function (link, index) {
                //const sindex = parseInt(link.source.split("_")[1])
                //const tindex = parseInt(link.target.split("_")[1])
                link.source = nodes[sources[index]];
                link.target = nodes[targets[index]];
            });*/



            links.forEach(function(link) {
                var source = link.source.id
                var target = link.target.id

                console.log(source,target)

                //if (typeof d.source == "number") { d.source = nodes[d.source]; }
                //if (typeof d.target == "number") { d.target = nodes[d.target]; }

                /*if (typeof graph.nodes[link.source] === 'undefined') {
                    console.log('undefined source', link);
                }
                if (typeof graph.nodes[link.target] === 'undefined') {
                    console.log('undefined target', link);
                }*/

                //index - 1

                link.source = nodes[link.source];
                link.target = nodes[link.target];

                //link.source = nodes[source];
                //link.target = nodes[target];
                //d.source = nodes[0]
                //d.target = nodes[1]


             });

            console.log(nodes)
            console.log(links)

            var w = 800*1.5,
                h = winHeight

            var force = d3.layout.force()
                .size([w, h])
                .nodes(nodes)
                .links(links)
                //.linkDistance(10)
                .linkDistance(function (d) {
                    return lineScale(d.distance) + nodeScale(d.source.radius) / 2 + nodeScale(d.target.radius) / 2
                })
                .gravity(.05)
                .charge(-150)

                //.gravity(.15)
                //.friction(.8)
                //.linkStrength(0.5)
                //.charge(-200)
                //.chargeDistance(500)
                .on("tick", ticked)
                .start();

            //console.log('force nodes', nodes)
            //console.log('force links', links)

            /*var link = svg.selectAll('.link')
             .data(links)
             .enter().append('line')
             .attr('class', 'link');

             var node = svg.selectAll('.node')
             .data(force.nodes())
             .enter().append('circle')
             .attr('class', 'node')
             .attr('r', width * 0.01)*/

            var link = g
                .attr("class", "links")
                .selectAll("line")
                //.data(links)
                .data(links)
                .enter().append("line")
                .attr("stroke-width", function (d) {
                    return Math.sqrt(d.value);
                })
                .attr("stroke", "#999")
                .on("mouseover", function (d) {
                    d3.select("#info")
                        .text("distance: " + d.distance)
                })

            var node = g
                .attr("class", "nodes")
                .selectAll("g")
                //.data(nodes)
                .data(nodes)
                .enter()
                .append("g")
                .attr("radius", function (d) {
                    return d.radius;
                })
            /*.call(d3.behavior.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));*/

            node.each(function (d) {
                NodePieBuilder.drawNodePie(d3.select(this), d.pieChart, {
                    parentNodeColor: "white",
                    outerStrokeWidth: 1,
                    showLabelText: true,
                    labelText: d.radius,
                    radius: nodeScale(d.radius)
                });
            });

            //node.selectAll("path")
            //    .attr("transform", d => "translate(" + d.x + "," + d.y + ")")

            //console.log('nodes',graph.nodes)
            //console.log('links',graph.links)


            /*simulation
             .nodes(graph.nodes)
             .on("tick", ticked);

             simulation.force("link")
             .links(graph.links);*/

            var legendContainer = svg.append("g")
             .attr('transform', `translate(10, 40)`)
             .selectAll('.tick')
             .data(uniqueCountry)
             .enter().append('g')
             .attr('class', 'tick');

             const groups = svg.append("g")
             .attr('transform', `translate(10, 40)`)
             .selectAll('.tick')
             .data(uniqueCountry);

            //console.log('groups', groups)

            const groupsEnter = groups
             .enter().append('g')
             .attr('class', 'tick')
             .on("mouseover", d =>
             {
             d3.selectAll("." + d.country)
             .attr("stroke-width", "5px")
             .attr("stroke", "#ffcc00")
             }
             )
             .on("mouseleave", d =>
             {
             d3.selectAll("." + d.country)
             .attr("stroke", null)
             }
             );

            groupsEnter
             //.merge(groups)
             .attr('transform', (d, i) =>
             `translate(0, ${i * 20})`
             );
             groups.exit().remove();


             groupsEnter.append('rect')
             //.merge(groups.select('rect'))
             .attr("width", 30)
             .attr("height", 10)
             .attr("fill", (d, i) => colorCustom[i]);

             groupsEnter.append('text')
             //.merge(groups.select('text'))
             .text(d => d.country + " (" + Math.round(d.count / 100) + ")")
             .attr("fill", "#555")
             .attr('x', 35)
             .attr('dy', 9)
             .attr("font-size", legendTextSize);

             /*svg.append("text")
             // .text("Country")
             .attr("fill", "black")
             .attr("dx", width / 12)
             .attr("dy", 110)
             .attr("font-size", "15px");

             let textPanel = svg.append("text")
             .attr("x", width / 9 * 6-30)
             .attr("y", 30)
             .attr("id", "info")
             .text("")
             .attr("font-size", "15px")
             .style("fill", "#555")

             textPanel = svg.append("text")
             .attr("x", width / 9 * 7-30)
             .attr("y", 30)
             .attr("id", "detail")
             .text("")
             .attr("font-size", "15px")
             .style("fill", "#555")*/


            function ticked() {
                link
                    .attr("x1", function (d) {
                        return d.source.x;
                    })
                    .attr("y1", function (d) {
                        return d.source.y;
                    })
                    .attr("x2", function (d) {
                        return d.target.x;
                    })
                    .attr("y2", function (d) {
                        return d.target.y;
                    });


                node
                    /*.attr("x", function (d) {
                        return d.x;
                    })
                    .attr("y", function (d) {
                        return d.y;
                    })*/
                    /*.attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")"
                    })
                    .attr('transform', function (d) {
                        return 'translate(' + d.x + ',' + d.y + ')';
                    })*/
                    .selectAll("path")
                    .attr("transform", d => "translate(" + d.x + "," + d.y + ")")

                d3.selectAll("circle").attr("cx", function (d) {
                    return d.x;
                })
                    .attr("cy", function (d) {
                        return d.y;
                    });

                d3.selectAll("text.t1")
                    .attr("x", function (d) {
                        return d.x;
                    })
                    .attr("y", function (d) {
                        return d.y;
                    });
            }

            function dragstarted(d) {
                //if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }

            function dragended(d) {
                /*if (!d3.event.active)
                 simulation.alphaTarget(0);
                 d.fx = null;
                 d.fy = null;*/
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }

        })
    }


    /*plotNet() {

        //d3.selectAll(".svgContainer > *").remove(); //清除当前图片
        console.log('in plotNet')
        console.log(this.state)

        //d3.json(fileName, draw())

        //var graph = d3.json(fileName)


        //console.log(graph)

        this.drawhap(this.state)

        //console.log('plotNet')

        //console.log(graph)

    }*/


    componentDidMount(){
        //this.getData();
        //console.log(this.state)
        //this.plotNet()
        this.drawhap()

    };


    render(){
        //this.getData();
        //plotNet(this.state);
        return <div class='svgContainer'></div>
        //return <div id='d3-bar' width='100%'></div>
        /*return <div id={"#" + this.props.id}></div>*/
    }
}

export default Haplotype;