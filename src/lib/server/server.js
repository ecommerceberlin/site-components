const express = require('express');
const url = require('url');
const cookieSession = require('cookie-session');
const next = require('next');
const LRUCache = require('lru-cache');
//const querystring = require('query-string');
const fetch = require('isomorphic-unfetch');
//const _keyBy = require('lodash/keyBy');
const i18n = require('./i18n');
const sitemap = require('./sitemap')

export default function(options){

if(!options || new Object(options) !== options){
  options = {}
}

const {
  available_locales, 
  default_locale, 
  api,
  lang_api_endpoint
} = options.system;

const cachableUtmContent = ["logotype,pl", "logotype,en", "opengraph_image"];

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
});

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();


  async function fetchFromApiEndpoint(endpoint) {
    const _res = await fetch(`${api}/${endpoint}`);
    const res = await _res.json();
    return res;
  }
  
  function cacheApiResult(endpoint) {
    if (ssrCache.has(endpoint)) {
      res.setHeader('x-api-cache', 'HIT');
      res.send(ssrCache.get(key));
      return;
    }
  
    // fetchFromApiEndpoint(endpoint).
    // then(data => data.data).
    // then()
  }
  
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
  
  async function renderAndCache(req, res, pagePath, queryParams) {
  
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

  



    

  
  app
  .prepare()
  .then(() => {
    const server = express();

    // const protocol = req.headers['x-forwarded-proto'] || 'http';
    // const baseUrl = req ? `${protocol}://${req.headers.host}` : '';

    server.set('trust proxy', 1)

    server.use(express.json());

    server.use(
      cookieSession({
        name: 'eventjuicer-site',
        keys: ['32441asd','127dfa342'],
        //Cookie Options,
        maxAge: 180 * 24 * 60 * 60 * 1000 // 180 days
      })
    );

    server.use(async function(req, res, next) {

      const {lang} = req.query

      const texts = await i18n.getTexts(lang_api_endpoint, ssrCache, 'purge' in req.query);

      const {locale} = req.session

      const browserLocale = req.acceptsLanguages(...available_locales)

      const resolvedLocale = locale || lang || browserLocale || default_locale;
      
    //  console.log("resolved", resolvedLocale)

      res.locals.texts = texts;
      res.locals.locale = resolvedLocale

      next(); // <-- important!
    });



    sitemap({ server })

    //  server.get('/c,:id,:creative', (req, res) => {
    //    const queryParams = { id: req.params.id, creative : req.params.creative }
    //    res.redirect('/agenda?utm_content=')
    //
    //   // app.render(req, res, '/exhibitor', queryParams)
    // //  REDIRECT
    //    //renderAndCache(req, res, '/company', queryParams)
    //  })

    // server.get('/locale/:locale', (req, res) => {
    //   req.session.locale = req.params.locale
    //  /// res.redirect('/')
    // })

 
    server.get('/recall/:token', (req, res) => {
      res.redirect(`https://account.${req.headers.host}/#/login?token=${req.params.token}`)
    })

    server.get('/v', (req, res) => {
      res.redirect('/visit?utm_source=oldv&utm_medium=sms&utm_campaign=oldv')
    })

    server.post('/remember', (req, res) => {

      req.session = {...req.session, ...(req.body || {})}

      res.json(req.session);
    });

    server.get('/stage,:stage', (req, res) => {
      renderAndCache(req, res, '/stage', { stage: req.params.stage });
    });

    server.get('/ticket,:hash', (req, res) => {
      renderAndCache(req, res, '/ticket', { hash: req.params.hash });
    });

    server.get('/thankyou,:hash', (req, res) => {
      renderAndCache(req, res, '/thankyou', { hash: req.params.hash });
    });

    server.get('/archive,:id', (req, res) => {
      renderAndCache(req, res, '/archive', { id: req.params.id });
    });

    server.get('/invite,:id', (req, res) => {
      renderAndCache(req, res, '/invite', { id: req.params.id });
    });

    server.get('/:slug,s,:id', (req, res) => {
      renderAndCache(req, res, '/speaker', { id: req.params.id });
    });

    server.get('/:slug,c,:id', (req, res) => {
      renderAndCache(req, res, '/company', { id: req.params.id });
    });

    server.get('/exhibitors', (req, res) => {
      renderAndCache(req, res, '/exhibitors', {});
    });

    server.get('/exhibitors/:keyword', (req, res) => {
      renderAndCache(req, res, '/exhibitors-by-keyword', { keyword: req.params.keyword });
    });

    server.get('/premium/:slug', (req, res) => {
      renderAndCache(req, res, '/premium', { slug: req.params.slug });
    });

    // Serve the item webpage with next.js as the renderer
    server.get('/setup', async (req, res) => {
      const texts = await i18n.getTexts(lang_api_endpoint, ssrCache, 'purge' in req.query);
      app.render(req, res, '/setup', { texts });
    });

    // When rendering client-side, we will request the same data from this route
    server.get('/_data/texts', async (req, res) => {
      const texts = await i18n.getTexts(lang_api_endpoint, ssrCache);
      res.json(texts);
    });

    server.get('/_data/settings', (req, res) => {
      res.json(options);
    });
    
    // server.get('/:lang([a-z]{2}|)', (req, res) => {
    //   renderAndCache(req, res, '/', {});
    // })

    server.get('/', (req, res) => {
      renderAndCache(req, res, '/', {});
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });


}




//https://targiehandlu.pl/kmc-services-sp.-z-o.o.,c,1302?utm_source=th3rCMiM_1302&utm_medium=link&utm_campaign=teh15c&utm_content=logotype,pl

//https://targiehandlu.pl/kmc-services-sp.-z-o.o.,c,1302?utm_source=th3rCMiM_1302&utm_medium=link&utm_campaign=teh15c&utm_content=logotype,en

//https://targiehandlu.pl/kmc-services-sp.-z-o.o.,c,1302?utm_source=th3rCMiM_1302&utm_medium=link&utm_campaign=teh15c&utm_content=opengraph_image

