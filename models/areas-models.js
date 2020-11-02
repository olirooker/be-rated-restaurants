const db = require('../db/index.js')


const fetchAreas = () => {
    return db.query('SELECT * FROM area').then((areas) => {
        return areas
    })
}

const addAreas = (newArea) => {
    console.log(newArea, '<-----line 11 model')
    return db.query('INSERT INTO area(name) VALUES $1;', [newArea.area.name])
}

module.exports = { fetchAreas, addAreas };