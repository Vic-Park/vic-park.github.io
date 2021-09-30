module.exports = {
	extends: ['../../.eslintrc.js'],
	root: true,
	env: {
		node: true,
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['~', './src'],
					['~shared', '../../shared'],
				],
				extensions: ['.js', '.ts', '.vue'],
			},
		},
	},
};
