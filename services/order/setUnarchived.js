const fetch = require( '../fetch' );

module.exports = ( id ) => {
    const arr_product = fetch( 'post', `/orders/${ id }/open.json` );
    return arr_product;
}