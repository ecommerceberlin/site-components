const express = require('express');
const cookieSession = require('cookie-session');
const next = require('next');
//const LRUCache = require('lru-cache');
//const querystring = require('query-string');
//const fetch = require('isomorphic-unfetch');
//const _keyBy = require('lodash/keyBy');
const i18n = require('./i18n');
const sitemap = require('./sitemap')
const settings = require('./externalApi').settings
const renderAndCache = require('./renderAndCache').renderAndCache


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


// const ssrCache = new LRUCache({
//   max: 100,
//   maxAge: 1000 * 60 * 60 // 1hour
// });

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

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

      const texts = await i18n.getTexts(lang_api_endpoint, 'purge' in req.query, options.system);

      const {locale} = req.session

      const browserLocale = req.acceptsLanguages(...available_locales)

      const resolvedLocale = locale || lang || browserLocale || default_locale;
      
    //  console.log("resolved", resolvedLocale)

      res.locals.texts = texts;
      res.locals.locale = resolvedLocale

      next(); // <-- important!
    });



    sitemap({ server })


 
    server.get('/recall/:token', (req, res) => {
     // res.redirect(`https://account.${req.headers.host}/#/login?token=${req.params.token}`)
      res.redirect(`https://pages.${req.headers.host}/recall/${req.params.token}`)

    })

    server.get('/account', (req, res) => {
      // res.redirect(`https://account.${req.headers.host}/#/login?token=${req.params.token}`)
       res.redirect(`https://pages.${req.headers.host}/account`)
     })

     

    server.get('/v', (req, res) => {
      res.redirect('/visit?utm_source=oldv&utm_medium=sms&utm_campaign=oldv')
    })

    server.post('/remember', (req, res) => {

      req.session = {...req.session, ...(req.body || {})}

      res.json(req.session);
    });

    server.get('/stage,:stage', (req, res) => {
      renderAndCache(app, req, res, '/stage', { stage: req.params.stage }, options.system);
    });

    server.get('/ticket,:hash', (req, res) => {
      renderAndCache(app, req, res, '/ticket', { hash: req.params.hash }, options.system);
    });

    server.get('/thankyou,:hash', (req, res) => {
      renderAndCache(app, req, res, '/thankyou', { hash: req.params.hash }, options.system);
    });

    server.get('/archive,:id', (req, res) => {
      renderAndCache(app, req, res, '/archive', { id: req.params.id }, options.system);
    });

    server.get('/invite,:id', (req, res) => {
      renderAndCache(app, req, res, '/invite', { id: req.params.id }, options.system);
    });

    server.get('/:slug,s,:id', (req, res) => {
      renderAndCache(app, req, res, '/speaker', { id: req.params.id }, options.system);
    });

    server.get('/:slug,c,:id', (req, res) => {
      renderAndCache(app, req, res, '/company', { id: req.params.id }, options.system);
    });

    server.get('/exhibitors', (req, res) => {
      renderAndCache(app, req, res, '/exhibitors', {}, options.system);
    });

    server.get('/exhibitors/:keyword', (req, res) => {
      renderAndCache(app, req, res, '/exhibitors-by-keyword', { keyword: req.params.keyword }, options.system);
    });



    server.get('/vote', (req, res) => {
      renderAndCache(app, req, res, '/vote', {}, options.system);
    });

    server.get('/vote/:id', (req, res) => {
      const params = isNaN(req.params.id) ? { keyword: req.params.id } : { id: req.params.id }
      renderAndCache(app, req, res, '/vote', params, options.system);
    });

    
    server.get('/premium/:slug?', (req, res) => {
      renderAndCache(app, req, res, '/premium', { slug: req.params.slug }, options.system);
    });

    // When rendering client-side, we will request the same data from this route
    server.get('/_data/texts', async (req, res) => {
      const texts = await i18n.getTexts(lang_api_endpoint, 'purge' in req.query, options.system);
      res.json(texts);
    });

    server.get('/_data/settings', (req, res) => {
      settings(api, req, res);
    });
    
    // server.get('/:lang([a-z]{2}|)', (req, res) => {
    //   renderAndCache(req, res, '/', {});
    // })

    server.get('/', (req, res) => {
      renderAndCache(app, req, res, '/', {}, options.system);
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

