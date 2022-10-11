const services = require( '../../services' );

module.exports = async ( req, res ) => {
    const arr_orders_names = [];

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