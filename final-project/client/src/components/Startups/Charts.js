import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import CanvasJSReact from '../../assets/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            earlyStartupData: [],
            lineChart: {},
            womenData: [],
            womenLineChart: {}
        };
    }

    componentDidMount() {
        axios.get('/dashboard/startups')
            .then((res) => {
                var data = res.data;
                this.setState({ earlyStartupData: data.earlyStartup });
                console.log(this.state.earlyStartupData);
                this.setState({ womenData: data.women })
                console.log(this.state.womenData);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    renderLineChart() {
        this.state.lineChart = {
            title: {
                text: ""
            },
            height : "250",
            axisX: {
                valueFormatString: "'YY",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY2: {
                title: "Silicon Valley and San Francisco",
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
                verticalAlign: "top",
                horizontalAlign: "center",
                dockInsidePlotArea: true,
            },
            data: [{
                type: "line",
                axisYType: "secondary",
                name: "Total of Number Startups - San Francisco",
                showInLegend: true,
                markerSize: 0,
                color: "#91a2a3",
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Total of Number Startups - Silicon Valley",
                showInLegend: true,
                markerSize: 0,
                color: "#6ca0a3",
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Total of Number Startups - California",
                showInLegend: true,
                markerSize: 0,
                color: "#7ce5eb",
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Seed or Early-Stage Startups - San Francisco",
                showInLegend: true,
                markerSize: 0,
                color: "#55accf",
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Seed or Early-Stage Startups - Silicon Valley",
                showInLegend: true,
                markerSize: 0,
                color: "#662fde",
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Seed or Early-Stage Startups - California",
                showInLegend: true,
                markerSize: 0,
                color: "#0769f2",
                dataPoints: []
            }
            ]
        };
        return Object.keys(this.state.earlyStartupData).map((i, index) => {
            let years = this.state.earlyStartupData[i].years;
            let CAnumbers = this.state.earlyStartupData[i].CAnumbers;
            let SFnumbers = this.state.earlyStartupData[i].SFnumbers;
            let SVnumbers = this.state.earlyStartupData[i].SVnumbers;
            let CAEarly = this.state.earlyStartupData[i].CAEarly;
            let SFEarly = this.state.earlyStartupData[i].SFEarly;
            let SVEarly = this.state.earlyStartupData[i].SVEarly;

            // push to chart
            this.state.lineChart.data[0].dataPoints.push({ label: years, y: SFnumbers });
            this.state.lineChart.data[1].dataPoints.push({ label: years, y: SVnumbers });
            this.state.lineChart.data[2].dataPoints.push({ label: years, y: CAnumbers });
            this.state.lineChart.data[3].dataPoints.push({ label: years, y: SFEarly });
            this.state.lineChart.data[4].dataPoints.push({ label: years, y: SVEarly });
            this.state.lineChart.data[5].dataPoints.push({ label: years, y: CAEarly });
        });


    }

    renderWomenLineChart() {
        this.state.womenLineChart = {
            title: {
                text: ""
            },
            height : "250",
            axisX: {
                valueFormatString: "YYYY",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY2: {
                title: "Silicon Valley and San Francisco",
                suffix: "%",
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
                verticalAlign: "top",
                horizontalAlign: "center",
                dockInsidePlotArea: true,
            },
            data: [{
                type: "line",
                axisYType: "secondary",
                name: "Total of Number Startups - Silicon Valley",
                showInLegend: true,
                yValueFormatString: "#'%'",
                markerSize: 0,
                color: "#0769f2",
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Total of Number Startups - San Francisco",
                showInLegend: true,
                yValueFormatString: "#'%'",
                markerSize: 0,
                color: "#55accf",
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Total of Number Startups - California",
                yValueFormatString: "#'%'",
                showInLegend: true,
                markerSize: 0,
                color: "#6ca0a3",
                dataPoints: []
            }

            ]
        };
        return Object.keys(this.state.womenData).map((i, index) => {
            let years = this.state.womenData[i].years;
            let CA = this.state.womenData[i].CA;
            let SF = this.state.womenData[i].SF;
            let SV = this.state.womenData[i].SV;


            // push to chart
            this.state.womenLineChart.data[0].dataPoints.push({ label: years, y: SF });
            this.state.womenLineChart.data[1].dataPoints.push({ label: years, y: SV });
            this.state.womenLineChart.data[2].dataPoints.push({ label: years, y: CA });

        });

    }

    render() {
        return (
            <Container>
                <div class="text-center">
                    <h3>Startup Companies in Silicon Valley</h3>
                </div>
                <Row>
                    <div class="col-sm-12">
                        <div class="card m-1">
                        <h6 class="card-header text-center">Share of Startups founded by Women</h6>
                            <div class="card-body">
                                {this.renderWomenLineChart()}
                                <CanvasJSChart options={this.state.womenLineChart} />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="card m-1">
                        <h6 class="card-header text-center">Number of Seed or Early-Stage Startups, and Total Number of Startup Companies</h6>
                            <div class="card-body">
                                {this.renderLineChart()}
                                <CanvasJSChart options={this.state.lineChart} />
                            </div>
                        </div>
                    </div>

                </Row>
            </Container>
        );
    }
}

export default Charts;