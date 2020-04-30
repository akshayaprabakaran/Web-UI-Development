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
                this.setState({womenData: data.women})
                console.log(this.state.womenData);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    renderLineChart() {
        this.state.lineChart = {
            title: {
                text: "Number of Seed or Early-Stage Startups, and Total Number of Startup Companies"
            },
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
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Total of Number Startups - Silicon Valley",
                showInLegend: true,
                markerSize: 0,
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Total of Number Startups - California",
                showInLegend: true,
                markerSize: 0,
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Seed or Early-Stage Startups - San Francisco",
                showInLegend: true,
                markerSize: 0,
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Seed or Early-Stage Startups - Silicon Valley",
                showInLegend: true,
                markerSize: 0,
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Seed or Early-Stage Startups - California",
                showInLegend: true,
                markerSize: 0,
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
            this.state.lineChart.data[0].dataPoints.push({ label: years, y: SFnumbers});
            this.state.lineChart.data[1].dataPoints.push({ label: years, y: SVnumbers });
            this.state.lineChart.data[2].dataPoints.push({ label: years, y: CAnumbers });
            this.state.lineChart.data[3].dataPoints.push({ label: years, y: SFEarly });
            this.state.lineChart.data[4].dataPoints.push({ label: years, y: SVEarly });
            this.state.lineChart.data[5].dataPoints.push({ label: years, y: CAEarly });
        });

        
    }

    renderWomenLineChart(){
        this.state.womenLineChart = {
            title: {
                text: "Share of Startups founded by Women"
            },
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
                name: "Total of Number Startups - Silicon Valley",
                showInLegend: true,
                markerSize: 0,
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Total of Number Startups - San Francisco",
                showInLegend: true,
                markerSize: 0,
                dataPoints: []
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Total of Number Startups - California",
                showInLegend: true,
                markerSize: 0,
                dataPoints: []
            }
            
            ]
        };
        return Object.keys(this.state.womenData).map((i, index) => {
            let years = this.state.earlyStartupData[i].years;
            let CA = this.state.womenData[i].CA;
            let SF = this.state.womenData[i].SF;
            let SV = this.state.womenData[i].SV;
            

            // push to chart
            this.state.womenLineChart.data[0].dataPoints.push({ label: years, y: SF});
            this.state.womenLineChart.data[1].dataPoints.push({ label: years, y: SV });
            this.state.womenLineChart.data[2].dataPoints.push({ label: years, y: CA });
           
        });
        
    }

    render(){
        return (
            <Container fluid>
                {/* Columns are always 50% wide, on mobile and desktop */}
                <Row>
                    <Col xs={6}>
                        {this.renderLineChart()}
                        <CanvasJSChart options={this.state.lineChart} />
                    </Col>
                    <Col xs={6}>
                        {this.renderWomenLineChart()}
                        <CanvasJSChart options={this.state.womenLineChart} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Charts;