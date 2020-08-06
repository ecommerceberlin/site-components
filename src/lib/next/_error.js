import React from 'react';

import MyHead from './MyHead'
import WidgetVideoWithEventInfo from '../compositions/WidgetVideoWithEventInfo'
import WidgetVisitor from '../compositions/WidgetVisitor'
import FsButtons from '../components/FsButtons'
import WidgetAllExhibitorsAvatarlist from '../compositions/WidgetAllExhibitorsAvatarlist'
import Layout from '../layouts/LayoutMain'

import { connect } from 'react-redux';

class PageError extends React.Component {

  static async getInitialProps({ res, err, store }) {

    const statusCode = res ? res.statusCode : err ? err.statusCode : null;

    return {
      statusCode,
      preload : []
    };
  }

  render() {
    const { statusCode } = this.props;

    return (
      <Layout>
        
        <MyHead />

        <WidgetVideoWithEventInfo />

        <WidgetVisitor label="visitors.register" first />

        <FsButtons />

        <WidgetAllExhibitorsAvatarlist label="exhibitors.list_full" />

      </Layout>
    );
  }
}

export default connect()(PageError);
