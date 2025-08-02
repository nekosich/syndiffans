let fileSystem = null;
let currentDir = null;
let pathStack = [];

async function loadFileSystem() {
  const res = await fetch('data/fs.json');
  fileSystem = await res.json();
  currentDir = fileSystem;
  pathStack = [fileSystem];
}

function getCurrentPath() {
  return pathStack.map(p => p.name).join('/').replace('//', '/');
}

function ls() {
  return currentDir.children
    .map(item => item.name + (item.type === 'directory' ? '/' : ''))
    .join('  ');
}

function cd(dirName) {
  if (dirName === '..') {
    if (pathStack.length > 1) {
      pathStack.pop();
      currentDir = pathStack[pathStack.length - 1];
    }
    return;
  }

  const dir = currentDir.children.find(item => item.name === dirName && item.type === 'directory');
  if (dir) {
    pathStack.push(dir);
    currentDir = dir;
  } else {
    throw new Error(`No such directory: ${dirName}`);
  }
}

function cat(fileName) {
  const file = currentDir.children.find(item => item.name === fileName && item.type === 'file');
  if (file) return file.content;
  throw new Error(`File not found: ${fileName}`);
}

export { loadFileSystem, getCurrentPath, ls, cd, cat };

