/*
* Set of reusable functions that can help in
* validating forms and queries
*/

/* Function that checks if 2 numbers can ac t as valid latitude
* and longitude
*/
module.exports.isValidCoordinates = (lat, long) => {
    if (90 < lat || lat < -90 
        || 180 < long || long < -180) {
        return false;
    } else {
        return true;
    }
}