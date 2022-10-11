const services = require( '../../services' );
const helpers = require( '../../helpers' );

module.exports = async (req, res) => {
    const logFile = 'check_tah_main_link_' + helpers.moment.getCurrentTimestamp();
    services.logs.writeOrAppend( logFile, `// page 1 ` + services.logs.newLine );
    
    res.json( {wait:'wait'} );
    let allPdk = await services.product.getAll( 250 );
    
    await check( allPdk, logFile );

    let nextLink = helpers.fetch.getHeaderLink( allPdk.headers, 'next', false );
    if( nextLink ) getNextPage( nextLink, 2, logFile );

    // manual( logFile );
}

const manual = async ( logFile ) => {
    const allTitle = [];
    for (const title of allTitle) {
        let allPdk = await services.product.getByName( title );
        await check( allPdk, logFile, true );
    }
}

const getNextPage = async ( url, page = 2, logFile ) => {
    const allPdk = await services.fetch( 'get', url );
    
    const nextLink = helpers.fetch.getHeaderLink( allPdk.headers, 'next', false );
    services.logs.writeOrAppend( logFile, `// PAGE ${ page } ` + services.logs.newLine );
    services.logs.writeOrAppend( logFile, `// URL ${ url }` + services.logs.newLine );
    
    await check( allPdk, logFile );

    if( nextLink ) await getNextPage( nextLink, page + 1, logFile );
}

const check = async ( allPdk, logFile, checkBackToSource = false ) => {
    const allProducts = await allPdk.json();
    console.log({allProducts})
    for (const pdk of allProducts.products) {
        let metafield = await services.product.getMetafields( pdk.id );
        metafield = await metafield.json();

        const tah_main_link = metafield.metafields.find( f => f.namespace == 'global' && f.key == 'tah_or_main_link' );
        if( !tah_main_link?.value ) continue;

        let status = 'fail';
        let tah_main_product = await services.product.getByHandle( tah_main_link.value );
        tah_main_product = await tah_main_product.json();

        let backToSource = "";
        if( tah_main_product?.products?.[0]?.id ) { 
            status = 'ok';

            if(checkBackToSource){
                backToSource += "back to source - ";
                let metafieldSource = await services.product.getMetafields( tah_main_product.products[0].id );
                metafieldSource = await metafieldSource.json();

                const tah_main_link_source = metafieldSource.metafields.find( f => f.namespace == 'global' && f.key == 'tah_or_main_link' );
                if( tah_main_link_source ){
                    backToSource += tah_main_link_source.value + " - "
                    let tah_main_product_source = await services.product.getByHandle( tah_main_link_source.value );
                    tah_main_product_source = await tah_main_product_source.json();

                    if( tah_main_product_source?.products?.[0]?.id ) { 
                        backToSource += "ok";
                    }else{
                        backToSource += "fail";
                    }
                }else{
                    backToSource += "metafield not found"
                }
            }
        }


        services.logs.writeOrAppend( logFile, `// ${ pdk.title } - ${ tah_main_link.value } - ${ status } - ${ backToSource }` + services.logs.newLine );

    }
    services.logs.writeOrAppend( logFile, services.logs.newLine );
}
