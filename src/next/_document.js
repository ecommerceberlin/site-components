import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import JssProvider from 'react-jss/lib/JssProvider';

import { getMuiContext } from '../material-ui';

import { GA_TRACKING_ID } from '../services/gtag';

class MyDocument extends Document {
  // static getInitialProps({ renderPage }) {
  //   const { html, head, errorHtml, chunks } = renderPage()
  //   const styles = flush()
  //   return { html, head, errorHtml, chunks, styles }
  // }

  render() {
    const { pageContext, session } = this.props;

    return (
      <html lang="en" dir="ltr" amp="">
        <Head>
          
          <meta charSet="UTF-8" />
          <meta name="google" content="notranslate" />

          <script
          async
          src={`https://www.googletagmanager.com/gtm.js?id=${GA_TRACKING_ID}`}
          />

          <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
          `
          }}
          />

          <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Lato:100,200,300,400,500&subset=latin,latin-ext"
      />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Montserrat:500,600,700,800,900&subset=latin,latin-ext"
      />

        
          <style>{`body { margin: 0 } /* custom! */`}</style>

          <meta
            name="viewport"
            content={
              'user-scalable=0, initial-scale=1, ' +
              'minimum-scale=1, width=device-width, height=device-height'
            }
          />

          <meta
            name="theme-color"
            content={pageContext.theme.palette.primary.main}
          />
          
           <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/static/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/static/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/static/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/static/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/static/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/static/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/static/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/static/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/static/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/static/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicon-16x16.png"
      />
      <link rel="manifest" href="/static/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="/static/ms-icon-144x144.png"
      />

          {/* <script
            id="session"
            type="application/json"
            dangerouslySetInnerHtml={{
              __html: JSON.stringify(session, null, 2)
            }}
          /> */}

          {/*
        <style amp-boilerplate=''>{`body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`}</style><noscript><style amp-boilerplate=''>{`body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`}</style></noscript>
          <style amp-custom=''>{`body {font-family: Roboto, sans-serif; padding: 30px; color: #444;} h1 {margin-bottom: 5px;} .byline { color: #aaa; margin-bottom: 25px; } p {font-size: 18px; line-height: 30px; margin-top: 30px;} .caption {color: #ccc; margin-top: 0; font-size: 14px; text-align: center;}`}</style>
          <script async src='https://cdn.ampproject.org/v0.js' />
           */}
        </Head>

        <body className="eventjuicer_site">
          {this.props.customValue}

          <Main />

          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = ({ renderPage }) => {
  // Resolution order
  //
  // On the server:
  // 1. page.getInitialProps
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the server with error:
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. page.getInitialProps
  // 3. page.render

  // Get the context of the page to collected side effects.

  const pageContext = getMuiContext();
  const page = renderPage(Component => props => (
    <JssProvider
      registry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      <Component pageContext={pageContext} {...props} />
    </JssProvider>
  ));

  return {
    ...page,
    pageContext,
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line
          dangerouslySetInnerHTML={{
            __html: pageContext.sheetsRegistry.toString()
          }}
        />

        {flush() || null}
      </React.Fragment>
    )
  };
};

export default MyDocument;
