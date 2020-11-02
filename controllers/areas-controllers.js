const fetchAreas = require('../models/areas-models.js')

const getAreas = (req, res, next) => {
    fetchAreas().then((areas) => {
        Promise.all([areas.rows, areas.rowCount]).then(([areas, totalCount]) => {
            res.send({ areas, totalCount })
        }).catch((err) => {
        console.log(err);
    })
    })
}



// const postAreas = (req, res, next) => {

// }

module.exports = { getAreas }