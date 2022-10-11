const collections = [
];

const services = require( '../../services' );
module.exports = async ( req, res ) => {
    const logfile = 'update_collection_handle_1665458425';
    services.logs.writeOrAppend( logfile, '// start' );
    services.logs.writeOrAppend( logfile, services.logs.newLine );
    for (const coll of collections) {
        let data_coll = await services.collection.getSmartByHandle( coll.FROM );
        data_coll = await data_coll.json();
        
        if( data_coll.smart_collections?.length ){
            let id = data_coll.smart_collections[ 0 ].id;
            let update = await services.collection.updateSmart( id, { handle: coll.TO } );
            update = await update.json();

            let redirect = await services.redirect.create( '/collections/' + coll.FROM, '/collections/' + coll.TO );
            redirect = await redirect.json();

            if( update.smart_collection?.id ){
                services.logs.writeOrAppend( logfile, `// ${ coll.FROM }, updated and redirect created`);
                services.logs.writeOrAppend( logfile, services.logs.newLine );
            }else {
                services.logs.writeOrAppend( logfile, `// ${ coll.FROM }, fail updated and redirect created`);
                services.logs.writeOrAppend( logfile, services.logs.newLine );
            }

        }else{
            let coll_to = await services.collection.getSmartByHandle( coll.TO );
            coll_to = await coll_to.json();
            if( coll_to.smart_collections?.length ) services.logs.writeOrAppend( logfile, `// ${ coll.FROM }, already updated`);
            if( !coll_to.smart_collections?.length ) services.logs.writeOrAppend( logfile, `// ${ coll.FROM }, not updated`);
            services.logs.writeOrAppend( logfile, services.logs.newLine );
            // res.json( coll_to );
        }
    }

    res.json({ok:"ok"})
}