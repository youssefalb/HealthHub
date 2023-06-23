const { withSuperjson } = require('next-superjson')

module.exports = withSuperjson()({
    output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
})

