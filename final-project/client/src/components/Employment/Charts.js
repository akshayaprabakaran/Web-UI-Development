import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalJobData: [],
            relativeJobData: [],
            economicActivityData: [],
            techGrowthData: [],
            lineChart: {},
            barChart: {},
            pieChart: {},
            verticalBarChart: {}
        };
    }

    componentDidMount() {
        axios
            .get('/dashboard/employment')
            .then((res) => {
                let data = res.data;
                this.setState({ totalJobData: data.totalJob });
                this.setState({ relativeJobData: data.relativeJob });
                this.setState({ economicActivityData: data.economicActivity });
                this.setState({ techGrowthData: data.techGrowth });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    renderLineChart() {
        this.state.lineChart = {
            animationEnabled: true,
            theme: "light2",
            height : "250",
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
            axisY: {
                title: "Total Number of Jobs",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                verticalAlign: "bottom",
                horizontalAlign: "left",
                dockInsidePlotArea: true
            },
            data: [{
                type: "line",
                showInLegend: true,
                name: "Total Jobs",
                markerType: "square",
                xValueFormatString: "Q#, YYYY",
                color: "#365253",
                dataPoints: []
            }]
        };
        return Object.keys(this.state.totalJobData).map((i, index) => {
            let quarters = this.state.totalJobData[i].quarter;
            let jobs = this.state.totalJobData[i].jobs;
            this.state.lineChart.data[0].dataPoints.push({ label: quarters, y: jobs });
        });

    }

    renderPieChart() {
        this.state.pieChart = {
            chart: {
                type: 'pie',
                height : "260",
            },
            title: {
                text: '',
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
            plotOptions: {
                series: {
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
                {
                    name: "Silicon Valley",
                    colorByPoint: true,
                    data: []
                }
            ]
        }
        return Object.keys(this.state.economicActivityData).map((i, index) => {
            let activity = this.state.economicActivityData[i].activity;
            let percentages = this.state.economicActivityData[i].percentages;
            this.state.pieChart.series[0].data.push({ name: activity, y: percentages });
        });
    }

    renderBarChart() {
        this.state.barChart = {
            colors: ['#b25100', '#365253'],
            chart: {
                type: 'bar',
                height : "250px",
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: ['2007 - 2019', '2010 - 2019', '2018 - 2019'],
                title: { text: null }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Percent Change in Total Numbers of Jobs (%)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' %'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                },
                  series: {
            pointWidth: 12
        }
            },
            credits: {
                enabled: false
            },
            series: []
        }

        for (var i = 0; i < 2; i++) {
            this.state.barChart.series.push({ name: '', data: [] });
        }

        Object.keys(this.state.relativeJobData).map((i, index) => {
            let location = this.state.relativeJobData[i].location;
            let percentages = this.state.relativeJobData[i].percentages;
            switch (location) {
                case 'Silicon Valley':
                    this.state.barChart.series[0].name = location;
                    this.state.barChart.series[0].data.push(percentages);
                    break;
                case 'California':
                    this.state.barChart.series[1].name = location;
                    this.state.barChart.series[1].data.push(percentages);
                    break;
            }
        });
    }

    renderVerticalBarChart() {
        this.state.verticalBarChart = {
            height : "250",
            animationEnabled: true,
            theme: "light2",
            title: {
                text: ""                
            },
            axisY: {
                title: "Number of New Tech Jobs (thousands)"
            },
            data: [{
                type: "column",
                dataPoints: []
            }]
        }
        return Object.keys(this.state.techGrowthData).map((i, index) => {
            let city = this.state.techGrowthData[i].city;
            let jobs = this.state.techGrowthData[i].jobs;
            this.state.verticalBarChart.data[0].dataPoints.push({ y: jobs, label: city });
        });
    }

    render() {
        return (
            <Container>
                <div class="text-center">
                    <h3>Employment in Silicon Valley</h3>
                </div>
                <Row>
                <div class="col-sm-6">
                    <div class="card m-1">
                        <h6 class="card-header text-center">Total Number of Jobs and Percent Change (2001-2019)</h6>
                        <div class="card-body">
                            {this.renderLineChart()}
                            <CanvasJSChart options={this.state.lineChart} />
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card m-1">
                        <h6 class="card-header text-center">Relative Job Growth (2007 - 2019)</h6>
                        <div class="card-body">
                            {this.renderBarChart()}
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={this.state.barChart}
                            />
                        </div>
                    </div>
                </div>
                </Row>
                <Row>
                    <div class="col-sm-6">
                        <div class="card m-1">
                            <h6 class="card-header text-center">Areas Of Economic Activity: Silicon Valley and SF(2019)</h6>
                            <div class="card-body">
                                {this.renderPieChart()}
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={this.state.pieChart}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card m-1">
                            <h6 class="card-header text-center">Growth of Jobs in Top U.S. Tech Talent Centers (2013-2018)</h6>
                            <div class="card-body">
                                {this.renderVerticalBarChart()}
                                <CanvasJSChart options={this.state.verticalBarChart} />
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        );
    }
}

export default Charts;
