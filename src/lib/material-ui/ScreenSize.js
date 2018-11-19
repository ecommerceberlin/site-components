import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withWidth from '@material-ui/core/withWidth';

class ScreenSize extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, prevState) {
    const { width } = nextProps;
    const { oldWidth, dispatch } = this.props;

    if (width && oldWidth !== width) {
      dispatch({
        type: 'SCREEN_SIZE_CHANGED',
        width: width
      });
    }

    return false;
  }

  render() {
    return null;
  }
}

const enhance = compose(
  withWidth(),
  connect(state => ({ oldWidth: state.app.width }))
);

export default enhance(ScreenSize);
