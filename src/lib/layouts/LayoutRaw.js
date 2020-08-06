import React from 'react';
import Router from 'next/router';
import { MyHead as Head } from '../next';
import { connect } from 'react-redux';

Router.onRouteChangeComplete = () => {

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag('config', window.gaTrackingId, {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: window.document.title
    });
  }
};

const Layout = props => (
 
    <div>
      <Head />
      {props.children}
    </div>
 
);

Layout.defaultProps = {};

export default connect()(Layout);
