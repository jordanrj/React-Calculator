import React, { Component } from 'react';
import './App.css';


class Display extends Component {

  render() {
    return (
      <div className="calcDisplay">
        <h2 className="equationDisplay">{this.props.equation}</h2>
        <h2 className="mainDisplay">{this.props.value}</h2>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = { 
      numbers: [],
      operations: [],
      currentInput: "",
      result: false,
      equation: "",
      value: 0
    };

    this.updateEquation = this.updateEquation.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.clear = this.clear.bind(this); 
    this.pushOp = this.pushOp.bind(this);
    this.pushNum = this.pushNum.bind(this);
    this.handleOp = this.handleOp.bind(this);
  }

  updateEquation(item) {
    if (item === "clearEquation") {
      this.setState({ equation: "" });
      return;
    }
    this.setState({ equation: this.state.equation + item + " " });
  }

  updateInput(e) {
    if (this.state.result === true) {
      this.setState({ currentInput: e.target.innerHTML });
      this.setState({ result: false });
      this.setState({ equation: e.target.innerHTML });
    } else {
      let newInput = this.state.currentInput;
      newInput += e.target.innerHTML;
      this.setState({ currentInput: newInput });
      this.setState({ equation: this.state.equation + e.target.innerHTML });
    }
  }

  clear() {
    this.setState({value: 0});
    this.setState({currentInput: ""});
    this.setState({ equation: "" });
  }

  pushOp(op) {
    var opArray = this.state.operations;
    opArray.push(op);
    this.setState({ operations: opArray });
  }

  pushNum() {
    //gets current input and adds that to the numbers array.
    //also clears the current input
    let input = parseFloat(this.state.currentInput);
    var numArray = this.state.numbers;

    numArray.push(input);
    this.setState({ numbers: numArray });
    this.setState({ currentInput: "" });
    this.setState({ equation: this.state.equation + " " });
  }

  //Check the input operation and the context of the equation
  handleOp(e) {
    //check if using the previous result as operand
    if (this.state.result === true) {
      var currentInput = this.state.currentInput;
      var equation = this.state.equation;

      equation = currentInput + "";
      this.setState({ equation: equation });
      this.setState({ result: false });
    }
    //check if request to solve equation
    if (e.target.innerHTML === "=") {
      const ops = this.state.operations;
      const nums = this.state.numbers;    
      this.pushNum();
      this.setState({ currentInput: this.solve(ops, nums) + "" },
        function() {
          this.setState({ equation: this.state.currentInput });
          this.setState({ value: parseFloat(this.state.currentInput) });
        }
      );
      this.setState({ numbers: []} );
      this.setState({ result: true });
    } else {
      this.pushOp(e.target.innerHTML);
      this.pushNum();
    }
    this.updateEquation(" " + e.target.innerHTML);
  }
  
  multiplyLoop(operations, numbers) {
    var result = 0;

    //multiply loop
    for (let i = 0; i < operations.length; i++) {
      if (i === -1) {
        i++;
      }
      if (operations[i] === "x") {
        result = this.multiply(numbers[i], numbers[i + 1]);
        numbers.splice(i, 2, result);
        operations.splice(i, 1);
        i--;
      }
    }
  }

  divideLoop(operations, numbers) {
    var result = 0;
    
    //divide loop
    for (let i = 0; i < operations.length; i++) {
      if (i === -1) {
        i++;
      }
      if (operations[i] === "/") {
        result = this.divide(numbers[i], numbers[i + 1]);
        numbers.splice(i, 2, result);
        operations.splice(i, 1);
        i--;

      }
    }
  }

  addLoop(operations, numbers) {
    var result = 0;
    //add loop
    for (let i = 0; i < operations.length; i++) {
      if (i === -1) {
        i++;
      }
      if (operations[i] === "+") {
        result = this.add(numbers[i], numbers[i + 1]);
        numbers.splice(i, 2, result);
        operations.splice(i, 1);
        i--;
      }
    }
  }

  subtractLoop(operations, numbers) {
    var result = 0;
    //subtract loop
    for (let i = 0; i < operations.length; i++) {
      if (i === -1) {
        i++;
      }
      if (operations[i] === "-") {
        result = this.subtract(numbers[i], numbers[i + 1]);
        console.log(result);
        numbers.splice(i, 2, result);
        operations.splice(i, 1);
        i--;
      }
    }
  }

  solve() {
    //iterates through the operations several times, executing operations in pemdas order
    //(ie first loops multiplies, second divides, etc.). 
    var operations = this.state.operations;
    var numbers = this.state.numbers;
    
    this.multiplyLoop(operations,numbers);
    this.divideLoop(operations, numbers);
    this.addLoop(operations, numbers);
    this.subtractLoop(operations, numbers);

    return numbers[0];
  }

  multiply(num1, num2) {
    return num1 * num2;
  }

  divide(num1, num2) {
    return num1 / num2;
  }

  add(num1, num2) {
    return num1 + num2;
  }

  subtract(num1, num2) {
    return num1 - num2;
  }


  render() {
    var display = this.state.value;
    var equation = this.state.equation;

    return (
      <div className="App">
        <h1 className="calcHeader">React Calculator</h1>
        <div className="calculator">
          <Display value={display} equation={equation} />  
          <div className="calcInputZone">
            <div className="inputClear calcInput" onClick={this.clear}>C</div>
            <div className="inputNegative calcInput" onClick={this.handleOp}>+/-</div>
            <div className="inputDivide calcInput" onClick={this.handleOp}>/</div>
            <div className="inputMultiply calcInput" onClick={this.handleOp}>x</div>
            <div className="inputSeven calcInput" onClick={this.updateInput}>7</div>
            <div className="inputEight calcInput"  onClick={this.updateInput}>8</div>
            <div className="inputNine calcInput" onClick={this.updateInput}>9</div>
            <div className="inputSubtract calcInput" onClick={this.handleOp}>-</div>
            <div className="inputFour calcInput" onClick={this.updateInput}>4</div>
            <div className="inputFive calcInput" onClick={this.updateInput}>5</div>
            <div className="inputSix calcInput" onClick={this.updateInput}>6</div>
            <div className="inputAdd calcInput" onClick={this.handleOp}>+</div>
            <div className="inputOne calcInput" onClick={this.updateInput}>1</div>
            <div className="inputTwo calcInput" onClick={this.updateInput}>2</div>
            <div className="inputThree calcInput" onClick={this.updateInput}>3</div>
            <div className="inputEquals calcInput" onClick={this.handleOp}>=</div>
            <div className="inputZero calcInput" onClick={this.updateInput}>0</div>
            <div className="inputDecimal calcInput" onClick={this.updateInput}>.</div>            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
