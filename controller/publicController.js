const {Bin} = require('../model/Model')
const {distance} = require('../misc/haversine')

/*
* Query all bins within given radius with maximum radius of 100
* If no radius is provided, radius is deafulted to 1km
* NOTE: error handling will be changed
*/
module.exports.getBinsAround = async (req, res) => {
    /* 
    * Temporary algorithm, in future ID of each bin will be modified
    * So that precision to 100km (since it is chosen to be the max distance) will be encoded and only then the 
    * batch of bins will be filtered
    */
    const params = req.query
    var searchRad = req.query.radius;
    if (!searchRad) {
        searchRad = 1;
    }
    var bins = await Bin.find({})
    bins = bins.filter(bin => {
        return distance(params.lat, params.long, bin.latitude, bin.longitude) < searchRad
    })
    res.status(200).json(bins)  
}

module.exports.addBin = async (req, res) => {
    const binToAdd = req.body.json()
    console.log(binToAdd)
    const newBin = await new Bin(binToAdd).save()
    res.status(200).json({id: newBin.id})
}