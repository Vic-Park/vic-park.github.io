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
					['~types', '../../types'],
				],
				extensions: ['.js', '.ts', '.vue'],
			},
		},
	},
};
