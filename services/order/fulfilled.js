const { API_VERSION, SHOPIFY_URL, SHOPIFY_TOKEN } = process.env;
const fetch = require( '../fetch' );
let nodeFetch = require( 'node-fetch' );

module.exports = async ( id ) => {   

    let order_detail = await fetch( 'get', `/orders/${ id }.json` );
    order_detail = await order_detail.json();

    // return order_detail;
    

    // let body = {
    //     fulfillment :{
    //         notify_customer: false,
    //         message: "",
    //         tracking_info: {
    //             company: "",
    //             number: null,
    //             url: ""
    //         },
    //         line_items_by_fulfillment_order: [
    //             {
    //                 fulfillment_order_id: id
    //             }
    //         ]
    //     }
    // }

    // let fulfillment = await fetch( 'post', '/fulfillments.json', body);
    // console.log(fulfillment)
    // fulfillment = await fulfillment.json();
    // return fulfillment;

    let body = {
        "fulfillment": {
            "location_id": 68994662624,
            "tracking_number": null,
            "notify_customer": false
        }
    };
    let request = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': SHOPIFY_TOKEN
        },
        body: JSON.stringify(body)
    }
    let fulfill = await nodeFetch( SHOPIFY_URL + `/admin/api/2019-10/orders/${id}/fulfillments.json`, request);
    fulfill = await fulfill.json();
    return fulfill;
}