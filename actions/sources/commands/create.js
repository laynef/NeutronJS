const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const description = 'Create a new project';

const command = (directoryName, options) => {
    if (!directoryName || !options) {
        console.error('Must give your project a name');
        return;
    }

    const root = process.cwd();
    shell.cp('-R', path.join(__dirname, '..', '..', '..', 'templates', 'newProject'), path.join(root, directoryName));
    shell.mv(path.join(root, directoryName, 'gitignore'), path.join(root, directoryName, '.gitignore'));
    shell.cd(path.join(root, directoryName, 'openssl'));
    shell.exec('bash generateSecretKeys.sh web-secret.pem');
    shell.cd(path.join(root));
    console.log('Your project is ready.');
};

const documentation = () => {
    console.info(`
Command:

neurton create <directory-name>
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
