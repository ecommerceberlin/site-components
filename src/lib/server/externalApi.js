const cache = require('./cache').ssrCache
const fetch = require('isomorphic-unfetch');
const dev = process.env.NODE_ENV !== 'production';

async function fetchFromApiEndpoint(api, endpoint) {
    const _res = await fetch(`${api}/${endpoint}`);
    const res = await _res.json();
    return res;
}

async function cacheApiResult(api, endpoint, req, res) {

    if ('purge' in req.query) {
      cache.del(endpoint);
    }

    if (cache.has(endpoint)) {
      res.setHeader(`x-cache-${endpoint}`, 'HIT');
      
      //https://zeit.co/docs/v2/serverless-functions/edge-caching/
      res.setHeader('Cache-Control', 'max-age=0, s-maxage=600');

      res.json(cache.get(endpoint));
      return;
    }
  
     try {
     
      const data = await fetchFromApiEndpoint(api, endpoint);
  
      // Something is wrong with the request or response, let's skip the cache
      if (dev || !"data" in data) {
        res.setHeader(`x-cache-${endpoint}`, 'SKIP');
        res.json(data);
        return;
      }
  
      // Let's cache this API response
      cache.set(endpoint, data);
      res.setHeader(`x-cache-${endpoint}`, 'MISS');

      //https://zeit.co/docs/v2/serverless-functions/edge-caching/
      res.setHeader('Cache-Control', 'max-age=0, s-maxage=600');

      res.json(data);
    } catch (err) {

      //https://zeit.co/docs/v2/serverless-functions/edge-caching/
      res.setHeader('Cache-Control', 'no-cache');

      res.json({error: {code : 500 }});
    }

}

async function settings(api, req, res){

  const data = await cacheApiResult(api, "settings", req, res);
  return data;
}

module.exports = {fetchFromApiEndpoint, cacheApiResult, settings}