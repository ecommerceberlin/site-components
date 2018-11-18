import React from 'react';
import { connect } from 'react-redux';
import { MyLink as Link } from '../next';
import MyTypography from './MyTypography';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

const buildLink = (url, selected) => {
  return `${url.pathname}?${selected.join(',')}`;
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10
  },
  column: {
    //  flexGrow : 1
    padding: 20
  }
};

const FaqLink = ({ selected, url, classes }) => {
  if (!selected.length) {
    return null;
  }

  return (
    <div className={classes.container}>
      <div className={classes.column}>
        <MyTypography label="common.faq.share.description" />
      </div>
      <div className={classes.column}>
        <Link
          variant="raised"
          href={buildLink(url, selected)}
          label="common.faq.share.link"
          prefetch={false}
        />
      </div>
    </div>
  );
};

FaqLink.defaultProps = {
  selected: []
};

const enhance = compose(
  connect(state => ({ selected: state.app.faqs })),
  withStyles(styles)
);

export default enhance(FaqLink);
