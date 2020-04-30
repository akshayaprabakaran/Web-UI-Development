import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import CanvasJSReact from '../../assets/canvasjs.react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { MDBContainer } from 'mdbreact';
//disableScroll.on(); 



var CanvasJSChart = CanvasJSReact.CanvasJSChart;
Highcharts.setOptions({
    colors: ["#365253", "#618685", "#5e9a78", "#85a47f", "#a7ce9f"]
});

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            levelData: [],
            gradData: [],
            degreeData: [],
            barChart: {},
            columnChart: {},
            combinationChart: {}
        };
    }

    componentDidMount() {
        axios
            .get('/dashboard/education')
            .then((res) => {
                document.body.style.overflow = 'hidden';
                let data = res.data;
                this.setState({ levelData: data.level });
                this.setState({ gradData: data.grad });
                this.setState({ degreeData: data.degree });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    renderBarChart() {

        this.state.barChart = {
            chart: {
                type: 'bar'
            },
            title: {
                text: "",
                style: {
                    color: "#365253",
                    fontFamily: "Verdana",
                    fontColor: "#365253",
                    fontWeight: 'bold',
                    fontSize: 23
                }
            },
            accessibility: {
                announceNewData: {
                    enabled: true
                },
                point: {
                    valueSuffix: '%'
                }
            },
            xAxis: {
                visible: false
            },
            yAxis: {
                labels: {
                    formatter: function () {
                        return this.value + "%";
                    },
                    style: {
                        fontSize: '15px'
                    }
                },
                title: {
                    enabled: false
                }
                // title:{
                //     text:"Percentage",
                //     style:{
                //             fontSize:17,
                //             color:"#000000",
                //             fontFamily: "Verdana"
                //         },
                //},
                //visible:true,
                //max:30
            },
            legend: {
                itemStyle: {
                    color: '#525252',
                    //fontWeight: 'bold',
                    fontSize: 13
                }
            },
            plotOptions: {

                series: {
                    pointWidth: 30,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: {point.y:.1f}%'
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },
            series: [
            ]
        }
        for (var i = 0; i < 5; i++) {
            this.state.barChart.series.push({ name: '', data: [] });
        }

        Object.keys(this.state.levelData).map((i, index) => {
            let level = this.state.levelData[i].level;
            let percentage = this.state.levelData[i].percentage;
            switch (level) {
                case 'Bachelors Degree':
                    this.state.barChart.series[0].name = level;
                    this.state.barChart.series[0].data.push(percentage);
                    break;
                case 'Graduate Degree':
                    this.state.barChart.series[1].name = level;
                    this.state.barChart.series[1].data.push(percentage);
                    break;
                case 'College/Associate Degree':
                    this.state.barChart.series[2].name = level;
                    this.state.barChart.series[2].data.push(percentage);
                    break;
                case 'High School':
                    this.state.barChart.series[3].name = level;
                    this.state.barChart.series[3].data.push(percentage);
                    break;
                case 'Less Than HighSchool':
                    this.state.barChart.series[4].name = level;
                    this.state.barChart.series[4].data.push(percentage);
                    break;
            }
        });
    }

    renderColumnChart() {
        //var colors = ['#3B97B2', '#67BC42', '#FF56DE', '#E6D605', '#BC36FE', '#000'];
        this.state.columnChart = {
            chart: {
                type: 'column'
            },
            title: {
                text: "",
                style: {
                    color: "#365253",
                    fontFamily: "Verdana",
                    fontColor: "#365253",
                    fontWeight: 'bold',
                    fontSize: 23
                }
            },
            //dataPointWidth: 50,
            xAxis: {
                labels: {
                    align: 'right',
                    style: {
                        fontSize: '15px',

                    }

                },
                categories: [
                    '2013',
                    '2016',
                    '2019'
                ],
                crosshair: true
            },
            yAxis: {
                opposite: false,
                labels: {
                    formatter: function () {
                        return this.value + "%";
                    },
                    style: {
                        fontSize: '15px'
                    }
                },
                min: 0,
                title: {
                    enabled: false

                }


            },
            legend: {
                itemStyle: {
                    color: '#525252',
                    //fontWeight: 'bold',
                    fontSize: 13
                }
            },
            toolTip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true

            },

            plotOptions: {
                series: {
                    pointWidth: 20
                },
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                }
            },

            series: []
        }

        for (var i = 0; i < 3; i++) {
            this.state.columnChart.series.push({ name: '', data: [] });
        }

        Object.keys(this.state.gradData).map((i, index) => {
            let rate = this.state.gradData[i].rate;
            let percentages = this.state.gradData[i].percentages;
            switch (rate) {
                case 'Graduation Rates':
                    this.state.columnChart.series[0].name = rate;
                    this.state.columnChart.series[0].data.push(percentages);
                    break;
                case '% of Graduates Meeting CSU/UC Requirements':
                    this.state.columnChart.series[1].name = rate;
                    this.state.columnChart.series[1].data.push(percentages);
                    break;
                case 'Dropout Rates':
                    this.state.columnChart.series[2].name = rate;
                    this.state.columnChart.series[2].data.push(percentages);
                    break;
            }
        });
    }


    renderCombinationChart() {

        this.state.combinationChart = {

            title: {
                text: "",
                fontFamily: "Verdana",
                fontColor: "#365253",
                fontWeight: 'bold',
                fontSize: 25
            },
            axisX: {
                valueFormatString: "'YY",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY:

            {
                //title: "Number of People",

                gridThickness: 0.5,
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                },
            },

            // axisY1:{
            // title: " Axis Y 2 Title",
            // },

            toolTip: {
                shared: true,
            },
            legend: {
                cursor: "pointer",
                verticalAlign: "bottom",
                horizontalAlign: "center",
                dockInsidePlotArea: false,
                fontWeight: 'bolder',
                fontSize: 15
            },
            data: [
                {
                    type: "column",
                    axisYType: "primary",
                    name: "Total S&E Degrees Conferred in Silicon Valley",
                    showInLegend: true,
                    markerSize: 0,
                    color: "#365253",

                    //lineThickness:2,
                    dataPoints: []
                },
                {
                    type: "spline",
                    axisYType: "secondary",
                    name: "Silicon Valley Share of Total S&E Degrees Conferred in US(%)",
                    toolTipContent: "{name}:{y}%",
                    color: "#a7ce9f",
                    markerType: "circle",
                    markerColor: "#a7ce9f",
                    markerBorderColor: "#365253",
                    markerBorderThickness: 2,
                    showInLegend: true,
                    markerSize: 10,
                    lineThickness: 4,
                    dataPoints: []
                }
            ]
        };
        return Object.keys(this.state.degreeData).map((i, index) => {
            let years = this.state.degreeData[i].years;
            let Silnumbers = this.state.degreeData[i].Silnumbers;
            let Uspercent = this.state.degreeData[i].Uspercent;
            this.state.combinationChart.data[0].dataPoints.push({ label: years, y: Silnumbers });
            this.state.combinationChart.data[1].dataPoints.push({ label: years, y: Uspercent });
        });
    };



    render() {


        return (

            <Container>
                <div class="text-center">
                    <h3 style={{fontColor:'#365253'}} >Education in Silicon Valley</h3>
                </div>
                <Row>
                    <div class="col-sm-6">
                        <div class="card m-4">
                            <h4 class="card-header text-center" style={{fontWeight:'bold',fontColor:'#365253' }}>Percentage of Adults by Educational Attainment in 2018</h4>
                            <div class="card-body">
                            {this.renderBarChart()}
                            <HighchartsReact highcharts={Highcharts} options={this.state.barChart}/>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card m-4">
                            <h4 class="card-header text-center" style={{fontWeight:'bold',fontColor:'#365253'}}>Rate of Graduation, Graduates Meeting UC/CSU Requirements & Dropout Rate</h4>
                            <div class="card-body">
                            {this.renderColumnChart()}
                            <HighchartsReact highcharts={Highcharts} options={this.state.columnChart}/>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div class="col-sm-12">
                        <div class="card m-4">
                            <h4 class="card-header text-center" style={{fontWeight:'bold',fontColor:'#365253'}}>Total Science ans Engineering Degrees Conferred</h4>
                            <div class="card-body">
                            {this.renderCombinationChart()}
                                <CanvasJSChart options={this.state.combinationChart}/>
                            </div>
                        </div>
                    </div>
                </Row>
                </Container>
        );
    }
}

export default Charts;
