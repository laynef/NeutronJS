const fs = require('fs');
const path = require('path');


const index = fs.readdirSync(path.join(__dirname))
.filter(e !== 'index.js')
.reduce((acculum, item) => {
    const filename = /\.js/g.replace(item, '');
    acculum[filename] = require(path.join(__dirname, filename));
    return acculum;
}, {});

module.exports = index;
