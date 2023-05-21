const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    reactStrictMode: true,
    transpilePackages: ['ui'],
    output: 'export',

    // In production, app is served under /mtgt path
    assetPrefix: isProd ? '/mtgt' : undefined,
};
