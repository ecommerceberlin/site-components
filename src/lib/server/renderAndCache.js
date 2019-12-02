


const url = require('url');
const cachableUtmContent = ["logotype,pl", "logotype,en", "opengraph_image"];
const available_locales = `${process.env.AVAILABLE_LOCALES}`.split(",")
const default_locale =  `${process.env.DEFAULT_LOCALE}` || "en"
const dev = process.env.NODE_ENV !== 'production';
const ssrCache = require('./cache').ssrCache


function getPathName(req){
    return url.parse(req.url).pathname
}

/*
* NB: make sure to modify this to take into account anything that should trigger
* an immediate page change (e.g a locale stored in req.session)
*/
function getCacheKey(req, locale, utm_content) {

    //handle utm_content to cache separately....

    return `${getPathName(req)}_${(locale || default_locale)}_${utm_content}`;

}

async function renderAndCache(app, req, res, pagePath, queryParams) {

const utm_content = "utm_content" in req.query && cachableUtmContent.indexOf(req.query.utm_content) > -1 ? req.query.utm_content : "";

if ('purge' in req.query) {
    
    available_locales.forEach(function(l, index, arr){

    if(utm_content){
        cachableUtmContent.forEach( v => ssrCache.del(getCacheKey(req, l, utm_content)) )
    }
    else{
        ssrCache.del(getCacheKey(req, l, utm_content))
    }
    });
}

const {locale} = res.locals
const key = getCacheKey(req, locale, utm_content);

// If we have a page in the cache, let's serve it
if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT');
    res.send(ssrCache.get(key));
    return;
}

try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams);

    // Something is wrong with the request, let's skip the cache
    if (dev || res.statusCode !== 200) {
    res.setHeader('x-cache', 'SKIP');
    res.send(html);
    return;
    }

    // Let's cache this page
    ssrCache.set(key, html);
    res.setHeader('x-cache', 'MISS');
    res.send(html);
} catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
}
}

  module.exports = { renderAndCache, available_locales, default_locale }