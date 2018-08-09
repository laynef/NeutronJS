module.exports = ({ apiVersion, allRoutes }) => (req, res) => {
    let listOfPromises = allRoutes.slice(0).map(e => e.controller(req, res, true));

    Promise.all(listOfPromises).then((promises) => {
        Promise.all(promises).then((values) => {
            let fullData = values.reduce((acc, item, index) => {
                let returns = item || { error: 'Not Available' };
                acc[index].data = JSON.stringify(returns, null, 4);
                return acc;
            }, allRoutes);

            res.status(200).render('docs', {
                routes: fullData,
                apiVersion: apiVersion,
            });
        }).catch(() => res.status(400).render('docs', { routes: { data: [] } }));
    }).catch(() => res.status(400).render('docs', { routes: { data: [] } }));
};