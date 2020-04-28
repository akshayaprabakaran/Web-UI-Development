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
            levelData: [],
            gradData:[],
            degreeData:[],
            stackedColumnChart: {},
            columnChart: {},
            combinationChart: {}
        };
    }

    componentDidMount() {
        axios
            .get('/dashboard/education')
            .then((res) => {
                let data = res.data;
                this.setState({ levelData: data.level });
                this.setState({ gradData: data.grad });
                this.setState({ degreeData: data.degree });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    renderStackedColumnChart() {
    
        this.state.stackedColumnChart = {
            animationEnabled: true,
                title: {
                    text: "Educational Attainment(%)",
                    fontFamily: "Verdana",
                    fontColor: "#85a47f",
                    fontSize:25
                },
                axisX: {
                    title: "Location",
                    crosshair: {
                        //enabled: true,
                        snapToDataPoint: true
                    }
                },
                axisY: {
                    title: "Levels of Education Acheived (%)",
                    gridThickness:0.5,
                    gridColor:"#D0D0D0",
                    crosshair: {
                        //enabled: true,
                        snapToDataPoint: true
                    }
                },
                toolTip: {
                    shared: false,
                    fontSize:20,
                    borderThickness:5

                },
                legend: {
                    cursor: "pointer",
                    verticalAlign: "center",
                    horizontalAlign: "right",
                    dockInsidePlotArea: false,
                    fontSize:14,
                    //itemclick: toogleDataSeries,
                    reversed:true
                },
                data: [
                {
                    type: "stackedColumn100",
                    axisYType: "primary",
                    name: " < High School",
                    indexLabelFontSize:15,
                    indexLabelPlacement: "inside",
                    indexLabelFontWeight: "bolder", 
                    showInLegend: true,
                    markerSize: 0,
                    color:"#a7ce9f",
                    toolTipContent: "{name}:{y}%",
                    dataPoints: []
                },
                 {
                    type: "stackedColumn100",
                    axisYType: "primary",
                    name: "High School Graduate",
                    indexLabelFontSize:15,
                    indexLabelPlacement: "inside",
                    indexLabelFontWeight: "bolder", 
                    showInLegend: true,
                    markerSize: 0,
                    toolTipContent: "{name}:{y}%",
                    color:"#85a47f",
                    //lineThickness:2,
                    dataPoints: []
                },
                 {
                    type: "stackedColumn100",
                    axisYType: "primary",
                    name: "College/Associate Degree",
                    indexLabelFontSize:15,
                    indexLabelPlacement: "inside",
                    indexLabelFontWeight: "bolder", 
                    showInLegend: true,
                    markerSize: 0,
                    toolTipContent: "{name}:{y}%",
                    color:"#5e9a78",
                    //lineThickness:2,
                    dataPoints: []
                },
                {
                    type: "stackedColumn100",
                    axisYType: "primary",
                    name: "Bachelor's Degree",
                    indexLabelFontSize:15,
                    indexLabelPlacement: "inside",
                    indexLabelFontWeight: "bolder", 
                    showInLegend: true,
                    markerSize: 0,
                    toolTipContent: "{name}:{y}%",
                    color:"#618685",
                    //lineThickness:2,
                    dataPoints: []
                },
                {
                    type: "stackedColumn100",
                    axisYType: "primary",
                    name: "Graduate/Professional Degree",
                    indexLabelFontSize:15,
                    indexLabelPlacement: "inside",
                    indexLabelFontWeight: "bolder", 
                    showInLegend: true,
                    markerSize: 0,
                    toolTipContent: "{name}:{y}%",
                    color:"#365253",
                    //lineThickness:2,
                    dataPoints: []
                }
                ]
        };
        return Object.keys(this.state.levelData).map((i, index) => {
            let level = this.state.levelData[i].level;
            let Less = this.state.levelData[i].Less;
            let High = this.state.levelData[i].High;
            let Some = this.state.levelData[i].Some;
            let Bach = this.state.levelData[i].Bach;
            let Grad = this.state.levelData[i].Grad;
            this.state.stackedColumnChart.data[0].dataPoints.push({ label: level, y: Less });
            this.state.stackedColumnChart.data[1].dataPoints.push({ label: level, y: High });
            this.state.stackedColumnChart.data[2].dataPoints.push({ label: level, y: Some });
            this.state.stackedColumnChart.data[3].dataPoints.push({ label: level, y: Bach });
            this.state.stackedColumnChart.data[4].dataPoints.push({ label: level, y: Grad });
        });

    };

    renderColumnChart() {
        var colors = ['#3B97B2', '#67BC42', '#FF56DE', '#E6D605', '#BC36FE', '#000'];
        this.state.columnChart = {
                chart:{
                    type:'column'
                },
                title: {
                    text: "Graduation Rate(%)",
                    fontFamily: "Verdana",
                    fontColor: "#85a47f",
                    fontSize:25
                },
                //dataPointWidth: 50,
                xAxis: {
                    categories:[
                    '2013',
                    '2016',
                    '2019'
                    ],
                    crosshair: true
                },
                yAxis: {
                    min:0,
                    title: {
                        text:"Percentage"
                    // gridThickness: 0.3,
                    // gridColor: "black",
                    
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
                // legend: {
                //     cursor: "pointer",
                //     verticalAlign: "bottom",
                //     horizontalAlign: "center",
                //     dockInsidePlotArea: false,
                //     //itemclick: toogleDataSeries,
                //     fontSize: 15,

                // },
                plotOptions:{
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    //colorByPoint:true
                    }
                },
                
                series:[]
                // data: [{
                //     type: "column",

                //     showInLegend: true,
                //     //color: "rgb(51, 153, 102)",
                //     axisYType: "primary",
                //     name: "Graduation Rate",
                //     showInLegend: true,
                //     markerSize: 25,
                //     dataPoints: []
                // },
                // {
                //     type: "column",
                //     showInLegend: true,
                //     //color: "rgba(255, 99, 132, 1)",
                //     axisYType: "primary",
                //     name: "UC/CSU",
                //     showInLegend: true,
                //     markerSize: 10,
                //     dataPoints: []
                // },
                // {
                //     type: "column",
                //     showInLegend: true,
                //     axisYType: "primary",
                //     //color: "rgb(204, 163, 0)",
                //     name: "Dropout Rate",
                //     showInLegend: true,
                //     markerSize: 10,
                //     dataPoints: []
                // }
                // ]
            }
    //     return Object.keys(this.state.csvData).map((i, index) => {
    //         let year = this.state.csvData[i].year;
    //         let Gradrate = this.state.csvData[i].Gradrate;
    //         let CSUrate = this.state.csvData[i].CSUrate;
    //         let Droprate = this.state.csvData[i].Droprate;
    //         this.state.combinationChart2.data[0].dataPoints.push({ label: year, y: Gradrate });
    //         this.state.combinationChart2.data[1].dataPoints.push({ label: year, y: CSUrate });
    //         this.state.combinationChart2.data[2].dataPoints.push({ label: year, y: Droprate });
    //     });
    // };
for (var i = 0; i < 3; i++) {
            this.state.columnChart.series.push({ name: '', data: [] });
        }

        Object.keys(this.state.gradData).map((i, index) => {
            let rate = this.state.gradData[i].rate;
            let percentages = this.state.gradData[i].percentages;
            switch (rate) {
                case 'GradRate':
                    this.state.columnChart.series[0].name = rate;
                    this.state.columnChart.series[0].data.push(percentages);
                    break;
                case 'CSURate':
                    this.state.columnChart.series[1].name = rate;
                    this.state.columnChart.series[1].data.push(percentages);
                    break;
                case 'DropRate':
                    this.state.columnChart.series[2].name = rate;
                    this.state.columnChart.series[2].data.push(percentages);
                    break;
            }
        });
    }


    renderCombinationChart() {
    
        this.state.combinationChart = {
            
                title: {
                    text: "Growth of Science & Engineering Degrees (Yearly)",
                    fontFamily: "Verdana",
                    fontColor: "#85a47f",
                    fontSize:25
                },
                axisX: {
                    valueFormatString: "'YY",
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: true
                    }
                },
                axisY: {
                    title: "Number of People",
                    gridThickness:0.5,
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: true
                    }
                },
                toolTip: {
                    shared: true,
                },
                legend: {
                    cursor: "pointer",
                    verticalAlign: "bottom",
                    horizontalAlign: "center",
                    dockInsidePlotArea: false,
                    //itemclick: toogleDataSeries
                },
                data: [
                {
                    type: "column",
                    axisYType: "primary",
                    name: "Degree-Silicon Valley",
                    showInLegend: true,
                    markerSize: 0,
                    color:"#365253",

                    //lineThickness:2,
                    dataPoints: []
                },
                {
                    type: "spline",
                    axisYType: "secondary",
                    name: "US Degree Percentage",
                    toolTipContent: "{name}:{y}%",
                    color:"#a7ce9f",
                    markerType: "circle",
                    markerColor:"#a7ce9f",
                    markerBorderColor:"#365253",
                    markerBorderThickness: 2,
                    showInLegend: true,
                    markerSize: 10,
                    lineThickness:4,
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
                {/* Columns are always 50% wide, on mobile and desktop */}
                <Row>
                    <Col xs={6}>
                        {this.renderStackedColumnChart()}
                        <CanvasJSChart options={this.state.stackedColumnChart} 
                    />
                    </Col>
                    <Col xs={6}>
                         {this.renderColumnChart()}
                         <HighchartsReact
                            highcharts={Highcharts}
                            options={this.state.columnChart} 
                     />
                     </Col>
                    <Col xs={6}>
                        {this.renderCombinationChart()}
                        <CanvasJSChart options={this.state.combinationChart} 
                    />
                    </Col>
                    
                </Row>
            </Container>
        );
    }
}

export default Charts;
