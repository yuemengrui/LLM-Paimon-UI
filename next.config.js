/** @type {import('next').NextConfig} */

module.exports = {
    images: {
        domains: ['127.0.0.1']
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader'
        });

        return config;
    },
}