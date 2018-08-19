const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const description = 'Change javascript frameworks or style types';

const command = (type, options) => {

    if (!type || !options) {
        console.red(`Please select a type of asset to change`);
        return;
    }

    const jsTypes = {
        'react': 'jsx',
        'angular': 'ts',
        'vue': 'vue',
        'js': 'js',
    };

    const jsWebpack = {
        'react': {
            "test": ".jsx$",
            "exclude": "node_modules",
            "use": ["babel-loader"]
        },
        'angular': {
            "test": ".ts$",
            "exclude": "node_modules",
            "use": ["babel-loader"]
        },
        'vue': {
            "test": ".vue$",
            "exclude": "node_modules",
            "use": ["babel-loader"]
        },
        'js': {
            "test": ".js$",
            "exclude": "node_modules",
            "use": ["babel-loader"]
        },
    };

    const styleTypes = {
        'sass': 'scss',
        'less': 'less',
        'css': 'css',
    };

    const stylesheets = Object.values(styleTypes).reduce((acc, item) => {
        acc[item] = item;
        return acc;
    }, {});

    const javascripts = Object.values(jsTypes).reduce((acc, item) => {
        acc[item] = item;
        return acc;
    }, {});

    const trail = fs.readdirSync(path.join(__dirname, 'assets')).reduce((acc, item) => {
        if (stylesheets[item]) acc[item] = stylesheets[item];
        if (javascripts[item]) acc[item] = javascripts[item];
        return acc;
    }, {});

    const before = Object.keys(trail)[0];
    const after = Object.values(trail)[0];

    // styles change file path types
    // javascript change full root files
    const arrayOfPaths = (data, pathn) => {
        fs.readdirSync(pathn).forEach(dir => {
            if (fs.lstatSync(path.join(pathn, dir)).isDirectory()) {
                const temp = data;
                temp.push(path.join(pathn, dir));
                arrayOfPaths(temp, path.join(pathn, dir));
            } else {
                data.push(pathn);
            }
        });

        return data;
    };

    const beforeTypes = arrayOfPaths([], path.join(__dirname, 'assets', before, 'pages'));
    shell.mv(path.join(__dirname, 'assets', before), path.join(__dirname, 'assets', after));
    beforeTypes.forEach(e => {
        const fileArray = e.split('/');
        const filename = fileArray[fileArray.length - 1].split('.')[0] + '.' + after;
        const newFile = fileArray.slice(0, fileArray.length - 2).join('/') + filename;
        
        if (jsTypes[before]) {
            shell.mv(e);
            shell.cp(path.join(__dirname, '..', '..', '..', 'templates', 'assets', `page.${after}`), newFile);
        } else {
            shell.mv(e, newFile);
        }
    });

    // Handle webpack here
    const root = process.cwd();
    const pathn = path.join(root, 'webpack', 'settings.json');
    const javascriptSettings = require(pathn);
    javascriptSettings.javascriptSettings = jsWebpack[before];
    fs.writeFileSync(pathn, JSON.stringify(javascriptSettings));

    console.green(`Your settings have been changed from ${before} to ${after}`);
};

const documentation = () => {
    console.yellow(`
Options:
    stylesheets
    -> css
    -> less
    -> sass

    javascripts
    -> js
    -> react
    -> angular
    -> vue

Command:
neutron settings <command-name> [Options]
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
