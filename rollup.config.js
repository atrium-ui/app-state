import typescript from '@rollup/plugin-typescript';

export default [
	{
		input: 'src/index.ts',
		output: {
			file: 'lib/app-state.min.js',
			format: 'esm'
		},
		plugins: [typescript()]
	}
];
