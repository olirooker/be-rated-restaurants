const db = require('../db/index.js')


const fetchAreas = () => {
    return db.query('SELECT * FROM area').then((areas) => {
        return areas
    })
}

module.exports = fetchAreas;