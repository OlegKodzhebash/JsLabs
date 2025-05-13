export class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.clear();
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = null;
  }

  append(value) {
    if (value === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand += value;
    this.updateDisplay();
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
    this.updateDisplay();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = null;
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.calculate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.updateDisplay();
  }

  calculate() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '÷': 
        if (current === 0) {
          this.currentOperand = 'Error: Division by zero';
          this.operation = null;
          this.previousOperand = '';
          this.updateDisplay();
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = result.toString();
    this.operation = null;
    this.previousOperand = '';
    this.updateDisplay();
  }

  updateDisplay() {
    this.displayElement.value = this.currentOperand;
  }
}