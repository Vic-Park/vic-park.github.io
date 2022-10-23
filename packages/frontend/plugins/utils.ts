import { ZodSchema } from 'zod'
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

import { Club } from '~shared/types/club';

type LoadDataFolderProps = {
	dataFolder: string;
	schema: ZodSchema;
};
export function loadDataFolder({ dataFolder, schema }: LoadDataFolderProps) {
	const dataFiles = fs.readdirSync(dataFolder);
	const data: Record<string, Club> = {};

	for (const dataFile of dataFiles) {
		if (path.extname(dataFile) !== '.yaml') continue;
		const slug = path.parse(dataFile).name;

		const clubFileContent = fs
			.readFileSync(path.join(dataFolder, dataFile))
			.toString();

		const clubData = yaml.load(clubFileContent);
		const parseResult = schema.safeParse(clubData)
		if (!parseResult.success) {
			console.error(
				`Ignoring data file ${dataFile}. Validation errors:`,
				parseResult.error
			);
		} else {
			data[slug] = clubData as Club;
		}
	}

	return data;
}
