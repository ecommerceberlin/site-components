const fetch = require('isomorphic-unfetch');
const defaultTranslations = require("./translation.json");


async function getTexts(translationUrl, cache, purge) {

  if (purge) {
    cache.del(translationUrl);
  }

  if (!cache.has(translationUrl)) {
    const data = await fetch(translationUrl, {timeout : 2000})
    .then(response => {
      if (response.status !== 200) {
        return defaultTranslations;
      }
      return response.json();
    });
  
    cache.set(translationUrl, data);
   // console.log('API/texts not found! Fetching and caching...');
    return data;
  } else {
   //console.log('API/texts resolved from cache!');
    return cache.get(translationUrl);
  }
}

module.exports = { getTexts };
