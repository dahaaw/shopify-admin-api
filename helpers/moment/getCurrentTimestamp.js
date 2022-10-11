const moment = require( 'moment' );

module.exports = () => {
    return moment().unix();
}