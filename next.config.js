const { withSuperjson } = require('next-superjson')

module.exports = withSuperjson()({
    output: 'standalone',
})

