const fetch = require('isomorphic-unfetch');
const defaultTranslations = require("./translation.json");
const ssrCache = require('./cache').ssrCache

function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}

async function getTexts(translationUrl, purge) {

  if (purge) {
    ssrCache.del(translationUrl);
  }

  if (!ssrCache.has(translationUrl)) {

    const data = await fetch(translationUrl, {timeout : 2000}).then(handleErrors).then(response => response.json()).catch(error => defaultTranslations);
  
    ssrCache.set(translationUrl, data);
   // console.log('API/texts not found! Fetching and caching...');
    return data;
  } else {
   //console.log('API/texts resolved from cache!');
    return ssrCache.get(translationUrl);
  }
}

module.exports = { getTexts };
