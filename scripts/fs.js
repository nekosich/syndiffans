import { getSecretContent } from './secret.js';

let fileSystem = null;
let currentDir = null;
let pathStack = [];

async function loadFileSystem() {
  const res = await fetch('data/fs.json');
  fileSystem = await res.json();
  currentDir = fileSystem;
  pathStack = [fileSystem];
  
  // Добавляем секретный файл в корневую директорию
  if (fileSystem.children) {
    fileSystem.children.push({
      name: 'secret.txt',
      type: 'file',
      content: getSecretContent(),
      hidden: true
    });
  }
}

function getCurrentPath() {
  return pathStack.map(p => p.name).join('/').replace('//', '/');
}

function ls() {
  return currentDir.children
    .filter(item => !item.hidden) // Скрываем секретные файлы
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
  if (file) {
    // Специальная обработка для секретного файла
    if (fileName === 'secret.txt') {
      return file.content + '\n\n🎉 SECRET FILE ACCESSED! Your clearance level has been elevated.';
    }
    return file.content;
  }
  throw new Error(`File not found: ${fileName}`);
}

// Функция для поиска файлов (включая скрытые)
function findFiles(pattern) {
  const results = [];
  
  function searchInDir(dir, currentPath = '') {
    if (dir.children) {
      dir.children.forEach(item => {
        const fullPath = currentPath + '/' + item.name;
        if (item.name.toLowerCase().includes(pattern.toLowerCase())) {
          results.push(fullPath + (item.type === 'directory' ? '/' : ''));
        }
        if (item.type === 'directory') {
          searchInDir(item, fullPath);
        }
      });
    }
  }
  
  searchInDir(fileSystem);
  return results;
}

export { loadFileSystem, getCurrentPath, ls, cd, cat, findFiles };

