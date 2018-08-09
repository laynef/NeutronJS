const meta = require('../../app.json');

module.exports = {

    globalRenders: (req, customs) => {
        meta.keywords = Array.isArray(meta.keywords) ? meta.keywords.join(',') : '';
        const navtivePorts = {
            '443': true,
            '80': true,
        };
        
        return {
            ...customs,
            ...meta,
            csrf: req.session.cookie.token,
            host: `${req.protocol}://${req.hostname}${req.port && navtivePorts[req.port] ? '' : `:${req.port || 8080}`}${req.url}`
        };
    },

};
