import type { TSchema } from '@sinclair/typebox';
import Ajv from 'ajv';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

import type { Club } from '~shared/types/club';

const ajv = new Ajv({ strict: false });

type LoadDataFolderProps = {
	dataFolder: string;
	schema: TSchema;
};
export function loadDataFolder({ dataFolder, schema }: LoadDataFolderProps) {
	const validate = ajv.compile(schema);

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
				`Ignoring data file ${dataFile}. Validation errors: ${JSON.stringify(
					validate.errors
				)}`
			);
		} else {
			data[slug] = clubData as Club;
		}
	}

	return data;
}
