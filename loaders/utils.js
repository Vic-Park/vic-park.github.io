/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

exports.loadDataFolder = function loadDataFolder({ dataFolder, validateDataFile }) {
  const dataFiles = fs.readdirSync(dataFolder);
  const data = [];

  for (const dataFile of dataFiles) {
    if (path.basename(dataFile) === 'index.ts') continue;

    const clubFileContent = fs.readFileSync(path.join(dataFolder, dataFile)).toString();
    const frontMatter = matter(clubFileContent);

    const { valid, reason } = validateDataFile(frontMatter.data);
    if (!valid) {
      console.error(`Ignoring data file ${dataFile}. Reason: ${reason}`);
      continue;
    }

    data.push(frontMatter);
  }

  return data;
};
