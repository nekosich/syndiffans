import { ls, cd, cat, getCurrentPath } from './fs.js';
import { vhsEffects } from './effects.js';
import { audioGenerator } from './audio.js';
import { CONFIG } from './config.js';

const commands = {
  help: () => `
Available commands:
- help
- clear
- ls
- cd [dir]
- cat [file]
- shutdown
- glitch
- matrix
- hack
- status
- version
`,

  clear: () => {
    const output = document.getElementById('output');
    output.innerHTML = '';
    return '';
  },

  ls: () => ls(),

  cd: (arg) => {
    try {
      cd(arg || '/');
      return `Current directory: ${getCurrentPath()}`;
    } catch (err) {
      return err.message;
    }
  },

  cat: (arg) => {
    try {
      return cat(arg);
    } catch (err) {
      return err.message;
    }
  },

  shutdown: () => {
    window.location.href = "index.html";
    return "System shutting down...";
  },

  glitch: () => {
    // Активируем глитч-режим
    vhsEffects.addColorDistortion();
    vhsEffects.addStatic();
    audioGenerator.generateGlitch();
    
    return `
GLITCH MODE ACTIVATED
System integrity compromised...
Attempting recovery...
Recovery successful.
`;
  },

  matrix: () => {
    // Эффект матрицы
    document.body.style.filter = 'hue-rotate(120deg) saturate(2)';
    setTimeout(() => {
      document.body.style.filter = 'none';
    }, 2000);
    
    return `
Entering Matrix mode...
Welcome to the digital realm.
Reality is just a construct.
`;
  },

  hack: () => {
    // Эффект взлома
    vhsEffects.addTextGlitch(document.querySelector('#output'));
    audioGenerator.generateError();
    
    return `
HACKING IN PROGRESS...
[████████████████████] 100%
Access granted to mainframe.
`;
  },

  status: () => {
    const colors = CONFIG.colors;
    return `
SYSTEM STATUS:
├── Terminal: ONLINE
├── VHS Effects: ACTIVE
├── Audio: ENABLED
├── Primary Color: ${colors.primary}
├── Secondary Color: ${colors.secondary}
└── Access Level: SYNDICATE // RED
`;
  },

  version: () => {
    return `
Syndicate Terminal v2.0
Build: VHS-2024
Features:
├── VHS Effects Engine
├── Audio Generation System
├── Glitch Animation Framework
├── Configurable Interface
└── Retro Terminal Experience

Made with ❤️ and lots of VHS vibes
`;
  }
};

export default commands;

