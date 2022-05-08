module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	extends: ['prettier'],
	plugins: ['@typescript-eslint', 'prettier'],

	// add your custom rules here
	rules: {
		'prettier/prettier': 'error',
		'arrow-body-style': 'off',
		'prefer-arrow-callback': 'off',
		'class-methods-use-this': 0,
		'no-console': 0,
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'max-len': 0,
		'no-tabs': 0,
		'import/prefer-default-export': 0,
		'import/named': 0,
		'spaced-comment': [
			'error',
			'always',
			{
				markers: ['/']
			}
		],
		'comma-dangle': 0,
		'no-plusplus': 0,
		'prefer-destructuring': 0,
		'consistent-return': 0,
		'no-undefined': 0,
		'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
		'object-curly-spacing': 'off',
		'@typescript-eslint/object-curly-spacing': [2, 'always'],
		'no-dupe-class-members': 'off',
		'@typescript-eslint/no-dupe-class-members': ['error'],
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-inferrable-types': 0,
		'no-unused-vars': 0,
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				args: 'after-used'
			}
		],
		'@typescript-eslint/interface-name-prefix': 'off',
		'semi': 0,
		'@typescript-eslint/semi': ['error']
	}
};
