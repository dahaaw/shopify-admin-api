const fetch = require( '../fetch' );

module.exports = ( id ) => {
    const arr_product = fetch( 'post', `/orders/${ id }/close.json` );
    return arr_product;
}