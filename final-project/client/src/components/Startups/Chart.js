import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import CanvasJSReact from '../../assets/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Charts extends Component {
    constructor(props){
        super(props);
        this.state = {
            earlyStartupData: [],
            lineChart : {} 
        };
    }

    componentDidMount(){
        axios.get('/dashboard/startups')
        .then((res) => {
            var data = res.data;
            this.setState({earlyStartupData: data.earlyStartup});
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
}

export default Charts;