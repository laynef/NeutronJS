const fs = require('fs');
const path = require('path');

const description = 'Change javascript frameworks or style types';

const command = (type, options) => {

    if (!type || !options) {
        console.red(``);
        return;
    }

    const jsTypes = {
        'react': 'jsx',
        'angular': 'ts',
        'vue': 'vue',
        'js': 'js',
    };

    const styleTypes = {
        'sass': 'scss',
        'less': 'less',
        'css': 'css',
    };

    const styles = Object.keys(styleTypes).reduce((acc, item) => {
        acc[item] = item;
        return acc;
    }, {});

    const javascripts = Object.keys(jsTypes).reduce((acc, item) => {
        acc[item] = item;
        return acc;
    }, {});

    const trail = fs.readdirSync(path.join(__dirname, 'assets')).reduce((acc, item) => {
        if (styles[item]) acc[item] = styles[item];
        if (javascripts[item]) acc[item] = javascripts[item];
        return acc;
    }, {});

    const before = Object.keys(trail)[0];
    const after = Object.values(trail)[0];

    // styles change file path types
    // javascript change full root files
    fs.readdirSync(path.join(__dirname, 'assets', before, 'pages'));
    fs.readdirSync(path.join(__dirname, 'assets', after, 'pages'));

    console.green('');
};

const documentation = () => {
    console.yellow(``);
};

module.exports = {
    command,
    description,
    documentation,
};
