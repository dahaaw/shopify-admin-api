const fetch = require( '../fetch' );

module.exports = ( id ) => {
    const metafields = fetch( 'get', `/products/${ id }/metafields.json` );
    return metafields;
}