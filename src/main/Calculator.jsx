import React, { Component } from "react";
import "../main/Calculator.css";
 
import Display from "../components/Display";
import Buttons from "../components/Buttons";
 
const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};
 
class Calculator extends Component {
  state = { ...initialState };
 
  constructor(props) {
    super(props);
 
    this.limparMemoria = this.limparMemoria.bind(this);
    this.adicionarDigito = this.adicionarDigito.bind(this);
    this.setarOperacao = this.setarOperacao.bind(this);
  }
 
  limparMemoria() {
    this.setState({ ...initialState });
  }
 
  setarOperacao(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, limparDisplay: true });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;
 
      const values = [...this.state.values];
 
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }
 
      values[1] = 0;
 
      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }
 
  adicionarDigito(n) {
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }
 
    const limparDisplay = this.state.displayValue === "0" || this.state.limparDisplay;
    const currentValue = limparDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, limparDisplay: false });
 
    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  }
 
  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Buttons label="AC" click={this.limparMemoria} triple />
        <Buttons label="/" click={this.setarOperacao} operations />
        <Buttons label="7" click={this.adicionarDigito} />
        <Buttons label="8" click={this.adicionarDigito} />
        <Buttons label="9" click={this.adicionarDigito} />
        <Buttons label="*" click={this.setarOperacao} operations />
        <Buttons label="4" click={this.adicionarDigito} />
        <Buttons label="5" click={this.adicionarDigito} />
        <Buttons label="6" click={this.adicionarDigito} />
        <Buttons label="-" click={this.setarOperacao} operations />
        <Buttons label="1" click={this.adicionarDigito} />
        <Buttons label="2" click={this.adicionarDigito} />
        <Buttons label="3" click={this.adicionarDigito} />
        <Buttons label="+" click={this.setarOperacao} operations />
        <Buttons label="0" click={this.adicionarDigito} double />
        <Buttons label="." click={this.adicionarDigito} />
        <Buttons label="=" click={this.setarOperacao} operations />
      </div>
    );
  }
}
 
export default Calculator;