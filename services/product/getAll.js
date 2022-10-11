const fetch = require( '../fetch' );

module.exports = ( limit ) => {
    return fetch('get', `products.json?fields=id%2Ctitle&limit=${ limit }`)
}