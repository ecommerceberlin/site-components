import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { snackbarHide } from './redux/actions';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from 'mdi-material-ui/Close';

//https://material-ui-next.com/api/snackbar/

class MySnackbar extends React.PureComponent {
  render() {
    const { snackbar, snackbarHide } = this.props;

    const open = 'title' in snackbar;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={snackbarHide}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{snackbar.title}</span>}
        // action={[
        //
        //   <IconButton
        //     key="close"
        //     aria-label="Close"
        //     color="inherit"
        //     ///   className={classes.close}
        //     onClick={this.handleClose}
        //   >
        //     <CloseIcon />
        //   </IconButton>
        // ]}
      />
    );
  }
}

export default connect(
  state => ({ snackbar: state.snackbar }),
  { snackbarHide }
)(MySnackbar);
