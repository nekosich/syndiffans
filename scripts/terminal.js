const input = document.getElementById('commandInput');
const output = document.getElementById('output');
const keystroke = document.getElementById('keystrokeSound');

const WELCOME_MSG = `
Welcome, Agent.
Access level: SYNDICATE // RED
Type 'help' for list of commands.
`;

const commands = {
  help: () => {
    return `
Available commands:
- help
- clear
- shutdown
- ls
- cd [dir]
- cat [file]
`;
  },
  clear: () => {
    output.innerHTML = '';
    return '';
  },
  shutdown: () => {
    window.location.href = "index.html";
    return "Shutting down...";
  },
  ls: () => {
    return "agents/ reports/ plans/";
  },
  cd: (arg) => {
    return `Switched to directory: ${arg || '/'}`;
  },
  cat: (arg) => {
    return `Reading file: ${arg || '[file]'}`;
  }
};

function printOutput(text) {
  const line = document.createElement('div');
  line.textContent = text;
  output.appendChild(line);
  window.scrollTo(0, document.body.scrollHeight);
}

function handleCommand(cmd) {
  const parts = cmd.split(" ");
  const base = parts[0];
  const arg = parts.slice(1).join(" ");

  printOutput(`agent@syn-core:~$ ${cmd}`);

  if (commands[base]) {
    const result = commands[base](arg);
    if (result) printOutput(result);
  } else {
    printOutput(`Unknown command: ${base}`);
  }
}

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const command = input.value.trim();
    input.value = '';
    keystroke.play();
    if (command) handleCommand(command);
  }
});

// Initial welcome message
WELCOME_MSG.split('\n').forEach(line => printOutput(line));

