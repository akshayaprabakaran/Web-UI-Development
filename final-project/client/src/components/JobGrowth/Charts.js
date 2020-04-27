import React, { Component } from 'react';
import axios from 'axios';
import CanvasJSReact from '../../assets/canvasjs.react';
import { Container, Row, Col } from 'reactstrap';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            csvData: [],
            lineChart: {},
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

    renderRuns() {
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
                dockInsidePlotArea: true,
                itemclick: toogleDataSeries
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

        function toogleDataSeries(e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            } else {
                e.dataSeries.visible = true;
            }
        }

    }

    render() {
        return (
            <Container>
                {/* Columns are always 50% wide, on mobile and desktop */}
                <Row>
                    <Col xs={6}>
                        {this.renderRuns()}
                        <CanvasJSChart options={this.state.lineChart} />
                    </Col>
                    <Col xs={6}>
                        {this.renderRuns()}
                        <CanvasJSChart options={this.state.lineChart} />
                    </Col>
                    <Col xs={6}>
                        {this.renderRuns()}
                        <CanvasJSChart options={this.state.lineChart} />
                    </Col>
                    <Col xs={6}>
                        {this.renderRuns()}
                        <CanvasJSChart options={this.state.lineChart} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Charts;