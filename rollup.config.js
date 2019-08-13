import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
    format: 'umd',
    moduleName: 'ReduxNamespaces',
    context: 'window',
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true,
        }),
        babel({
            exclude: 'node_modules/**',
        }),
        commonjs(),
        replace({
            'process.env.NODE_ENV': '"production"',
        }),
    ],
};
