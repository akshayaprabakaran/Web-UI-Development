import React, { Component } from 'react';
import axios from 'axios';
import CanvasJSReact from '../../assets/canvasjs.react';
import { Container, Row, Col } from 'reactstrap';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            csvData: [],
            lineChart: {},
            combinationChart: {},
            pieChart: {},
            areaChart: {}
        };
    }

    componentDidMount() {
        axios
            .get('/dashboard/jobGrowth')
            .then((res) => {
                this.setState({ csvData: res.data });
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
        return Object.keys(this.state.csvData).map((i, index) => {
            let quarters = this.state.csvData[i].quarter;
            let jobs = this.state.csvData[i].jobs;
            this.state.lineChart.data[0].dataPoints.push({ label: quarters, y: jobs });
        });

    }

    renderPieChart() {

        this.state.pieChart = {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Browser market shares. January, 2018'
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
                    name: "Browsers",
                    colorByPoint: true,
                    data: [
                        {
                            name: "Chrome",
                            y: 62.74,
                            drilldown: "Chrome"
                        },
                        {
                            name: "Firefox",
                            y: 10.57,
                            drilldown: "Firefox"
                        },
                        {
                            name: "Internet Explorer",
                            y: 7.23,
                            drilldown: "Internet Explorer"
                        },
                        {
                            name: "Safari",
                            y: 5.58,
                            drilldown: "Safari"
                        },
                        {
                            name: "Edge",
                            y: 4.02,
                            drilldown: "Edge"
                        },
                        {
                            name: "Opera",
                            y: 1.92,
                            drilldown: "Opera"
                        },
                        {
                            name: "Other",
                            y: 7.62,
                            drilldown: null
                        }
                    ]
                }
            ],
            drilldown: {
                series: [
                    {
                        name: "Chrome",
                        id: "Chrome",
                        data: [
                            [
                                "v65.0",
                                0.1
                            ],
                            [
                                "v64.0",
                                1.3
                            ],
                            [
                                "v63.0",
                                53.02
                            ],
                            [
                                "v62.0",
                                1.4
                            ],
                            [
                                "v61.0",
                                0.88
                            ],
                            [
                                "v60.0",
                                0.56
                            ],
                            [
                                "v59.0",
                                0.45
                            ],
                            [
                                "v58.0",
                                0.49
                            ],
                            [
                                "v57.0",
                                0.32
                            ],
                            [
                                "v56.0",
                                0.29
                            ],
                            [
                                "v55.0",
                                0.79
                            ],
                            [
                                "v54.0",
                                0.18
                            ],
                            [
                                "v51.0",
                                0.13
                            ],
                            [
                                "v49.0",
                                2.16
                            ],
                            [
                                "v48.0",
                                0.13
                            ],
                            [
                                "v47.0",
                                0.11
                            ],
                            [
                                "v43.0",
                                0.17
                            ],
                            [
                                "v29.0",
                                0.26
                            ]
                        ]
                    },
                    {
                        name: "Firefox",
                        id: "Firefox",
                        data: [
                            [
                                "v58.0",
                                1.02
                            ],
                            [
                                "v57.0",
                                7.36
                            ],
                            [
                                "v56.0",
                                0.35
                            ],
                            [
                                "v55.0",
                                0.11
                            ],
                            [
                                "v54.0",
                                0.1
                            ],
                            [
                                "v52.0",
                                0.95
                            ],
                            [
                                "v51.0",
                                0.15
                            ],
                            [
                                "v50.0",
                                0.1
                            ],
                            [
                                "v48.0",
                                0.31
                            ],
                            [
                                "v47.0",
                                0.12
                            ]
                        ]
                    },
                    {
                        name: "Internet Explorer",
                        id: "Internet Explorer",
                        data: [
                            [
                                "v11.0",
                                6.2
                            ],
                            [
                                "v10.0",
                                0.29
                            ],
                            [
                                "v9.0",
                                0.27
                            ],
                            [
                                "v8.0",
                                0.47
                            ]
                        ]
                    },
                    {
                        name: "Safari",
                        id: "Safari",
                        data: [
                            [
                                "v11.0",
                                3.39
                            ],
                            [
                                "v10.1",
                                0.96
                            ],
                            [
                                "v10.0",
                                0.36
                            ],
                            [
                                "v9.1",
                                0.54
                            ],
                            [
                                "v9.0",
                                0.13
                            ],
                            [
                                "v5.1",
                                0.2
                            ]
                        ]
                    },
                    {
                        name: "Edge",
                        id: "Edge",
                        data: [
                            [
                                "v16",
                                2.6
                            ],
                            [
                                "v15",
                                0.92
                            ],
                            [
                                "v14",
                                0.4
                            ],
                            [
                                "v13",
                                0.1
                            ]
                        ]
                    },
                    {
                        name: "Opera",
                        id: "Opera",
                        data: [
                            [
                                "v50.0",
                                0.96
                            ],
                            [
                                "v49.0",
                                0.82
                            ],
                            [
                                "v12.1",
                                0.14
                            ]
                        ]
                    }
                ]
            }
        }
    }

    renderCombinationChart() {
        this.state.combinationChart = {
            title: {
                text: 'Combination chart'
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
            },
            labels: {
                items: [{
                    html: 'Total fruit consumption',
                    style: {
                        left: '50px',
                        top: '18px',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'black'
                    }
                }]
            },
            series: [{
                type: 'column',
                name: 'Jane',
                data: [3, 2, 1, 3, 4]
            }, {
                type: 'column',
                name: 'John',
                data: [2, 3, 5, 7, 6]
            }, {
                type: 'column',
                name: 'Joe',
                data: [4, 3, 3, 9, 0]
            }, {
                type: 'spline',
                name: 'Average',
                data: [3, 2.67, 3, 6.33, 3.33],
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3],
                    fillColor: 'white'
                }
            }, {
                type: 'pie',
                name: 'Total consumption',
                data: [{
                    name: 'Jane',
                    y: 13,
                    color: Highcharts.getOptions().colors[0] // Jane's color
                }, {
                    name: 'John',
                    y: 23,
                    color: Highcharts.getOptions().colors[1] // John's color
                }, {
                    name: 'Joe',
                    y: 19,
                    color: Highcharts.getOptions().colors[2] // Joe's color
                }],
                center: [100, 80],
                size: 100,
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            }]
        }
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
                        {this.renderCombinationChart()}
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={this.state.combinationChart}
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