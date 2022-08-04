const fetch = require( '../fetch' );

module.exports = ( id ) => {
    const original_product = fetch( 'get', `/products/${ id }.json` );
    return original_product;
}