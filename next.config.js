module.exports = {

    eslint: {
        // Warning: Dangerously allow production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },

      i18n: {
        locales: ['en','pl'],
        defaultLocale: 'pl',  
     
      },

      async rewrites() { return [{
        source: '/presenters',
        destination: '/speakers',
        }]
    },
}