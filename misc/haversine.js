/* 
* This is simple helper module that calculates radius based on
* longitude and latitude
* Algorithm to calculate radius was taken from:
* http://www.movable-type.co.uk/scripts/latlong.html
*/
module.exports.distance = (lat1, long1, lat2, long2) => {
    //converting latitudes to radians
    let lat1R = lat1 * Math.PI/180;
    let lat2R = lat2 * Math.PI/180;
    // finding delta in radians
    let dLat = (lat2-lat1) * Math.PI/180;
    let dLong = (long2-long1)*Math.PI/180;

    // applying harvesine
    const a = (Math.sin(dLat/2))**2 +
        Math.cos(lat1R) * Math.cos(lat2R) *
        (Math.sin(dLong/2))**2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    //return in km
    return 6371 * c
}