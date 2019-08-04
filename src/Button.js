import React, {Component} from 'react';
import './App.css';

class CalcButton extends Component {
    constructor() {
        super();
    
        this.state = {};
    };
    
    render() {
        return(<div className='calcInput' onClick={this.props.handleEvent}>{this.props.value}</div>);
    }
}

export default CalcButton;