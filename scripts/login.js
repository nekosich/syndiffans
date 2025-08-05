import { vhsEffects } from './effects.js';
import { audioGenerator } from './audio.js';
import { CONFIG } from './config.js';

const input = document.getElementById('accessCode');
const error = document.getElementById('error');
const accessGrantedSound = document.getElementById('accessGranted');
const accessDeniedSound = document.getElementById('accessDenied');
const keystrokeSound = document.getElementById('keystrokeSound');

// Добавляем звук при вводе
input.addEventListener('input', () => {
  playKeySound();
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const value = input.value.trim().toUpperCase();
    input.value = '';

    if (value === CONFIG.access.realCode) {
      playAccessGranted();
      error.textContent = '';
      addSuccessEffect();
      document.body.style.transition = "opacity 1.5s";
      document.body.style.opacity = "0";
      setTimeout(() => window.location.href = "terminal.html", 1500);
    } else if (value === CONFIG.access.fakeCode) {
      playAccessGranted();
      error.textContent = '';
      addSuccessEffect();
      document.body.style.transition = "opacity 1.5s";
      document.body.style.opacity = "0";
      setTimeout(() => window.location.href = "alt-terminal.html", 1500);
    } else {
      error.textContent = CONFIG.messages.accessDenied;
      playAccessDenied();
      addErrorEffect();
    }
  }
});

function playKeySound() {
  const orig = keystrokeSound;
  orig.currentTime = 0;
  const s = orig.cloneNode(true);
  s.volume = CONFIG.audio.effectVolume;
  s.play().catch(e => console.log('Audio play failed:', e));
}

function playAccessGranted() {
  // Пробуем воспроизвести файл, если не получается - генерируем звук
  accessGrantedSound.play().catch(() => {
    audioGenerator.generateAccessGranted();
  });
}

function playAccessDenied() {
  // Пробуем воспроизвести файл, если не получается - генерируем звук
  accessDeniedSound.play().catch(() => {
    audioGenerator.generateAccessDenied();
  });
}

function addSuccessEffect() {
  const loginBox = document.querySelector('.login-box');
  loginBox.style.borderColor = CONFIG.colors.primary;
  loginBox.style.boxShadow = `0 0 30px ${CONFIG.colors.primary}cc`;
  loginBox.style.transform = 'scale(1.05)';
  loginBox.style.transition = 'all 0.5s ease';
  
  // Добавляем VHS эффекты
  vhsEffects.addColorDistortion();
  setTimeout(() => vhsEffects.addScanline(), 200);
}

function addErrorEffect() {
  const loginBox = document.querySelector('.login-box');
  loginBox.classList.add('glitch');
  setTimeout(() => loginBox.classList.remove('glitch'), 500);
  
  // Добавляем эффект тряски
  loginBox.style.animation = 'errorShake 0.5s ease-in-out';
  setTimeout(() => {
    loginBox.style.animation = '';
  }, 500);
  
  // Добавляем VHS эффекты
  vhsEffects.addStatic();
  vhsEffects.addScreenFlicker();
}

// Добавляем случайные VHS эффекты
function addRandomVHSEffects() {
  setInterval(() => {
    if (Math.random() < CONFIG.vhs.staticChance) {
      vhsEffects.addRandomEffect();
    }
  }, 3000);
}

// Запускаем эффекты
addRandomVHSEffects();


