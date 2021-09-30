import Ajv from 'ajv/dist/jtd';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

import type { Club } from '~shared/types/club';

type LoadDataFolderProps = {
	dataFolder: string;
	schemaFilePath: string;
};
export function loadDataFolder({
	dataFolder,
	schemaFilePath,
}: LoadDataFolderProps) {
	const ajv = new Ajv();
	const typedefSchema = fs.readFileSync(schemaFilePath);
	const validate = ajv.compile(typedefSchema);

	const dataFiles = fs.readdirSync(dataFolder);
	const data: Record<string, Club> = {};

	for (const dataFile of dataFiles) {
		if (path.extname(dataFile) !== '.yaml') continue;
		const slug = path.parse(dataFile).name;

		const clubFileContent = fs
			.readFileSync(path.join(dataFolder, dataFile))
			.toString();

		const clubData = yaml.load(clubFileContent);
		if (validate(clubData) === undefined) {
			console.error(
				`Ignoring data file ${dataFile}. Validation errors: ${validate.errors}`
			);
		} else {
			data[slug] = clubData as Club;
		}
	}

	return data;
}
