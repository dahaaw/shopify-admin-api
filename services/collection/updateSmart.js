const fetch = require( '../fetch' );

module.exports = ( id, objectValue ) => {
    const data = {
        smart_collection: {
            id: id,
            ...objectValue
        }
    }
    const smartColl = fetch( 'put', `/smart_collections/${ id }.json`, data );
    return smartColl;
}