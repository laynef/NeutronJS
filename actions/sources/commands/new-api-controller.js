const path = require('path');
const shell = require('shelljs');

const description = 'Add new api controller to any api version';

const command = (controllerName, options) => {
    if (!controllerName || !options) {
        console.error('Must enter a controller name');
        return;
    }   

    const templatePath = path.join(__dirname, '..', '..', '..', 'templates', 'newApiController');
    const root = process.cwd();
    const apiVersionPath = path.join(root, 'controllers', `v${options.version || 1}`, controllerName);
    shell.cp('-R', templatePath, apiVersionPath);
    console.log('Your new api controller has been created');

};

const documentation = () => {
    console.info(`
Command:

neutron new-api-controller <controller-name>
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
