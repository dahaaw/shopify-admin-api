const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const {HOST,PORT} = process.env;
const app = express();

const controllers = require( './controllers' );
const services = require( './services' );

app.get('/orders/archived', controllers.orders.setArchived );
app.get('/orders/fulfilled', controllers.orders.fulfilled );

app.get('/clone/:id', controllers.products.simpleClone );

app.get('/assign', async (req, res) => {
    const sourceCollectionID = '';
    const destinationCollectionID = '';
    
    let data = await services.product.getProductByCollection( sourceCollectionID, 250 );
    data = await data.json();
    let logText = `// ${ sourceCollectionID } to ${ destinationCollectionID }`;

    let ke = 0;
    for (const product of data.products) {
        ke++;
        console.log({ke})
        const productID = product.id;
        let assign = await services.product.assingToCollection( productID, destinationCollectionID );
        assign = await assign.json();
        logText += `
// ${ productID }`;
        if( assign.errors ){
            logText += `
${ JSON.stringify( assign.errors, null, 3 )}`;
        }else if( assign.collect?.id ){
            logText += ` ok`
        }
    }

    services.logs.write( 'assign_product_to_collection', logText );
    console.log({done:'done'})
    res.json({data: 'ok'});
});

app.listen(PORT, () => {
    console.log(`app run in http://${HOST}:${PORT}`);
})