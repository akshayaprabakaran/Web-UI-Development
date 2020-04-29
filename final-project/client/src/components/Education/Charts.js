import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import CanvasJSReact from '../../assets/canvasjs.react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { MDBContainer } from 'mdbreact';
//disableScroll.on(); 



var CanvasJSChart = CanvasJSReact.CanvasJSChart;
Highcharts.setOptions({
    colors: ["#365253", "#618685","#5e9a78","#85a47f","#a7ce9f"]
});

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            levelData: [],
            gradData:[],
            degreeData:[],
            barChart: {},
            columnChart: {},
            combinationChart: {}
        };
    }

    componentDidMount() {
        axios
            .get('/dashboard/education')
            .then((res) => {
                 document.body.style.overflow = 'hidden';
                let data = res.data;
                this.setState({ levelData: data.level });
                this.setState({ gradData: data.grad });
                this.setState({ degreeData: data.degree });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    renderBarChart() {
    
        this.state.barChart = {
            chart: {
                type: 'bar'
            },
            title: {
               text: "Percentage of Adults by Educational Attainment",
                    style: {
            color: "#365253",
                    fontFamily: "Verdana",
                    fontColor: "#365253",
                    fontSize:23
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
             xAxis:{
                visible:false
            },
            yAxis:{
                title:{
                    text:"Percentage",
                    style:{
                            fontSize:17,
                            color:"#000000",
                            fontFamily: "Verdana"
                        },
                },
                visible:true,
                max:30
            },
            legend: {
                itemStyle: {
            color: '#000000',
            fontWeight: 'bold',
            fontSize:15
        }
        },
            plotOptions: {
                
                series: {
                    pointWidth: 30,
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
            ]
        }
       for (var i = 0; i < 5; i++) {
            this.state.barChart.series.push({ name: '', data: [] });
        }

        Object.keys(this.state.levelData).map((i, index) => {
            let level = this.state.levelData[i].level;
            let percentage = this.state.levelData[i].percentage;
            switch (level) {
                case 'Bachelors Degree':
                    this.state.barChart.series[0].name = level;
                    this.state.barChart.series[0].data.push(percentage);
                    break;
                case 'Graduate Degree':
                    this.state.barChart.series[1].name = level;
                    this.state.barChart.series[1].data.push(percentage);
                    break;
                case 'College/Associate Degree':
                    this.state.barChart.series[2].name = level;
                    this.state.barChart.series[2].data.push(percentage);
                    break;
                case 'High School':
                    this.state.barChart.series[3].name = level;
                    this.state.barChart.series[3].data.push(percentage);
                    break;
                case 'Less Than HighSchool':
                    this.state.barChart.series[4].name = level;
                    this.state.barChart.series[4].data.push(percentage);
                    break;
            }
        });
    }

    renderColumnChart() {
        //var colors = ['#3B97B2', '#67BC42', '#FF56DE', '#E6D605', '#BC36FE', '#000'];
        this.state.columnChart = {
                chart:{
                    type:'column'
                },
                title: {
                    text: "Percentage Growth of Graduation Rate",
                    style: {
            color: "#365253",
                    fontFamily: "Verdana",
                    fontColor: "#365253",
                    fontSize:23
                }
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
                        text:"Percentage",
                        style:{
                            fontSize:17,
                            color:"#000000",
                            fontFamily: "Verdana"

                        }
                  
                }
                },
                legend: {
                itemStyle: {
            color: '#000000',
            fontWeight: 'bold',
            fontSize:15
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
        
                plotOptions:{
                    series: {
                    pointWidth: 20},
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    }
                },
                
                series:[]
            }
    
for (var i = 0; i < 3; i++) {
            this.state.columnChart.series.push({ name: '', data: [] });
        }

        Object.keys(this.state.gradData).map((i, index) => {
            let rate = this.state.gradData[i].rate;
            let percentages = this.state.gradData[i].percentages;
            switch (rate) {
                case 'Graduation':
                    this.state.columnChart.series[0].name = rate;
                    this.state.columnChart.series[0].data.push(percentages);
                    break;
                case 'CSUandUC':
                    this.state.columnChart.series[1].name = rate;
                    this.state.columnChart.series[1].data.push(percentages);
                    break;
                case 'Dropout':
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
                    fontColor: "#365253",
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
                    fontWeight:'bolder',
                    fontSize:20
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

            <Container fluid>
            <div style ={{display: 'flex',paddingBottom: '30px',paddingTop: '10px', justifyContent: 'center',alignItems:'center'}}>
  <h1>Silicon Valley - Education!</h1>
</div>


            <Container>
            

                {/* Columns are always 50% wide, on mobile and desktop */}
                <Row>
                    <Col xs={6}>
                        {this.renderBarChart()}
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={this.state.barChart} 
                    />
                    </Col>
                    <Col xs={6}  >
                         {this.renderColumnChart()}
                         <HighchartsReact
                            highcharts={Highcharts}
                            options={this.state.columnChart} 
                     />
                     </Col>
                    <Col xs={12}style ={{paddingTop: '50px'}} >
                        {this.renderCombinationChart()}
                        <CanvasJSChart options={this.state.combinationChart} 
                    />
                    </Col>
                    
                </Row>
            </Container>
            </Container>
        );
    }
}

export default Charts;
