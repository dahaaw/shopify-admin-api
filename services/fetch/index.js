const fetch = require('node-fetch');
const { API_VERSION, SHOPIFY_URL, SHOPIFY_TOKEN } = process.env;


module.exports = async ( method, url, body ) => {
    let request = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': SHOPIFY_TOKEN
        }
    }
    if ( body ) request.body = JSON.stringify( body );

    const response = await fetch( SHOPIFY_URL + `/admin/api/${ API_VERSION }/` + url, request);
    console.log(SHOPIFY_URL + `/admin/api/${ API_VERSION }/` + url, request);
    console.log({SHOPIFY_TOKEN, SHOPIFY_URL, url, method})
    return response;

}