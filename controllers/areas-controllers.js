const { response } = require('express')
const { fetchAreas, addAreas } = require('../models/areas-models.js')

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
    console.log(newArea, '<---- controllers')
    addAreas(newArea).then(() => {
        console.log(res)
            (res.status(201).send())
    })
}

module.exports = { getAreas, postAreas }