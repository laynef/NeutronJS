const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const { startCase } = require('lodash');

const description = 'Generate a new page with it\'s assets';

const command = (pageName, options) => {

    if (!pageName || !options) {
        console.error('Must enter a page name');
        return;
    }

    const templatePath = path.join(__dirname, '..', '..', '..', 'templates');
    const templates = fs.readFileSync(path.join(templatePath, 'assets', 'page.pug'), { encoding: 'utf8' });
    const newTemplateAssets = templates.replace(/CLIPAGE/g, pageName);
    const newTemplate = newTemplateAssets.replace(/CLITITLE/g, startCase(pageName));
    const root = process.cwd();
    const application = fs.readFileSync(path.join(root, 'app.js'), { encoding: 'utf8' });
    fs.writeFileSync(path.join(root, 'views', `${pageName}.pug`), newTemplate);
    shell.cp(path.join(templatePath, 'assets', 'page.css'), path.join(root, 'assets', 'css', `${pageName}.css`));
    shell.cp(path.join(templatePath, 'assets', 'page.js'), path.join(root, 'assets', 'js', `${pageName}.js`));
    if (options.routePath) fs.writeFileSync(path.join(root, 'app.js'), application.replace(/\/\/ Leave Here For Static Routes/g, `// Leave Here For Static Routes\napp.get('${options.routePath}', render('${pageName}'));`));
    console.log('Your new page assets have be created.')
};

const documentation = () => {
    console.info(`
Options:
--routePath='/route-path'
=> Adding a route path will autogenerate a route with all it's assets

Command:

neutron new-page <page-name> [Options]
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
