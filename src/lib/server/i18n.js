const fetch = require('isomorphic-unfetch');
const defaultTranslations = require("./translation.json");


function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}




async function getTexts(translationUrl, cache, purge) {

  if (purge) {
    cache.del(translationUrl);
  }

  if (!cache.has(translationUrl)) {

    const data = await fetch(translationUrl, {timeout : 2000}).then(handleErrors).then(response => response.json()).catch(error => defaultTranslations);
  
    cache.set(translationUrl, data);
   // console.log('API/texts not found! Fetching and caching...');
    return data;
  } else {
   //console.log('API/texts resolved from cache!');
    return cache.get(translationUrl);
  }
}

module.exports = { getTexts };
