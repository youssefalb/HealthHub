// const { withSuperjson } = require('next-superjson')

// module.exports = withSuperjson()({
//     output: 'standalone',
// })



/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ['bcrypt'],
        // swcPlugins: [["next-superjson-plugin", {}]],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: "standalone",
    
}

module.exports = nextConfig