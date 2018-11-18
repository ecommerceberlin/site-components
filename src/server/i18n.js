const fetch = require('isomorphic-unfetch');
const translationUrl = `https://localise.biz/api/export/all.json?format=multi&pretty&key=SHiwxgKaPMx_KThQH2zcdzwiKEMzuNBm`;

async function getTexts(cache, purge) {
  if (purge) {
    cache.del(translationUrl);
  }

  if (!cache.has(translationUrl)) {
    const data = await fetch(translationUrl).then(response => response.json());
    cache.set(translationUrl, data);
   // console.log('API/texts not found! Fetching and caching...');
    return data;
  } else {
   //console.log('API/texts resolved from cache!');
    return cache.get(translationUrl);
  }
}

module.exports = { getTexts };
