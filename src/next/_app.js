import App, { Container } from 'next/app';
import Router from 'next/router';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { getMuiContext } from '../material-ui';

import { CHANGE_LOCALE, CHANGE_LOCALE_MSGS } from '../i18n';

import { Provider } from 'react-redux';
import createStore from '../redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import fetch from 'isomorphic-unfetch';

import {resourceFetchRequest} from '../components/redux'


import * as gtag from '../services/gtag';



/*ctx

  ['err',
  'req',
  'res',
  'pathname',
  'query',
  'asPath',
  'store',
  'isServer' ]

*/

class MyApp extends App {



  constructor(props) {
    super(props);
    this.pageContext = getMuiContext();
  }
  
  componentDidCatch (error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING', error)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }


  static async getInitialProps({ Component, router, ctx }) {

    const { store, isServer, query, res } = ctx;

    let texts, locale;

    if (isServer) {

      texts = 'texts' in res.locals ? res.locals.texts : {};

      //validate locale!
      if('locale' in res.locals)
      {
        store.dispatch({ type: CHANGE_LOCALE, locale: res.locals.locale });
      }

    } else {

      const res = await fetch('/_data/texts', {
        headers: { Accept: 'application/json' }
      });

      texts = await res.json();
    }

    store.dispatch({ type: CHANGE_LOCALE_MSGS, messages: texts });

    const componentInitialProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    if("preload" in componentInitialProps)
    {
      store.dispatch(resourceFetchRequest(componentInitialProps.preload))
    }

    return {
      pageProps: {...componentInitialProps}
    };
  }


  pageContext = null;

  componentDidMount() {

    Router.onRouteChangeComplete = url => {
      gtag.pageview(url);
    };

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    const {pageProps, store} = this.props

    // if("load" in pageProps){
    //  fetcher(pageProps.load, store);
    // }

  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}

            <Provider store={store}>
              <Component pageContext={this.pageContext} {...pageProps} />
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(MyApp));
