/* eslint-env node */

module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['../.eslintrc.js', 'plugin:vue/vue3-recommended', 'prettier'],
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	overrides: [
		{
			files: ['*.vue', '*.d.ts', './plugins/*'],
			rules: {
				'import/no-default-export': 'off',
			},
		},
	],
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['~', './src'],
					['~shared', '../shared'],
					['~data/clubs', '../shared/types/club'],
					['~data/announcements', '../shared/types/announcement'],
					['~data/events', '../shared/types/event'],
				],
				extensions: ['.js', '.ts'],
			},
		},
	},
};
