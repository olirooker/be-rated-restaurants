const db = require('../db/index.js')


const fetchAreas = () => {
    return db.query('SELECT * FROM area').then((areas) => {
        return areas
    })
}

const addAreas = (newArea) => {

    return db.query('INSERT INTO area (name) VALUES ($1) RETURNING *', [newArea.name]).then((updatedArea) => {
        return updatedArea.rows[0];
    })
}

const fetchRestaurantsByAreaId = (areaId) => {
    // join the area table and the restaurant table
    console.log('anything', process.env.NODE_ENV)
    return db.query('SELECT * FROM restaurants').then((response) => {
        console.log(response)
        return response
    })
}

module.exports = { fetchAreas, addAreas, fetchRestaurantsByAreaId };