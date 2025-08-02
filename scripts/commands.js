import { ls, cd, cat, getCurrentPath } from './fs.js';

const commands = {
  help: () => `
Available commands:
- help
- clear
- ls
- cd [dir]
- cat [file]
- shutdown
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
  }
};

export default commands;

