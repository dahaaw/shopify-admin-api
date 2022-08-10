const fetch = require( '../fetch' );

module.exports = ( name, status = 'any' ) => {
    const arr_product = fetch( 'get', `/orders.json?name=${ name }&status=${ status }` );
    return arr_product;
}