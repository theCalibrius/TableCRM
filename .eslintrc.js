module.exports = {
	extends: [
		'plugin:flowtype/recommended',
		'airbnb',
		'prettier',
		'prettier/react'
	],
	plugins: ['flowtype', 'prettier', 'react'],
	rules: {
		'comma-dangle': ['warn', 'never'],
		indent: ['warn', 2],
		'linebreak-style': ['warn', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-unused-expressions': 'warn',
		'no-useless-concat': 'warn',
		'block-scoped-var': 'error',
		'consistent-return': 'error',
		allowForLoopAfterthoughts: true,
		'no-restricted-syntax': 0,
		'func-names': 'off'
	},
	settings: {
		'import/resolver': 'node'
	}
};
