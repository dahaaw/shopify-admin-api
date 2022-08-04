const { API_VERSION } = process.env;
const fetch = require( '../fetch' );

module.exports = ( productID, collectionID ) => {
    const request = {
        collect:{
            product_id: productID,
            collection_id: collectionID
        }
    }
    const fetched = fetch( 'post', `/collects.json`, request );
    return fetched;
}