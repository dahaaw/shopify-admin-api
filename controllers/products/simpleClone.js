const services = require( '../../services' );

module.exports = async (req, res) => {
    let fetch_product_ori = await services.product.getById( '7752471871712' );
    const original_product = await fetch_product_ori.json();

    let newProduct = {
        "product": {
            "title": original_product.title,
            "body_html": original_product.body_html,
            "vendor": original_product.vendor,
            "product_type": "",
            "metafields":[
                {
                    "namespace":"seo",
                    "key": "hidden",
                    "value": 1,
                    "type": "integer",
                }
            ]
        }
    }
    res.json(original_product);
}