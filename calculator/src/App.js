import React, { Component } from 'react';
import './App.css';

class App extends Component {
  contructor() {
    this.state = { 
      numbers: [],
      operations: [],
      result: 0,
      display: ""
    }
  }



  render() {
    return (
      <div className="App">
        <h1 className="calcHeader">React Calculator</h1>
        <div className="calculator">
          <h2 className="calcDisplay">Results go here</h2>
          <div className="calcInputZone">
            <div className="inputClear calcInput">C</div>
            <div className="inputNegative calcInput">+/-</div>
            <div className="inputDivide calcInput">/</div>
            <div className="inputMultiply calcInput">X</div>
            <div className="inputSeven calcInput">7</div>
            <div className="inputEight calcInput">8</div>
            <div className="inputNine calcInput">9</div>
            <div className="inputSubtract calcInput">-</div>
            <div className="inputFour calcInput">4</div>
            <div className="inputFive calcInput">5</div>
            <div className="inputSix calcInput">6</div>
            <div className="inputAdd calcInput">+</div>
            <div className="inputOne calcInput">1</div>
            <div className="inputTwo calcInput">2</div>
            <div className="inputThree calcInput">3</div>
            <div className="inputEquals calcInput">=</div>
            <div className="inputZero calcInput">0</div>
            <div className="inputDecimal calcInput">.</div>            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
