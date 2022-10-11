const moment = require( 'moment' );

module.exports = ( format = 'YYYYMMDD' ) => {
    return moment().format( format );
}