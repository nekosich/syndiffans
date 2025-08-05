// Дополнительные VHS эффекты для терминала

export class VHSEffects {
  constructor() {
    this.isActive = false;
    this.effects = [];
    this.currentEffects = new Set();
  }

  // Эффект сканирующей линии
  addScanline() {
    const scanline = document.createElement('div');
    scanline.className = 'scanline';
    document.body.appendChild(scanline);
    
    setTimeout(() => {
      if (scanline.parentNode) {
        document.body.removeChild(scanline);
      }
    }, 3000);
  }

  // Эффект глитча текста
  addTextGlitch(element) {
    if (!element) return;
    
    const originalText = element.textContent;
    element.setAttribute('data-text', originalText);
    element.classList.add('text-glitch');
    
    setTimeout(() => {
      element.classList.remove('text-glitch');
      element.removeAttribute('data-text');
    }, 300);
  }

  // Эффект мерцания экрана
  addScreenFlicker() {
    document.body.classList.add('screen-flicker');
    setTimeout(() => {
      document.body.classList.remove('screen-flicker');
    }, 100);
  }

  // Эффект искажения цвета
  addColorDistortion() {
    document.body.classList.add('color-distortion');
    setTimeout(() => {
      document.body.classList.remove('color-distortion');
    }, 500);
  }

  // Эффект статики
  addStatic() {
    const staticEffect = document.createElement('div');
    staticEffect.className = 'static-effect';
    document.body.appendChild(staticEffect);
    
    setTimeout(() => {
      if (staticEffect.parentNode) {
        document.body.removeChild(staticEffect);
      }
    }, 200);
  }

  // Эффект тряски экрана
  addScreenShake() {
    document.body.classList.add('screen-shake');
    setTimeout(() => {
      document.body.classList.remove('screen-shake');
    }, 500);
  }

  // Эффект искажения текста
  addTextDistortion(element) {
    if (!element) return;
    
    element.classList.add('text-distortion');
    setTimeout(() => {
      element.classList.remove('text-distortion');
    }, 200);
  }

  // Эффект пульсации
  addPulseEffect(element) {
    if (!element) return;
    
    element.classList.add('pulse-effect');
    setTimeout(() => {
      element.classList.remove('pulse-effect');
    }, 2000);
  }

  // Эффект свечения
  addGlowEffect(element) {
    if (!element) return;
    
    element.classList.add('glow-effect');
    setTimeout(() => {
      element.classList.remove('glow-effect');
    }, 2000);
  }

  // Эффект матрицы
  addMatrixEffect() {
    const matrixEffect = document.createElement('div');
    matrixEffect.className = 'matrix-effect';
    document.body.appendChild(matrixEffect);
    
    setTimeout(() => {
      if (matrixEffect.parentNode) {
        document.body.removeChild(matrixEffect);
      }
    }, 3000);
  }

  // Эффект взрыва
  addExplosionEffect() {
    const explosion = document.createElement('div');
    explosion.className = 'explosion-effect';
    document.body.appendChild(explosion);
    
    setTimeout(() => {
      if (explosion.parentNode) {
        document.body.removeChild(explosion);
      }
    }, 500);
  }

  // Эффект голограммы
  addHologramEffect(element) {
    if (!element) return;
    
    element.classList.add('hologram-effect');
    setTimeout(() => {
      element.classList.remove('hologram-effect');
    }, 2000);
  }

  // Эффект неоновой вывески
  addNeonSignEffect(element) {
    if (!element) return;
    
    element.classList.add('neon-sign');
    setTimeout(() => {
      element.classList.remove('neon-sign');
    }, 1500);
  }

  // Эффект киберпанка
  addCyberpunkEffect(element) {
    if (!element) return;
    
    element.classList.add('cyberpunk-effect');
    setTimeout(() => {
      element.classList.remove('cyberpunk-effect');
    }, 3000);
  }

  // Эффект ретро-волн
  addRetroWaveEffect(element) {
    if (!element) return;
    
    element.classList.add('retro-wave');
    setTimeout(() => {
      element.classList.remove('retro-wave');
    }, 2000);
  }

  // Эффект печатающей машинки
  addTypewriterEffect(element) {
    if (!element) return;
    
    element.classList.add('typewriter');
    setTimeout(() => {
      element.classList.remove('typewriter');
    }, 3000);
  }

  // Комбинированный эффект взлома
  addHackEffect() {
    this.addScreenShake();
    this.addColorDistortion();
    this.addStatic();
    this.addMatrixEffect();
    
    // Глитчи на всех элементах терминала
    const elements = document.querySelectorAll('#output div');
    elements.forEach((el, index) => {
      setTimeout(() => {
        this.addTextGlitch(el);
        this.addTextDistortion(el);
      }, index * 50);
    });
  }

  // Эффект вирусного заражения
  addViralEffect() {
    this.addScreenShake();
    this.addExplosionEffect();
    
    // Постепенное заражение элементов
    const elements = document.querySelectorAll('#output div');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.color = '#ff0000';
        this.addTextGlitch(el);
        this.addPulseEffect(el);
      }, index * 100);
    });
    
    // Восстановление через 3 секунды
    setTimeout(() => {
      elements.forEach(el => {
        el.style.color = '';
      });
    }, 3000);
  }

  // Эффект успешного взлома
  addSuccessEffect() {
    this.addGlowEffect(document.body);
    this.addPulseEffect(document.body);
    
    // Создаем эффект успеха
    const successMessage = document.createElement('div');
    successMessage.textContent = 'ACCESS GRANTED';
    successMessage.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--primary-color);
      font-size: 2em;
      font-weight: bold;
      z-index: 1000;
      text-shadow: 0 0 20px var(--primary-color);
    `;
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
      if (successMessage.parentNode) {
        document.body.removeChild(successMessage);
      }
    }, 2000);
  }

  // Случайные эффекты
  addRandomEffect() {
    const effects = [
      () => this.addScanline(),
      () => this.addScreenFlicker(),
      () => this.addColorDistortion(),
      () => this.addStatic(),
      () => this.addMatrixEffect(),
      () => this.addExplosionEffect()
    ];
    
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    randomEffect();
  }

  // Запуск автоматических эффектов
  startAutoEffects() {
    if (this.isActive) return;
    this.isActive = true;
    
    setInterval(() => {
      if (Math.random() < 0.01) { // 1% шанс каждые 100мс
        this.addRandomEffect();
      }
    }, 100);
  }

  // Остановка автоматических эффектов
  stopAutoEffects() {
    this.isActive = false;
  }

  // Очистка всех активных эффектов
  clearAllEffects() {
    this.currentEffects.forEach(effect => {
      if (effect.parentNode) {
        effect.parentNode.removeChild(effect);
      }
    });
    this.currentEffects.clear();
  }
}

// CSS анимации для эффектов
const style = document.createElement('style');
style.textContent = `
  @keyframes scanlineMove {
    0% { transform: translateY(-100vh); }
    100% { transform: translateY(100vh); }
  }
  
  @keyframes flickerEffect {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }
  
  @keyframes staticEffect {
    0% { opacity: 0; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
    100% { opacity: 0; transform: scale(1); }
  }
  
  .terminal-glitch {
    animation: terminalGlitch 0.3s ease-in-out;
  }
  
  @keyframes terminalGlitch {
    0% { transform: translate(0); }
    20% { transform: translate(-1px, 1px); }
    40% { transform: translate(-1px, -1px); }
    60% { transform: translate(1px, 1px); }
    80% { transform: translate(1px, -1px); }
    100% { transform: translate(0); }
  }
`;

document.head.appendChild(style);

// Экспорт экземпляра для использования
export const vhsEffects = new VHSEffects(); 