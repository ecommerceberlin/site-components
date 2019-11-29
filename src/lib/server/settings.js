const ssrCache = require('./cache')
const fetch = require('isomorphic-unfetch');


async function fetchFromApiEndpoint(endpoint) {
    const _res = await fetch(`${api}/${endpoint}`);
    const res = await _res.json();
    return res;
}

export default async function cacheApiResult(req, res, endpoint) {

    if ('purge' in req.query) {
      ssrCache.del(endpoint);
    }

    if (ssrCache.has(endpoint)) {
      res.setHeader('x-api-cache', 'HIT');
      res.json(ssrCache.get(endpoint));
      return;
    }
  
    try {
      // If not let's render the page into HTML
      const data = await fetchFromApiEndpoint(endpoint);
  
      // Something is wrong with the request, let's skip the cache
      if (dev || !"data" in data) {
        res.setHeader('x-cache', 'SKIP');
        res.json(data);
        return;
      }
  
      // Let's cache this page
      ssrCache.set(endpoint, data);
      res.setHeader('x-api-cache', 'MISS');
      res.json(data);
    } catch (err) {
      res.json({});
    }

}