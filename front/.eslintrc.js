module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:react/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            legacyDecorators: true,
            experimentalObjectRestSpread: true,
            jsx: true,
        },
        sourceType: 'module',
    },
    plugins: [
        'jsx-a11y',
        'react',
        'html',
        'simple-import-sort',
    ],
    settings: {
        react: {
            pragma: 'React',
            version: '16.8',
        },
    },
    globals: {
        global: true,
        module: true,
        process: true,
        require: true,
    },
    rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'jsx-a11y/label-has-associated-control': 'off',
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        semi: [
            'error',
            'always',
        ],
        eqeqeq: [
            'error',
            'always',
        ],
        quotes: [
            'error',
            'single',
        ],
        'eol-last': [
            'error',
            'always',
        ],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-implicit-coercion': [
            'error',
            {
                boolean: true,
                number: true,
                string: true,
            },
        ],
        'id-length': [
            'error',
            {
                min: 2,
                max: 40,
                exceptions: [
                    'i',
                    'a',
                    'b',
                ],
            },
        ],
        'template-curly-spacing': [
            'error',
            'always',
        ],
        'no-var': 'error',
        'no-param-reassign': 'error',
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'ignore',
            },
        ],
        'quote-props': [
            'error',
            'as-needed',
        ],
        'lines-between-class-members': [
            'error',
            'always',
        ],
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: 'return',
            },
            {
                blankLine: 'always',
                prev: [
                    'const',
                    'let',
                ],
                next: '*',
            },
            {
                blankLine: 'any',
                prev: [
                    'const',
                    'let',
                ],
                next: [
                    'const',
                    'let',
                ],
            },
            {
                blankLine: 'always',
                prev: '*',
                next: 'export',
            },
            {
                blankLine: 'any',
                prev: 'export',
                next: 'export',
            },
            {
                blankLine: 'always',
                prev: 'import',
                next: '*',
            },
            {
                blankLine: 'any',
                prev: 'import',
                next: 'import',
            },
        ],
        'arrow-parens': [
            'error',
            'always',
        ],
        'array-callback-return': [
            'error',
        ],
        'react/button-has-type': [
            'error',
        ],
        'react/boolean-prop-naming': ['error'],
        'react/forbid-dom-props': [
            'error',
            { forbid: ['style'] },
        ],
        'react/no-multi-comp': [
            'error',
        ],
        'react/no-array-index-key': [
            'error',
        ],
        'react/no-unused-prop-types': [
            'error',
        ],
        'react/no-unused-state': [
            'error',
        ],
        'react/require-default-props': [
            'error',
        ],
        'react/sort-comp': [
            'error',
        ],
        'react/prop-types': [
            'error',
            {
                ignore: ['history', 'children', 'pathname'],
            },
        ],
    },
};
