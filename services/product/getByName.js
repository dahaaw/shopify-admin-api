const fetch = require( '../fetch' );

module.exports = ( name, status = 'any' ) => {
    const arr_product = fetch( 'get', `/products.json?title=${ name }` );
    return arr_product;
}