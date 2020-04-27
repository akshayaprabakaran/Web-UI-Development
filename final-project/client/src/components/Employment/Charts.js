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
            lineChart: {},
            barChart: {},
            pieChart: {},
            areaChart: {}
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
                text: "Job Growth"
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
                color: "#F08080",
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
                text: 'MAJOR AREAS OF ECONOMIC ACTIVITY'
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
                type: 'column'
            },
            title: {
                text: 'Relative Job Growth'
            },
            subtitle: {
                text: 'Source(s): United States Bureau of Labor Statistics, Quarterly Census of Employment and Wages, EMSI'
            },
            xAxis: {
                categories: [
                    '2007 - 2019',
                    '2010 - 2019',
                    '2018 - 2019'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Percent Change in Total Numbers of Jobs'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
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

    renderAreaChart() {
        this.state.areaChart = {
            chart: {
                type: 'area'
            },
            accessibility: {
                description: 'Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.'
            },
            title: {
                text: 'US and USSR nuclear stockpiles'
            },
            xAxis: {
                allowDecimals: false,
                labels: {
                    formatter: function () {
                        return this.value; // clean, unformatted number for year
                    }
                },
                accessibility: {
                    rangeDescription: 'Range: 1940 to 2017.'
                }
            },
            yAxis: {
                title: {
                    text: 'Nuclear weapon states'
                },
                labels: {
                    formatter: function () {
                        return this.value / 1000 + 'k';
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            plotOptions: {
                area: {
                    pointStart: 1940,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'USA',
                data: [
                    null, null, null, null, null, 6, 11, 32, 110, 235,
                    369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
                    20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
                    26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380,
                    21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824,
                    10577, 10527, 10475, 10421, 10358, 10295, 10104, 9914, 9620, 9326,
                    5113, 5113, 4954, 4804, 4761, 4717, 4368, 4018
                ]
            }, {
                name: 'USSR/Russia',
                data: [null, null, null, null, null, null, null, null, null, null,
                    5, 25, 50, 120, 150, 200, 426, 660, 869, 1060,
                    1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538,
                    11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935,
                    30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000,
                    37000, 35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                    21000, 20000, 19000, 18000, 18000, 17000, 16000, 15537, 14162, 12787,
                    12600, 11400, 5500, 4512, 4502, 4502, 4500, 4500
                ]
            }]
        }
    }

    render() {
        return (
            <Container>
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
                        {this.renderAreaChart()}
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={this.state.areaChart}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Charts;