const fetch = require( '../fetch' );

module.exports = ( handle, status = 'any' ) => {
    const arr_product = fetch( 'get', `/products.json?handle=${ handle }` );
    return arr_product;
}