const fetch = require( '../fetch' );

module.exports = ( handle ) => {
    const smartColl = fetch( 'get', `/smart_collections.json?handle=${ handle }` );
    return smartColl;
}