const { API_VERSION } = process.env;
const fetch = require( '../fetch' );

module.exports = ( productID, collectionID ) => {
    const request = {
        collect:{
            product_id: productID,
            collection_id: collectionID
        }
    }
    const fetched = fetch( 'post', `/admin/api/${ API_VERSION }/collects.json`, request );
    return fetched;
}