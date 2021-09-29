import { camelCase } from 'camel-case';
import execa from 'execa';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import pkgDir from 'pkg-dir';
import { parse } from 'shell-quote';

const projectDir = path.join(pkgDir.sync(__dirname)!, '..');

export async function genTypes() {
	const typedefsDir = path.join(projectDir, 'shared/typedefs');
	const typingsDir = path.join(projectDir, 'shared/types');

	fs.mkdirSync(typingsDir, { recursive: true });

	const typedefsFiles = fs.readdirSync(typedefsDir);
	for (const typedefFile of typedefsFiles) {
		if (!typedefFile.endsWith('.yaml')) continue;

		const typedefFilePath = path.join(typedefsDir, typedefFile);
		const typedefName = path.parse(typedefFile).name;

		const jsonTypedef = JSON.stringify(
			yaml.load(fs.readFileSync(typedefFilePath).toString())
		);

		const typedefTypingsDir = path.join(typingsDir, typedefName);
		fs.mkdirSync(typedefTypingsDir, { recursive: true });
		execa(
			`jtd-codegen`,
			parse(
				`- --root-name ${camelCase(
					typedefName
				)} --typescript-out ${typedefTypingsDir}`
			) as string[],
			{ input: jsonTypedef, stdout: 'inherit' }
		);
	}
}

void genTypes();
