const services = require( '../../services' );

module.exports = async ( req, res ) => {
    const arr_products_names = [];

    let logText = `// Set Orders to Archived
    `;

    for (const product_name of arr_products_names) {
        let arr_orders = await services.product.getByName( product_name );
        arr_orders = await arr_orders.json();
        if( arr_orders.orders?.length ){
            const order_detail = arr_orders.orders[0];

            // let archived = await services.order.setArchived( order_detail.id );
            // let archived = await services.order.setCancelled( order_detail.id );
            let archived = "";
            archived = await archived.json();
            if ( archived.order?.id ){
                logText += `// ${ product_name } ok
                `;    
            }else{
                logText += `// ${ product_name }
${JSON.stringify(archived, false, 3)}
                `;
            }
        }else {
            logText += `// ${ product_name } not exist
            `;
        }        
    }

    services.logs.write( 'set_orders_cancelled', logText );
    res.json( {ok:'ok'} );
}