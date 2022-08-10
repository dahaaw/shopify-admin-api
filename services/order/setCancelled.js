const fetch = require( '../fetch' );

module.exports = ( id ) => {
    const arr_product = fetch( 'post', `/orders/${ id }/cancel.json` );
    return arr_product;
}