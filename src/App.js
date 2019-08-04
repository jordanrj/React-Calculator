import React, { Component } from 'react';
import CalcButton from './Button.js';
import './App.css';


class Display extends Component {

  render() {
    return (
      <div className="calcDisplay">
        <h2 className="equationDisplay">{this.props.equation}</h2>
        <h2 className="mainDisplay">{Math.round(this.props.value * 100) / 100}</h2>
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
  
  //Resets the equation to use the solution to the previous equation as an operand
  resetEquationWithResult = (op) => {
      var currentInput = this.state.currentInput;
      var equation = this.state.equation;
      equation = currentInput + " " + op + " ";
      this.setState({ equation: equation, 
        currentInput: "", 
        result: false, 
        numbers: [parseInt(this.state.currentInput, 10)],
        operations: [op]
       });
  }

  //Check the input operation and the context of the equation
  handleOp(e) {
    //check for two consecutive operators (disallowed)
    let lastOp =  this.state.equation[this.state.equation.length - 2];
    if (lastOp === 'X' || lastOp === '/' || lastOp === '+' || lastOp === '-') {
      return;
    }
    
    //check if using the previous result as operand 
    if (this.state.result === true) {
      if (e.target.innerHTML === '=') return;
      this.resetEquationWithResult(e.target.innerHTML);
      return;
    }

    //check if request to solve equation
    if (e.target.innerHTML === "=") {
      const ops = this.state.operations;
      const nums = this.state.numbers;   
      this.pushNum();
      
      this.setState({ currentInput: this.solve(ops, nums) + "" },
        function() {
          if ('=' !== this.state.equation[this.state.equation.length - 2]) {
            this.setState({ equation: this.state.currentInput, value: parseFloat(this.state.currentInput) });
          }
        }
      );
      this.setState({ numbers: [], result: true });
    } else {  
      this.pushOp(e.target.innerHTML);
      this.pushNum();
    }
    
    this.updateEquation(" " + e.target.innerHTML);
  }
  
  performOperation = (operation, numbers) => {
    if  (operation === 'X') {
      return this.multiply(numbers[0], numbers[1]);
    } else if (operation === '/') {
      return this.divide(numbers[0], numbers[1]);
    } else if  (operation === '+') {
      return this.add(numbers[0], numbers[1]);
    } else if (operation === "-") {
      return this.subtract(numbers[0], numbers[1]);
    } else {
      console.error("ERR: Unknown Operator.");
    }
  }

  solve() {
    //iterates through the operations several times, executing operations in pemdas order
    //(ie first loops multiplies, second divides, etc.). 
    var operations = this.state.operations;
    var numbers = this.state.numbers;
    
    for (let i = 0; i < operations.length; i++) {
      if (i === -1) i++;
      let result = this.performOperation(operations[0], numbers.slice(0,2));
      numbers.splice(i, 2, result);
      operations.splice(i, 1);
      i--;
    }

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
            <CalcButton className ='inputClear' value='C' handleEvent={this.clear}/>
            <CalcButton className="inputNegative" value='+/-' handleEvent={this.handleOp} />
            <CalcButton className="inputDivide" value='/' handleEvent={this.handleOp} />
            <CalcButton className="inputMultiply" value='X' handleEvent={this.handleOp} />
            <CalcButton className="inputSeven" value='7'handleEvent={this.updateInput} />
            <CalcButton className="inputEight" value='8' handleEvent={this.updateInput} />
            <CalcButton className="inputNine" value='9' handleEvent={this.updateInput} />
            <CalcButton className="inputSubtract" value='-' handleEvent={this.handleOp} />
            <CalcButton className="inputFour" value='4' handleEvent={this.updateInput} />
            <CalcButton className="inputFive" value='5' handleEvent={this.updateInput} />
            <CalcButton className="inputSix" value='6'handleEvent={this.updateInput} />
            <CalcButton className="inputAdd" value='+' handleEvent={this.handleOp} />
            <CalcButton className="inputOne" value='1' handleEvent={this.updateInput} />
            <CalcButton className="inputTwo" value='2' handleEvent={this.updateInput} />
            <CalcButton className="inputThree" value='3' handleEvent={this.updateInput} />
            <CalcButton className="inputEquals" value='=' handleEvent={this.handleOp} />
            <CalcButton className="inputZero" value='0' handleEvent={this.updateInput} />
            <CalcButton className="inputDecimal" value='.' handleEvent={this.updateInput} />         
          </div>
        </div>
      </div>
    );
  }
}

export default App;
