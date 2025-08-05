// Дополнительные VHS эффекты для терминала

export class VHSEffects {
  constructor() {
    this.isActive = false;
    this.effects = [];
  }

  // Эффект сканирующей линии
  addScanline() {
    const scanline = document.createElement('div');
    scanline.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #00ff41, transparent);
      z-index: 1000;
      pointer-events: none;
      animation: scanlineMove 0.1s linear;
    `;
    
    document.body.appendChild(scanline);
    
    setTimeout(() => {
      document.body.removeChild(scanline);
    }, 100);
  }

  // Эффект глитча текста
  addTextGlitch(element) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let glitchCount = 0;
    const glitchInterval = setInterval(() => {
      const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
      const randomIndex = Math.floor(Math.random() * originalText.length);
      
      let newText = originalText.split('');
      newText[randomIndex] = randomChar;
      element.textContent = newText.join('');
      
      glitchCount++;
      if (glitchCount > 5) {
        clearInterval(glitchInterval);
        element.textContent = originalText;
      }
    }, 50);
  }

  // Эффект мерцания экрана
  addScreenFlicker() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 255, 65, 0.1);
      z-index: 999;
      pointer-events: none;
      animation: flickerEffect 0.05s ease-out;
    `;
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 50);
  }

  // Эффект искажения цвета
  addColorDistortion() {
    document.body.style.filter = 'hue-rotate(180deg) saturate(1.5)';
    setTimeout(() => {
      document.body.style.filter = 'none';
    }, 200);
  }

  // Эффект статики
  addStatic() {
    const staticOverlay = document.createElement('div');
    staticOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        radial-gradient(circle at 20% 50%, rgba(0, 255, 65, 0.1) 1px, transparent 1px),
        radial-gradient(circle at 80% 20%, rgba(0, 255, 65, 0.1) 1px, transparent 1px),
        radial-gradient(circle at 40% 80%, rgba(0, 255, 65, 0.1) 1px, transparent 1px);
      background-size: 50px 50px, 30px 30px, 40px 40px;
      z-index: 998;
      pointer-events: none;
      animation: staticEffect 0.2s ease-out;
    `;
    
    document.body.appendChild(staticOverlay);
    
    setTimeout(() => {
      document.body.removeChild(staticOverlay);
    }, 200);
  }

  // Случайные эффекты
  addRandomEffect() {
    const effects = [
      () => this.addScanline(),
      () => this.addScreenFlicker(),
      () => this.addColorDistortion(),
      () => this.addStatic()
    ];
    
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    randomEffect();
  }

  // Запуск автоматических эффектов
  startAutoEffects() {
    if (this.isActive) return;
    this.isActive = true;
    
    setInterval(() => {
      if (Math.random() < 0.02) { // 2% шанс каждые 100мс
        this.addRandomEffect();
      }
    }, 100);
  }

  // Остановка автоматических эффектов
  stopAutoEffects() {
    this.isActive = false;
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