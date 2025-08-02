import commands from './commands.js';
import { loadFileSystem } from './fs.js';

const realInput = document.getElementById('realInput');
const typed = document.getElementById('typed');
const output = document.getElementById('output');
const keystroke = document.getElementById('keystrokeSound');

// Фокус и ввод
realInput.focus();
document.addEventListener('click', () => realInput.focus());

realInput.addEventListener('input', () => {
  typed.textContent = realInput.value;
});

realInput.addEventListener('input', () => {
  typed.textContent = realInput.value;
  playKeySound(); // 🔊 добавлено
    if (cmd) handleCommand(cmd);
  } else if (e.key === 'Backspace') {
    typed.textContent = typed.textContent.slice(0, -1);
  }
});

function playKeySound() {
  const orig = keystroke;
  orig.currentTime = 0;
  const s = orig.cloneNode(true);
  s.volume = 0.3;
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

(async function init() {
  await loadFileSystem();

  const WELCOME_MSG = `
Welcome, Agent.
Access level: SYNDICATE // RED
Type 'help' for list of commands.
`;
  await printOutput(WELCOME_MSG.trim());
})();


