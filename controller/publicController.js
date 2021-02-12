const {Bin} = require('../model/Model')
const {distance} = require('../misc/haversine')
const crypto = require('../misc/crypto')
const { query } = require('express')

/*
* Query all bins within given radius with maximum radius of 100
* If no radius is provided, radius is deafulted to 1km
* NOTE: error handling will be changed
*/
module.exports.getBinsAround = async (req, res) => {
    // Queried location is represented in tuple-like form
    if (!req.query.length) {
        this.publicErrorHandler(0, req, res);
    } else {
        var geolocation = req.query.geo.split(',');
        geolocation.every(n,i => {
        if(Number(n) === NaN) {
            geolocation = [];
            return false;
        } else {
            geolocation[i] = Number(n);
            return true;
        }
        })
        var radius = parseFloat(req.query.rad);
        if(geolocation.length != 2 || !radius 
            || radius <= 0 || 100 <= radius) {
            this.publicErrorHandler(0, req, res);
        } else {
            /* 
            * Temporary algorithm, in future ID of each bin will be modified
            * So that precision to 100km (since it is chosen to be the max distance) will be encoded and only then the 
            * batch of bins will be filtered
            */
            var bins = await Bin.find({})
            console.log(typeof bins)
            bins = bins.filter(bin => {
                console.log(distance(geolocation[0], geolocation[1], bin.latitude, bin.longitude))
                distance(geolocation[0], geolocation[1], bin.latitude, bin.longitude) < radius
            })
            console.log(bins)
            res.status(200).json(bins)
        }
    }
}

module.exports.addBin = async (req, res) => {
    const binToAdd = req.body.json()
    console.log(binToAdd)
    // Temporary form validation, later express-validator will be used
    if (!binToAdd || binToAdd.latitude < -90 || 90 < binToAdd.latitude 
        || binToAdd.longitude < -180 || 180 < binToAdd.longitude
        || (!binToAdd.longitude && binToAdd.longitude != 0)
        || (!binToAdd.latitude && binToAdd.latitude != 0)
        || !binToAdd.binType || !binToAdd.binColor){
        this.publicErrorHandler(1, req, res)
    } else {
        const newBin = await new Bin(binToAdd).save()
        res.status(200).json({id: newBin.id})
    }
}

module.exports.publicErrorHandler = (code, req, res) => {
    switch (code) {
        case 0:
            res.status(400).json({error: 'please check query parameters'});
            break;
        case 1:
            res.status(400).json({error: 'JSON contains insufficient or inappropriate data'})
            break;    
        default:
            res.status(400).json({error: 'oops... something went wrong'})
    }
}