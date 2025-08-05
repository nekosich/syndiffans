// Конфигурация для Syndicate Terminal

export const CONFIG = {
  // Звуковые настройки
  audio: {
    keystrokeVolume: 0.2,
    effectVolume: 0.15,
    glitchVolume: 0.1,
    errorVolume: 0.2
  },

  // VHS эффекты
  vhs: {
    scanlineSpeed: 8, // секунды
    flickerChance: 0.02, // 2% шанс
    colorDistortionChance: 0.05, // 5% шанс
    staticChance: 0.03, // 3% шанс
    glitchChance: 0.1 // 10% шанс при печати
  },

  // Анимации
  animations: {
    typingSpeed: 20, // мс между символами
    cursorBlinkSpeed: 1, // секунды
    glowSpeed: 2, // секунды
    pulseSpeed: 2 // секунды
  },

  // Цвета
  colors: {
    primary: '#00ff41', // зеленый
    secondary: '#ff5555', // красный
    background: '#000000', // черный
    accent: '#008f2a' // темно-зеленый
  },

  // Коды доступа
  access: {
    realCode: 'REDWOLF',
    fakeCode: 'BLUEFOX'
  },

  // Сообщения
  messages: {
    welcome: `
Welcome, Agent.
Access level: SYNDICATE // RED
Type 'help' for list of commands.
`,
    accessDenied: 'ACCESS DENIED',
    unknownCommand: 'Unknown command: '
  },

  // Настройки терминала
  terminal: {
    prompt: 'agent@syn-core:~$',
    cursor: '█',
    maxHistory: 100
  }
};

// Функции для изменения настроек
export function updateConfig(newConfig) {
  Object.assign(CONFIG, newConfig);
}

export function getAudioConfig() {
  return CONFIG.audio;
}

export function getVHSConfig() {
  return CONFIG.vhs;
}

export function getColors() {
  return CONFIG.colors;
} 