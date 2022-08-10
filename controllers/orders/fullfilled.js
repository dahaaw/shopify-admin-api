const services = require( '../../services' );

module.exports = async ( req, res ) => {
    const arr_orders_names = [
        "000000515",
        "000000525",
        "000000592",
        "000000595",
        "000000671",
        "000000704",
        "000000751",
        "000000896",
        "000001167",
        "000001179",
        "000001197",
        "000001215",
        "000001222",
        "000001311",
        "000001428",
        "000001486",
        "000001747",
        "000001782",
        "000001790",
        "000001812",
        "000001879",
        "000001951",
        "000001959",
        "000001969",
        "000002064",
        "000002065",
        "000002232",
        "000002516",
        "000002689",
        "000002796",
        "000002854",
        "000002922",
        "000003272",
        "000003338",
        "000003347",
        "000003401",
        "000003551",
        "000003562",
        "000003825",
        "000003860",
        "000004031",
        "000004289",
        "000005258",
        "000005779",
        "000005929",
        "000006000",
        "000006036",
        "000006332",
        "000006485",
        "000006652",
        "000006714",
        "000006813",
        "000007159",
        "000007294",
        "000007454",
        "000007517",
        "000007827",
        "000007965",
        "000007975",
        "000008250",
        "000008607",
        "000008888",
        "000009240",
        "000009266",
        "000009311",
        "000009327",
        "000009441",
        "000009454",
        "000009554",
        "000009960",
        "000010079",
        "000010130",
        "000010187",
        "000010313",
        "000010618",
        "000010843",
    ];

    let logText = `// Set Fulfilled
    `;
    for (const order_name of arr_orders_names) {
        let order_data = await services.order.getByName( order_name );
        order_data = await order_data.json();

        if( order_data.orders?.length ){
            // const fulfilled = await services.order.fulfilled( order_data.orders[0].id );
            // if( fulfilled.fulfillment?.id){
            const fulfilled = await services.order.setArchived( order_data.orders[0].id );
            if( fulfilled.order?.id){
                logText += `// ${ order_name } ok
                `;
            }else {
                logText += `// ${ order_name }
                ${JSON.stringify(fulfilled, 0, 3)}
                `;
            }
            
        } else {
            logText += `// ${ order_name } not found
            `;
        }
    }
    services.logs.write( 'fulfilled_orders', logText );
    res.json({ok:'ok'})
}