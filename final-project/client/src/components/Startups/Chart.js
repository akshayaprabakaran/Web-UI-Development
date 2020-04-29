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
            lineChart: {}
        };
    }

    componentDidMount() {
        axios.get('/dashboard/startups')
            .then((res) => {
                var data = res.data;
                this.setState({ earlyStartupData: data.earlyStartup });
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
                itemclick: toogleDataSeries
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
        
    }
}

export default Charts;