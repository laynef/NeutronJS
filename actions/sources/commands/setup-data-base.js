const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const description = 'Setup a SQL database for yourself';

const command = (databaseType, options) => {
    const database = {
        'mongodb': 'mongoose',
        'sql': 'sequelize',
    };

    if (!databaseType || !options) {
        console.error('You must enter a database type');
        return;
    } else if (!database[databaseType]) {
        console.error('Database options are:')
        for (let i in database) {
            console.error(`=> ${i}`);
        }
        return;
    }

    const root = process.cwd();
    const templatePath = path.join(__dirname, '..', '..', '..', 'templates');
    shell.cp('-R', path.join(templatePath, database[databaseType]), path.join(root, 'temp'));
    shell.mv(`${path.join(root, 'temp')}/* .`);
    shell.rm('-rf', path.join(root, 'temp'));

    console.log('Your database has been setup');
};

const documentation = () => {
    console.info(`
Command:
Database Types:
=> SQL: Using sequelize for any SQL database
=> MongoDB: Using mongoose for your MongoDB database

neutron setup-data-base <database-type>
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
