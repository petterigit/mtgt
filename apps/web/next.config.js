const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    reactStrictMode: false,
    transpilePackages: ['ui'],
    output: 'export',

    // In production, app is served under /mtgt path
    basePath: isProd ? '/mtgt' : undefined,
    assetPrefix: isProd ? '/mtgt' : undefined,
};
