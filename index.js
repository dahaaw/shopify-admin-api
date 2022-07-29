const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const {HOST,PORT} = process.env;
const app = express();

const services = require( './services' );

app.get('/', (req, res) => {});

app.get('/assign', async (req, res) => {
    const sourceCollectionID = '';
    const destinationCollectionID = '';
    
    let data = await services.product.getProductByCollection( sourceCollectionID, 250 );
    data = await data.json();
    let logText = '';

    for (const product of data.products) {
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
    res.json({data: 'ok'});
});

app.listen(PORT, () => {
    console.log(`app run in http://${HOST}:${PORT}`);
})