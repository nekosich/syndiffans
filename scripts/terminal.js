import commands from './commands.js';
import { loadFileSystem } from './fs.js';

const realInput = document.getElementById('realInput');
const typed = document.getElementById('typed');
const output = document.getElementById('output');
const keystroke = document.getElementById('keystrokeSound');

async function printOutput(text) {
  for (let line of text.split('\n')) {
    await typeOut(line);
  }
}

async function handleCommand(cmd) {
  const parts = cmd.trim().split(/\s+/);
  const base = parts[0];
  const arg = parts.slice(1).join(" ");

  await printOutput(`agent@syn-core:~$ ${cmd}`);

  if (commands[base]) {
    const result = commands[base](arg);
    if (result) await printOutput(result);
  } else {
    await printOutput(`Unknown command: ${base}`);
  }
}


function playKeySound() {
  const s = document.getElementById('keystrokeSound').cloneNode();
  s.play();
}

function typeOut(text, speed = 20) {
  return new Promise(resolve => {
    const line = document.createElement('div');
    output.appendChild(line);
    let i = 0;
    const interval = setInterval(() => {
      line.textContent += text[i];
      playKeySound();
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}



// 🔄 Автофокус на поле ввода
document.addEventListener('click', () => realInput.focus());
realInput.focus();

// 🎯 Слушаем текст и отображаем его вручную
realInput.focus();
document.addEventListener('click', () => realInput.focus());

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

for (let line of WELCOME_MSG.trim().split('\n')) {
  await typeOut(line, 30);
}


  WELCOME_MSG.trim().split('\n').forEach(line => printOutput(line));
})();


