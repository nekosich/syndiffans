import commands from './commands.js';
import { loadFileSystem } from './fs.js';
import { vhsEffects } from './effects.js';
import { audioGenerator } from './audio.js';
import { CONFIG } from './config.js';

const realInput = document.getElementById('realInput');
const typed = document.getElementById('typed');
const output = document.getElementById('output');
const keystroke = document.getElementById('keystrokeSound');

// Фокус и ввод
realInput.focus();
document.addEventListener('click', () => realInput.focus());

realInput.addEventListener('input', () => {
  typed.textContent = realInput.value;
  playKeySound(); // Звук только при вводе пользователем
});

realInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = realInput.value.trim();
    realInput.value = '';
    typed.textContent = '';
    if (cmd) handleCommand(cmd);
  } else if (e.key === 'Backspace') {
    typed.textContent = typed.textContent.slice(0, -1);
  }
});

function playKeySound() {
  const orig = keystroke;
  orig.currentTime = 0;
  const s = orig.cloneNode(true);
  s.volume = CONFIG.audio.keystrokeVolume;
  s.play().catch(e => console.log('Audio play failed:', e));
}

function addGlitchEffect(element) {
  element.classList.add('glitch');
  setTimeout(() => element.classList.remove('glitch'), 300);
  
  // Добавляем звук глитча
  audioGenerator.generateGlitch();
}

function typeOut(text, speed = CONFIG.animations.typingSpeed) {
  return new Promise(resolve => {
    const line = document.createElement('div');
    output.appendChild(line);
    let i = 0;
    const interval = setInterval(() => {
      line.textContent += text[i];
      // Убираем звук при печати текста терминалом
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        // Добавляем случайные глитч-эффекты
        if (Math.random() < CONFIG.vhs.glitchChance) {
          addGlitchEffect(line);
        }
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

  await printOutput(`${CONFIG.terminal.prompt} ${cmd}`);

  if (commands[base]) {
    const result = commands[base](arg);
    if (result) await printOutput(result);
  } else {
    await printOutput(`${CONFIG.messages.unknownCommand}${base}`);
    // Добавляем глитч-эффект при ошибке
    const lastLine = output.lastElementChild;
    if (lastLine) {
      addGlitchEffect(lastLine);
      vhsEffects.addTextGlitch(lastLine);
      audioGenerator.generateError();
    }
  }
}

// Добавляем случайные VHS эффекты
function addRandomVHSEffects() {
  setInterval(() => {
    if (Math.random() < CONFIG.vhs.colorDistortionChance) {
      vhsEffects.addColorDistortion();
    }
  }, 2000);
}

// Добавляем эффект мерцания экрана
function addScreenFlicker() {
  setInterval(() => {
    if (Math.random() < CONFIG.vhs.flickerChance) {
      vhsEffects.addScreenFlicker();
    }
  }, 100);
}

(async function init() {
  await loadFileSystem();

  await printOutput(CONFIG.messages.welcome.trim());
  
  // Запускаем VHS эффекты
  addRandomVHSEffects();
  addScreenFlicker();
  vhsEffects.startAutoEffects();
})();


