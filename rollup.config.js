import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
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
        commonjs(),
        babel({
            exclude: 'node_modules/**',
        }),
        replace({
            'process.env.NODE_ENV': '"production"',
        }),
    ],
};
