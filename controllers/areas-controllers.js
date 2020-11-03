const { response } = require('express')
const { fetchAreas, addAreas, fetchRestaurantsByAreaId } = require('../models/areas-models.js')

const getAreas = (req, res, next) => {
    fetchAreas().then((areas) => {
        Promise.all([areas.rows, areas.rowCount]).then(([areas, totalCount]) => {
            res.send({ areas, totalCount })
        }).catch((err) => {
            console.log(err);
        })
    })
}


const postAreas = (req, res, next) => {
    const newArea = req.body
    console.log(newArea, '<<--- controller');
    addAreas(newArea).then((area) => {
        res.status(201).send(area)
    })
}

const getRestaurantsByAreaId = (req, res, next) => {
    const areaId = req.params.area_id
    fetchRestaurantsByAreaId(areaId).then((response) => {
        res.status(200).send(response)
    })
}

module.exports = { getAreas, postAreas, getRestaurantsByAreaId }