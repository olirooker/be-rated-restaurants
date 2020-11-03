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
    return db.query('SELECT * FROM restaurants INNER JOIN area ON restaurants.area_id = area.area_id WHERE restaurants.area_id = $1', [areaId]).then((response) => {
        return response.row
    })
}

module.exports = { fetchAreas, addAreas, fetchRestaurantsByAreaId };