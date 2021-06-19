const { paramCase } = require('param-case');
const fs = require('fs');
const path = require('path');
const pkgDir = require('pkg-dir');

const rootPath = path.join(pkgDir.sync(__dirname), '..');

async function makeParamCase() {
  const imgDir = path.join(rootPath, 'frontend', 'public', 'img', 'club-img');

  try {
    const files = await fs.promises.readdir(imgDir);

    for (const file of files) {
      const fromPath = path.join(imgDir, file);
      const toPath = path.join(imgDir, paramCase(file));

      // Stat the file to see if we have a file or dir
      const stat = await fs.promises.stat(fromPath);

      if (stat.isFile()) {
        await fs.promises.rename(fromPath, toPath);
        console.log("Moved '%s'->'%s'", fromPath, toPath);
      }
    }
  } catch (e) {
    console.error('Error: ', e);
  }
}

makeParamCase();
