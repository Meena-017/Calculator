const display = document.getElementById('display');
const historyList = document.getElementById('history-list');
let history = [];
function appendOperator(value) {
  if (value === ',') {
    value = '.'; 
  }
  display.value += value;
}
function appendFunction(func) {
  display.value += func;
}
function handlePower() {
  display.value += '^'; 
}
function clearDisplay() {
  display.value = '';
}
function deleteLast() {
  display.value = display.value.slice(0, -1);
}
function calculate() {
  try {
    let expression = display.value;
    expression = expression.replace(/(\d+)\s*\^\s*(\d+)/g, (match, base, exponent) => {
      return `Math.pow(${base}, ${exponent})`;
    });
    const result = new Function('return ' + expression)();
    display.value = result;
    history.push(`${expression} = ${result}`);
    updateHistory();
  } catch (e) {
    display.value = 'Error';
  }
}
function updateHistory() {
  historyList.innerHTML = '';
  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  });
}
function toggleHistory() {
  const modal = document.getElementById('historyModal');
  if (modal.style.display === 'block') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'block';
  }
}
function clearHistory() {
  history = []; 
  updateHistory(); 
}
document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (/[0-9+\-*/().,]/.test(key)) {
    appendOperator(key);
  }
  if (key === '^') {
    handlePower();
  }
  if (key === 's' || key === 'c' || key === 't' || key === 'l' || key === 'n' || key === 'r') {
    appendFunction('Math.' + key + '(');
  }
  if (key === 'Enter') {
    event.preventDefault(); 
    calculate();
  } else if (key === 'Delete') {
    clearDisplay();
  } else if (key === 'Backspace') {
    deleteLast();
  }
});
