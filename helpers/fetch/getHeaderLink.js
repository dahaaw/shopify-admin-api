module.exports = ( headers, type = 'next', withServernameAndAPIVersion = true ) => {
    let headerLinks = headers.get( 'Link' )?.split( ',' );
    let link;
    if ( headerLinks?.length ) for ( const headerLink of headerLinks ) {
        if( headerLink.includes( type ) ){
            link = headerLink.split( ';' )[0]
                            .replace( '<', '' ).replace( '>', '' );
            if ( !withServernameAndAPIVersion ){
                link = link.replace( 'https://averyaustin.myshopify.com/admin/api/2022-07/', '' );
            }
            link = link.replace(/ /g, '');
        }
    }
    return link;
}