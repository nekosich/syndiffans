import commands from './commands.js';
import { loadFileSystem } from './fs.js';
import { vhsEffects } from './effects.js';
import { audioGenerator } from './audio.js';
import { CONFIG } from './config.js';

const realInput = document.getElementById('realInput');
const typed = document.getElementById('typed');
const output = document.getElementById('output');
const keystroke = document.getElementById('keystrokeSound');
const terminal = document.getElementById('terminal');

// История команд
let commandHistory = [];
let historyIndex = -1;

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
    if (cmd) {
      // Добавляем команду в историю
      commandHistory.push(cmd);
      historyIndex = commandHistory.length;
      handleCommand(cmd);
    }
  } else if (e.key === 'Backspace') {
    typed.textContent = typed.textContent.slice(0, -1);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    navigateHistory('up');
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    navigateHistory('down');
  }
});

function navigateHistory(direction) {
  if (commandHistory.length === 0) return;
  
  if (direction === 'up') {
    if (historyIndex > 0) {
      historyIndex--;
    }
  } else if (direction === 'down') {
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
    } else {
      historyIndex = commandHistory.length;
      realInput.value = '';
      typed.textContent = '';
      return;
    }
  }
  
  if (historyIndex >= 0 && historyIndex < commandHistory.length) {
    realInput.value = commandHistory[historyIndex];
    typed.textContent = commandHistory[historyIndex];
  }
}

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

function addTextDistortion(element) {
  element.classList.add('text-distortion');
  setTimeout(() => element.classList.remove('text-distortion'), 200);
}

function addScreenShake() {
  terminal.classList.add('screen-shake');
  setTimeout(() => terminal.classList.remove('screen-shake'), 500);
}

function autoScrollToBottom() {
  output.scrollTop = output.scrollHeight;
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
        // Автоматический скролл
        autoScrollToBottom();
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

  // Проверяем триггеры вирусного сбоя
  if (checkForViralTrigger(cmd)) {
    await printOutput("⚠️  WARNING: Unauthorized access detected!");
    addScreenShake();
    addStaticEffect();
    audioGenerator.generateError();
    return;
  }

  if (commands[base]) {
    const result = commands[base](arg);
    if (result) await printOutput(result);
  } else {
    await printOutput(`${CONFIG.messages.unknownCommand}${base}`);
    // Добавляем глитч-эффект при ошибке
    const lastLine = output.lastElementChild;
    if (lastLine) {
      addGlitchEffect(lastLine);
      addTextDistortion(lastLine);
      addScreenShake();
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
    if (Math.random() < 0.1) { // 10% шанс статики
      addStaticEffect();
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

// Эффект статики
function addStaticEffect() {
  const staticOverlay = document.querySelector('.static-overlay');
  staticOverlay.style.opacity = '0.5';
  setTimeout(() => {
    staticOverlay.style.opacity = '0.3';
  }, 100);
}

// Автоматический вирусный сбой
function startViralCrash() {
  setTimeout(() => {
    addScreenShake();
    addStaticEffect();
    audioGenerator.generateError();
    
    // Случайные глитчи на всех элементах
    const elements = output.querySelectorAll('div');
    elements.forEach((el, index) => {
      setTimeout(() => {
        addGlitchEffect(el);
        addTextDistortion(el);
      }, index * 50);
    });
    
    // Повторяем через случайное время
    setTimeout(startViralCrash, Math.random() * 30000 + 10000); // 10-40 секунд
  }, Math.random() * 60000 + 30000); // 30-90 секунд
}

// Скрытая команда для активации вирусного сбоя
function checkForViralTrigger(cmd) {
  const triggers = ['virus', 'crash', 'hack', 'breach', 'corrupt'];
  return triggers.some(trigger => cmd.toLowerCase().includes(trigger));
}

// Добавляем интерактивные элементы
function addInteractiveElements() {
  // Добавляем hover эффекты для команд
  output.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'DIV' && e.target.textContent.includes('$')) {
      e.target.style.cursor = 'pointer';
      e.target.style.textShadow = '0 0 15px rgba(0, 255, 65, 0.8)';
    }
  });
  
  output.addEventListener('mouseout', (e) => {
    if (e.target.tagName === 'DIV') {
      e.target.style.textShadow = '0 0 10px rgba(0, 255, 65, 0.5)';
    }
  });
  
  // Клик по командам для повторного выполнения
  output.addEventListener('click', (e) => {
    if (e.target.tagName === 'DIV' && e.target.textContent.includes('$')) {
      const cmdMatch = e.target.textContent.match(/\$ (.+)/);
      if (cmdMatch) {
        const cmd = cmdMatch[1];
        realInput.value = cmd;
        typed.textContent = cmd;
        realInput.focus();
      }
    }
  });
}

(async function init() {
  await loadFileSystem();

  await printOutput(CONFIG.messages.welcome.trim());
  
  // Запускаем VHS эффекты
  addRandomVHSEffects();
  addScreenFlicker();
  vhsEffects.startAutoEffects();
  
  // Запускаем вирусный сбой
  startViralCrash();
  
  // Добавляем интерактивные элементы
  addInteractiveElements();
  
  // Приветственное сообщение с подсказками
  setTimeout(async () => {
    await printOutput("\n💡 TIP: Use arrow keys ↑↓ to navigate command history");
    await printOutput("💡 TIP: Click on any command to re-execute it");
    await printOutput("💡 TIP: Try typing 'help' for available commands");
  }, 2000);
})();


