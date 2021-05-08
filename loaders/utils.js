/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

exports.loadDataFolder = function loadDataFolder({ dataFolder, validateDataFile }) {
  const dataFiles = fs.readdirSync(dataFolder);
  const data = {};

  for (const dataFile of dataFiles) {
    if (path.basename(dataFile) === 'index.ts') continue;

    const clubFileContent = fs.readFileSync(path.join(dataFolder, dataFile)).toString();
    const frontMatter = matter(clubFileContent);

    const { valid, reason } = validateDataFile(frontMatter.data);
    if (!valid) {
      console.error(`Ignoring data file ${dataFile}. Reason: ${reason}`);
      continue;
    }

    const slug = frontMatter.data.slug || path.parse(dataFile).name;
    frontMatter.data.slug = slug;

    if (data[slug] !== undefined) {
      console.error(`Ignoring data file ${dataFile}. Reason: Duplicate slug ${slug}`);
    }

    data[slug] = frontMatter;
  }

  return data;
};
