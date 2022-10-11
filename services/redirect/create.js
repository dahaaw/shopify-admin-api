const fetch = require( '../fetch' );

module.exports = ( from, to ) => {
    const data = {
        redirect: {
            path: from,
            target: to
        }
    }
    const arr_product = fetch( 'post', `/redirects.json`, data );
    return arr_product;
}