const db = require('../db/index.js')


const fetchAreas = () => {
    return db.query('SELECT * FROM area').then((areas) => {
        return areas
    })
}

const addAreas = (newArea) => {
    
    return db.query('INSERT INTO area (name) VALUES ($1) RETURNING *', [newArea.areas[0].name]).then((updatedArea) => {
        return updatedArea.rows[0];
    })
}

module.exports = { fetchAreas, addAreas };