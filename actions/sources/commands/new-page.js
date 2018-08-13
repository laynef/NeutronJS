const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const { startCase } = require('lodash');

const description = 'Generate a new page with it\'s assets';

const command = (pageName, routePath, options) => {

    if (!pageName || !routePath || !options) {
        console.error('Must enter a page name and it\'s route path');
        return;
    }

    const templatePath = path.join(__dirname, '..', '..', '..', 'templates');
    const templates = fs.readFileSync(path.join(templatePath, 'assets', 'page.pug'), { encoding: 'utf8' });
    const newTemplateAssets = templates.replace(/CLIPAGE/g, pageName);
    const newTemplate = newTemplateAssets.replace(/CLITITLE/g, startCase(pageName));
    const root = process.cwd();
    const settings = require(path.join(root, 'webpack', 'settings.json'));
    const application = fs.readFileSync(path.join(root, 'app.js'), { encoding: 'utf8' });
    shell.exec(`mkdir -p ${path.join(root, 'views','pages', routePath)} ${path.join(root, 'assets', settings.styleType, 'pages', routePath)} ${path.join(root, 'assets', settings.jsType, 'pages', routePath)}`);
    fs.writeFileSync(path.join(root, 'views', 'pages', routePath, `${pageName}.pug`), newTemplate);
    shell.cp(path.join(templatePath, 'assets', `page.${settings.styleType}`), path.join(root, 'assets', settings.styleType, 'pages', routePath, `${pageName}.${settings.styleType}`));
    shell.cp(path.join(templatePath, 'assets', `page.${settings.jsType}`), path.join(root, 'assets', settings.jsType, 'pages', routePath, `${pageName}.${settings.jsType}`));
    if (routePath) fs.writeFileSync(path.join(root, 'app.js'), application.replace(/\/\/ Leave Here For Static Routes/g, `// Leave Here For Static Routes\napp.get('${routePath}', render('pages/${routePath}/${pageName}'));`));
    console.green('Your new page assets have be created.')
};

const documentation = () => {
    console.yellow(`
Command:
Route Path: '/route-path'
=> Adding a route path will autogenerate a route with all it's assets

neutron new-page <page-name> <route-path>
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
