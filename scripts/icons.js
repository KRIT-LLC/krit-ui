import fs from 'node:fs/promises';
import path from 'node:path';

const toPascalCase = str =>
  str
    .split(/[-_.]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
const stripExtension = str => str.split('.').slice(0, -1).join('.');
const isIcon = filename => new Set(['.svg', '.png']).has(path.extname(filename));

/**
 * Добавление префикса, в название переменной если она начинается с числа
 */
const getPrefix = firstChart => (isNaN(parseInt(firstChart)) ? '' : 'N');

const makeIconReadme = filename => {
  const title = toPascalCase(stripExtension(filename));
  const prefix = getPrefix(title[0]);
  return [`#### ${prefix}${title}Icon`, `![${filename}](${filename})`].join('\n');
};

const makeIconExport = filename => {
  const title = toPascalCase(stripExtension(filename));
  if (!filename.endsWith('.svg')) return; // Плагин для импорта иконок только для SVG
  const prefix = getPrefix(title[0]);
  return `export { default as ${prefix}${title}Icon } from '@/assets/${filename}?react';`;
};

const dir = path.join(process.cwd(), './lib/assets');
const icons = await fs.readdir(dir).then(files => files.filter(isIcon));

const readme = icons.map(makeIconReadme).join('\n');
const readmePath = path.join(dir, 'README.md');
await fs.writeFile(readmePath, readme);

const index = icons.map(makeIconExport).join('\n');
const indexPath = path.join(dir, 'index.ts');
await fs.writeFile(indexPath, index);
