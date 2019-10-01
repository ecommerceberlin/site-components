
import cookieSession from 'cookie-session'
import LRUCache from 'lru-cache'
import fetch from 'isomorphic-unfetch'
//const _keyBy = require('lodash/keyBy');
import i18n from './i18n'
import sitemap from './sitemap'

const getInitialProps = (next) => {

    const {
        err,
        req,
        res,
        pathname,
        query,
        asPath,
        isServer,
        store,
      } = next

    
}

export default getInitialProps;