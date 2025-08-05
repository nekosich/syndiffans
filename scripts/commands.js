import { ls, cd, cat, getCurrentPath, findFiles } from './fs.js';
import { vhsEffects } from './effects.js';
import { audioGenerator } from './audio.js';
import { CONFIG } from './config.js';

// Глобальные переменные для игр и квестов
let currentTheme = 'green';
let secretFileFound = false;
let surveillanceMode = false;
let gameScore = 0;

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
- theme [color] - Change terminal theme (red/green/blue/purple/orange/white)
- surveillance - Toggle surveillance mode
- game - Start mini-game
- quest - Start secret quest
- find [pattern] - Search for hidden files
- decode [text] - Decode encrypted messages
- scan - Scan system for vulnerabilities
- breach - Attempt system breach
- encrypt [text] - Encrypt text
- decrypt [text] - Decrypt text
- ping [host] - Network connectivity test
- trace [route] - Trace network route
- firewall - Check firewall status
- backup - Create system backup
- restore - Restore from backup
- effects - Show available visual effects
- matrix effects - Matrix rain effect
- explosion - Explosion effect
- hologram - Hologram effect
- neon - Neon sign effect
- cyberpunk - Cyberpunk gradient effect
- retro - Retro wave effect
- viral - Viral infection effect
- success - Success effect
- typewriter - Typewriter effect
- pulse - Pulse effect
- glow - Glow effect
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
      const content = cat(arg);
      // Проверяем, не является ли это секретным файлом
      if (arg && arg.toLowerCase().includes('secret')) {
        secretFileFound = true;
        return content + '\n🎉 SECRET FILE DISCOVERED! Quest progress updated.';
      }
      return content;
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
    vhsEffects.addHackEffect();
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
├── Current Theme: ${currentTheme.toUpperCase()}
├── Surveillance: ${surveillanceMode ? 'ACTIVE' : 'INACTIVE'}
├── Secret Files Found: ${secretFileFound ? '1/1' : '0/1'}
├── Game Score: ${gameScore}
└── Access Level: SYNDICATE // RED
`;
  },

  version: () => {
    return `
Syndicate Terminal v3.0
Build: VHS-2024-ENHANCED
Features:
├── VHS Effects Engine
├── Audio Generation System
├── Glitch Animation Framework
├── Configurable Interface
├── Theme System (6 themes)
├── Mini-Games & Quests
├── Surveillance Mode
├── Encryption/Decryption
├── Network Tools
└── Retro Terminal Experience

Made with ❤️ and lots of VHS vibes
`;
  },

  theme: (arg) => {
    const themes = ['red', 'green', 'blue', 'purple', 'orange', 'white'];
    const newTheme = arg.toLowerCase();
    
    if (!themes.includes(newTheme)) {
      return `Available themes: ${themes.join(', ')}`;
    }
    
    const body = document.body;
    body.classList.remove(`theme-${currentTheme}`);
    body.classList.add(`theme-${newTheme}`, 'theme-switching');
    currentTheme = newTheme;
    
    setTimeout(() => {
      body.classList.remove('theme-switching');
    }, 500);
    
    return `Theme changed to ${newTheme.toUpperCase()} mode.`;
  },

  surveillance: () => {
    surveillanceMode = !surveillanceMode;
    
    if (surveillanceMode) {
      // Активируем режим наблюдения
      const overlay = document.createElement('div');
      overlay.id = 'surveillance-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 0, 0, 0.1);
        pointer-events: none;
        z-index: 10;
        animation: pulse 2s infinite;
      `;
      document.body.appendChild(overlay);
      
      return `
SURVEILLANCE MODE ACTIVATED
Monitoring all activities...
Recording in progress...
[REC] Live feed active
`;
    } else {
      // Деактивируем режим наблюдения
      const overlay = document.getElementById('surveillance-overlay');
      if (overlay) overlay.remove();
      
      return `
SURVEILLANCE MODE DEACTIVATED
Recording stopped.
Feed terminated.
`;
    }
  },

  game: () => {
    const games = [
      'HACKER_TYPING',
      'CODE_BREAKER', 
      'SYSTEM_INVADER',
      'NEURAL_NETWORK'
    ];
    
    const selectedGame = games[Math.floor(Math.random() * games.length)];
    
    return `
Starting ${selectedGame}...
Loading game engine...
Game initialized.

🎮 MINI-GAME: ${selectedGame}
Objective: Complete the challenge
Controls: Type the displayed patterns
Difficulty: MEDIUM

Press any key to start...
`;
  },

  quest: () => {
    if (secretFileFound) {
      return `
🎉 QUEST COMPLETED!
You have successfully found the secret file.
Access granted to restricted areas.
New commands unlocked.
`;
    } else {
      return `
🔍 SECRET QUEST INITIATED
Objective: Find the hidden secret file
Hint: Look in unusual directories
Status: IN PROGRESS (0/1 files found)

Use 'find' command to search for files.
`;
    }
  },

  find: (arg) => {
    if (!arg) {
      return 'Usage: find [pattern]\nExample: find secret';
    }
    
    const results = findFiles(arg);
    
    if (results.length === 0) {
      return `No files found matching "${arg}"`;
    }
    
    return `Found ${results.length} file(s) matching "${arg}":\n${results.join('\n')}`;
  },

  decode: (arg) => {
    if (!arg) return 'Usage: decode [text]';
    
    // Простое "декодирование" - переворачиваем текст
    const decoded = arg.split('').reverse().join('');
    return `Decoded: ${decoded}`;
  },

  scan: () => {
    const vulnerabilities = [
      'Scanning system...',
      'Checking firewall...',
      'Analyzing network...',
      'Testing ports...',
      'Vulnerabilities found: 3',
      '  - Port 22: SSH (weak password)',
      '  - Port 80: HTTP (outdated)',
      '  - Port 443: HTTPS (expired cert)',
      'Scan complete.'
    ];
    
    return vulnerabilities.join('\n');
  },

  breach: () => {
    const breachSteps = [
      'Initiating breach sequence...',
      'Bypassing firewall...',
      'Cracking encryption...',
      'Accessing mainframe...',
      'Downloading data...',
      'Covering tracks...',
      'Breach successful!',
      'Data extracted: 2.3TB'
    ];
    
    return breachSteps.join('\n');
  },

  encrypt: (arg) => {
    if (!arg) return 'Usage: encrypt [text]';
    
    // Простое "шифрование" - сдвигаем символы
    const encrypted = arg.split('').map(char => {
      return String.fromCharCode(char.charCodeAt(0) + 3);
    }).join('');
    
    return `Encrypted: ${encrypted}`;
  },

  decrypt: (arg) => {
    if (!arg) return 'Usage: decrypt [text]';
    
    // Простое "дешифрование" - обратный сдвиг
    const decrypted = arg.split('').map(char => {
      return String.fromCharCode(char.charCodeAt(0) - 3);
    }).join('');
    
    return `Decrypted: ${decrypted}`;
  },

  ping: (arg) => {
    const host = arg || 'localhost';
    const responses = [
      `PING ${host} (127.0.0.1) 56(84) bytes of data.`,
      `64 bytes from ${host}: icmp_seq=1 time=0.045 ms`,
      `64 bytes from ${host}: icmp_seq=2 time=0.038 ms`,
      `64 bytes from ${host}: icmp_seq=3 time=0.042 ms`,
      `--- ${host} ping statistics ---`,
      `3 packets transmitted, 3 received, 0% packet loss`,
      `round-trip min/avg/max = 0.038/0.041/0.045 ms`
    ];
    
    return responses.join('\n');
  },

  trace: (arg) => {
    const route = arg || '8.8.8.8';
    const traceResults = [
      `traceroute to ${route} (8.8.8.8), 30 hops max, 60 byte packets`,
      ` 1  192.168.1.1  2.123 ms  1.987 ms  2.045 ms`,
      ` 2  10.0.0.1  5.234 ms  5.123 ms  5.189 ms`,
      ` 3  172.16.0.1  8.456 ms  8.345 ms  8.412 ms`,
      ` 4  * * *`,
      ` 5  8.8.8.8  12.789 ms  12.678 ms  12.745 ms`
    ];
    
    return traceResults.join('\n');
  },

  firewall: () => {
    return `
FIREWALL STATUS:
├── Status: ACTIVE
├── Rules: 127 active, 3 inactive
├── Blocked: 1,234 attempts today
├── Ports: 22, 80, 443, 8080 open
├── Logs: /var/log/firewall.log
└── Last update: 2 minutes ago
`;
  },

  backup: () => {
    const backupSteps = [
      'Creating system backup...',
      'Compressing files...',
      'Encrypting backup...',
      'Uploading to secure server...',
      'Verifying integrity...',
      'Backup completed successfully!',
      'Location: /backups/system_2024_01_15.tar.gz',
      'Size: 1.2GB'
    ];
    
    return backupSteps.join('\n');
  },

  restore: () => {
    return `
RESTORE SYSTEM
⚠️  WARNING: This will overwrite current system
Are you sure? (y/N)

Type 'restore confirm' to proceed.
`;
  },

  effects: () => {
    return `
AVAILABLE EFFECTS:
- matrix - Matrix rain effect
- explosion - Explosion effect
- hologram - Hologram effect
- neon - Neon sign effect
- cyberpunk - Cyberpunk gradient effect
- retro - Retro wave effect
- viral - Viral infection effect
- success - Success effect
- typewriter - Typewriter effect
- pulse - Pulse effect
- glow - Glow effect

Usage: effects [effect_name]
Example: effects matrix
`;
  },

  matrix: (arg) => {
    if (arg === 'effects') {
      vhsEffects.addMatrixEffect();
      return 'Matrix effect activated!';
    }
    return 'Use: matrix effects';
  },

  explosion: () => {
    vhsEffects.addExplosionEffect();
    return 'Explosion effect triggered!';
  },

  hologram: () => {
    const output = document.querySelector('#output');
    vhsEffects.addHologramEffect(output);
    return 'Hologram effect applied to terminal!';
  },

  neon: () => {
    const output = document.querySelector('#output');
    vhsEffects.addNeonSignEffect(output);
    return 'Neon sign effect activated!';
  },

  cyberpunk: () => {
    const output = document.querySelector('#output');
    vhsEffects.addCyberpunkEffect(output);
    return 'Cyberpunk effect applied!';
  },

  retro: () => {
    const output = document.querySelector('#output');
    vhsEffects.addRetroWaveEffect(output);
    return 'Retro wave effect triggered!';
  },

  viral: () => {
    vhsEffects.addViralEffect();
    return 'Viral infection effect activated!';
  },

  success: () => {
    vhsEffects.addSuccessEffect();
    return 'Success effect triggered!';
  },

  typewriter: () => {
    const output = document.querySelector('#output');
    vhsEffects.addTypewriterEffect(output);
    return 'Typewriter effect applied!';
  },

  pulse: () => {
    const output = document.querySelector('#output');
    vhsEffects.addPulseEffect(output);
    return 'Pulse effect activated!';
  },

  glow: () => {
    const output = document.querySelector('#output');
    vhsEffects.addGlowEffect(output);
    return 'Glow effect applied!';
  }
};

export default commands;

