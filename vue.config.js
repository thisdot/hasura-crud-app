const webpack = require('webpack');

module.exports = {
    /* customize webpack.config.js */
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                'Tether': 'tether',
                'window.Tether': 'tether',
                'popper': 'popper',
                'window.popper': 'popper',
            }),
        ],
    },
};
