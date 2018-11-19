import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import MyTypography from './MyTypography';
import FaqItem from './FaqItem';

import { faqUrl } from './redux';

class Faq extends React.Component {

  componentDidMount() {
    //parse URL and dispatch actions!
    const { url, faqUrl, selected } = this.props;

    if (url && url.query && 'q' in url.query) {
      faqUrl(url.query.q);
    }
  }

  render() {
    const { classes, items, baseLabel, translate, url } = this.props;

    return (
      <div
        style={{
          flexGrow: 1,
          marginTop: 20,
          marginBottom: 20,
          paddingBottom: 20
        }}
      >
        <MyTypography label={`${baseLabel}.name`} template="SUBH2CH" />

        {items.map(item => (
          <FaqItem key={item.label} baseLabel={baseLabel} {...item} />
        ))}
      </div>
    );
  }
}

Faq.defaultProps = {
  items: [],
  baseLabel: 'faq',
  url: {},
  selected: []
};

Faq.propTypes = {
  //classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withRouter,
  connect(
    state => ({ selected: state.visuals.faqs }),
    { faqUrl }
  )
);

export default enhance(Faq);
