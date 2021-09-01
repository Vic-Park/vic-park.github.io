import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export function loadDataFolder({ dataFolder, validateDataFile }) {
	const dataFiles = fs.readdirSync(dataFolder);
	const data = {};

	for (const dataFile of dataFiles) {
		if (path.extname(dataFile) !== '.md') continue;

		const clubFileContent = fs
			.readFileSync(path.join(dataFolder, dataFile))
			.toString();
		const frontMatter = matter(clubFileContent);

		const { valid, reason } = validateDataFile(frontMatter.data);
		if (!valid) {
			console.error(`Ignoring data file ${dataFile}. Reason: ${reason}`);
			continue;
		}

		const slug = frontMatter.data.slug || path.parse(dataFile).name;
		frontMatter.data.slug = slug;

		if (data[slug] !== undefined) {
			console.error(
				`Ignoring data file ${dataFile}. Reason: Duplicate slug ${slug}`
			);
		}

		data[slug] = frontMatter;
	}

	return data;
}

export function createDataFileValidator(validKeys) {
	function validateKey(key) {
		if (key === 'slug') return true;

		for (const validKey of validKeys) {
			if (typeof validKey === 'string') {
				if (key === validKey) return true;
			} else if (
				typeof validKey === 'object' &&
				'key' in validKey &&
				'type' in validKey
			) {
				if (
					key === validKey.key &&
					key instanceof validKey.type !== undefined
				) {
					return true;
				}
			} else {
				console.error(`Unknown valid key format: ${JSON.stringify(validKey)}`);
				return false;
			}
		}

		// None of the valid keys matched with the key
		return false;
	}

	return function validateDataFile(frontMatterData) {
		const frontMatterKeys = Object.keys(frontMatterData);
		for (const frontMatterKey of frontMatterKeys) {
			if (!validateKey(frontMatterKey)) {
				return {
					valid: false,
					reason: `Invalid front matter key: ${frontMatterKey}`,
				};
			}
		}
		return { valid: true };
	};
}
