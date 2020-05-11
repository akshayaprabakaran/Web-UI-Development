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
            womenLineChart: {},
            fundingData: [],
            fundingLineChart: {},
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
                this.setState({ fundingData: data.funding });
                console.log(this.state.fundingData);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    renderLineChart() {
        this.state.lineChart = {
            zoomEnabled: true,
            title: {
                text: "Number of Seed or Early-Stage Startups, and Total Number of Startup Companies"
            },
            height: "250",
            axisX: {
                valueFormatString: "'YY",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY2: {
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
                yValueFormatString: "# companies",
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Total of Number Startups - Silicon Valley",
                showInLegend: true,
                markerSize: 0,
                color: "#b25100",
                yValueFormatString: "# companies",
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Total of Number Startups - California",
                showInLegend: true,
                markerSize: 0,
                color: "#7ce5eb",
                yValueFormatString: "# companies",
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Seed or Early-Stage Startups - San Francisco",
                showInLegend: true,
                markerSize: 0,
                color: "#55accf",
                yValueFormatString: "# companies",
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Seed or Early-Stage Startups - Silicon Valley",
                showInLegend: true,
                markerSize: 0,
                color: "#b25100",
                yValueFormatString: "# companies",
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Seed or Early-Stage Startups - California",
                showInLegend: true,
                markerSize: 0,
                color: "#0769f2",
                yValueFormatString: "# companies",
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
                text: "Share of Startups founded by Women"
            },
            height: "250",
            axisX: {
                valueFormatString: "YYYY",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY2: {
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
                color: "#b25100",
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

    renderFundingLineChart() {
        this.state.fundingLineChart = {
            zoomEnabled: true,
            title: {
                text: "Seed or Early-Stage Funding Deals"
            },
            height: "250",
            axisX: {
                valueFormatString: "YYYY",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY2: {
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
                yValueFormatString: "# deals",
                markerSize: 0,
                color: "#b25100",
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Total of Number Startups - San Francisco",
                showInLegend: true,
                yValueFormatString: "# deals",
                markerSize: 0,
                color: "#55accf",
                dataPoints: []
            },


            ]
        };
        return Object.keys(this.state.fundingData).map((i, index) => {
            let years = this.state.fundingData[i].years;
            let SV = this.state.fundingData[i].SV;
            let SF = this.state.fundingData[i].SF;


            // push to chart
            this.state.fundingLineChart.data[0].dataPoints.push({ label: years, y: SF });
            this.state.fundingLineChart.data[1].dataPoints.push({ label: years, y: SV });

        });
    }

    render() {
        return (
            

            <Container>
                <div class="text-center">
                    <h3 style={{ fontColor: '#365253' }} >Startup Companies in Silicon Valley</h3>
                </div>
                <Row>
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                {this.renderWomenLineChart()}
                                <CanvasJSChart options={this.state.womenLineChart} />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                {this.renderFundingLineChart()}
                                <CanvasJSChart options={this.state.fundingLineChart} />
                            </div>
                        </div>
                    </div>
                </Row>
                <br/>
                <Row>
                    <div class="col-sm-12">
                        <div class="card">
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