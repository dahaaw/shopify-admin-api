const { API_VERSION } = process.env
const fetch = require( '../fetch' );
module.exports = ( collectionID, limit = 50 ) => {
    return fetch( 'get', `/admin/api/${ API_VERSION }/collections/${ collectionID }/products.json?limit=${ limit }` );
}