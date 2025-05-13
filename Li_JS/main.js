import { Calculator } from './calculator.js';

const display = document.getElementById('display');
const calculator = new Calculator(display);

document.querySelectorAll('button').forEach((btn) => {
  const value = btn.dataset.value;
  const action = btn.dataset.action;

  if (value !== undefined) {
    btn.addEventListener('click', () => calculator.append(value));
  }

  if (action === 'clear') {
    btn.addEventListener('click', () => calculator.clear());
  } else if (action === 'delete') {
    btn.addEventListener('click', () => calculator.delete());
  } else if (action === 'calculate') {
    btn.addEventListener('click', () => calculator.calculate());
  }
});
