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
            title: {
                text: "Total Number of Jobs and Percent Change (2001-2019)",
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
                type: 'pie'
            },
            title: {
                text: 'Major Areas Of Economic Activity: Silicon Valley & San Francisco (2019)',
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
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Relative Job Growth (2007 - 2019)',
                style: {
                    color: "#365253",
                    fontFamily: "Verdana",
                    fontColor: "#365253",
                    fontWeight: 'bold',
                    fontSize: 23
                }
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
                }
            },
            credits: {
                enabled: false
            },
            series: []
        }

        for (var i = 0; i < 5; i++) {
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
                case 'Santa Clara & San Mateo Counties':
                    this.state.barChart.series[1].name = location;
                    this.state.barChart.series[1].data.push(percentages);
                    break;
                case 'Alameda County':
                    this.state.barChart.series[2].name = location;
                    this.state.barChart.series[2].data.push(percentages);
                    break;
                case 'California':
                    this.state.barChart.series[3].name = location;
                    this.state.barChart.series[3].data.push(percentages);
                    break;
                case 'United States':
                    this.state.barChart.series[4].name = location;
                    this.state.barChart.series[4].data.push(percentages);
                    break;
            }
        });
    }

    renderVerticalBarChart() {
        this.state.verticalBarChart = {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "Growth of Jobs in Top U.S. Tech Talent Centers (2013-2018)",
                style: {
                    color: "#365253",
                    fontFamily: "Verdana",
                    fontColor: "#365253",
                    fontWeight: 'bold',
                    fontSize: 23
                }
            },
            axisY: {
                title: "Number of New Tech Jobs (thousands)"
            },
            data: [{
                type: "column",
                markerSize: 0,
                color: "#365253",
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
            <Container fluid>
                <div style={{ display: 'flex', paddingBottom: '30px', paddingTop: '10px', justifyContent: 'center', alignItems: 'center' }}>
                    <h1>Silicon Valley - Employment!</h1>
                </div>
                {/* Columns are always 50% wide, on mobile and desktop */}
                <Row>
                    <Col xs={6}>
                        {this.renderLineChart()}
                        <CanvasJSChart options={this.state.lineChart} />
                    </Col>
                    <Col xs={6}>
                        {this.renderPieChart()}
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={this.state.pieChart}
                        />
                    </Col>
                    <Col xs={6}>
                        {this.renderBarChart()}
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={this.state.barChart}
                        />
                    </Col>
                    <Col xs={6}>
                        {this.renderVerticalBarChart()}
                        <CanvasJSChart options={this.state.verticalBarChart} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Charts;