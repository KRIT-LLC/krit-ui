import path from 'node:path';
import fs from 'node:fs/promises';

const toPascalCase = (str) => str.split(/[-_.]/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
const stripExtension = (str) => str.split('.').slice(0, -1).join('.');
const isIcon = (filename) => new Set(['.svg', '.png']).has(path.extname(filename));

const makeIconReadme = (filename) => {
  const title = toPascalCase(stripExtension(filename));
  return [
    `#### ${title}`,
    `![${filename}](${filename})`,
  ].join('\n')
}

const dir = path.join(process.cwd(), './lib/assets');
const icons = await fs.readdir(dir).then(files => files.filter(isIcon));
const readme = icons.map(makeIconReadme).join('\n');
const readmePath = path.join(dir, 'README.md');
await fs.writeFile(readmePath, readme);
