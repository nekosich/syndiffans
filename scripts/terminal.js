import commands from './commands.js';
import { loadFileSystem } from './fs.js';

const realInput = document.getElementById('realInput');
const typed = document.getElementById('typed');
const output = document.getElementById('output');
const keystroke = document.getElementById('keystrokeSound');

function printOutput(text) {
  const line = document.createElement('div');
  line.textContent = text;
  output.appendChild(line);
  window.scrollTo(0, document.body.scrollHeight);
}

function handleCommand(cmd) {
  const parts = cmd.trim().split(/\s+/);
  const base = parts[0];
  const arg = parts.slice(1).join(" ");

  printOutput(`agent@syn-core:~$ ${cmd}`);

  if (commands[base]) {
    const result = commands[base](arg);
    if (result) printOutput(result);
  } else {
    printOutput(`Unknown command: ${base}`);
  }
}

// 🔄 Автофокус на поле ввода
document.addEventListener('click', () => realInput.focus());
realInput.focus();

// 🎯 Слушаем текст и отображаем его вручную
realInput.addEventListener('input', () => {
  typed.textContent = realInput.value;
});

realInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const command = realInput.value.trim();
    realInput.value = '';
    typed.textContent = '';
    keystroke.play();
    if (command) handleCommand(command);
  } else if (e.key === 'Backspace') {
    typed.textContent = typed.textContent.slice(0, -1);
  }
});

(async function init() {
  await loadFileSystem();

  const WELCOME_MSG = `
Welcome, Agent.
Access level: SYNDICATE // RED
Type 'help' for list of commands.
`;

  WELCOME_MSG.trim().split('\n').forEach(line => printOutput(line));
})();


