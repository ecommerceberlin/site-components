import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { dialogHide } from './redux/actions';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import {translate} from '../i18n'

const styles = {
  root : {
    backgroundColor : '#eeeeee'
  }
}


class ResponsiveDialog extends React.PureComponent {

  render() {

    const { translate, classes, fullScreen, forcefs, dialog, dialogHide } = this.props;

    const open = dialog && 'title' in dialog;

    return open ? (
      <Dialog
        fullScreen={fullScreen || dialog.forcefs}
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={dialogHide}
        aria-labelledby="responsive-dialog-title"
        classes={{
          paper : classes.root
        }}
      >
        <DialogTitle id="responsive-dialog-title">{dialog.title}</DialogTitle>
        <DialogContent>
          {dialog.intro && (
            <DialogContentText>{dialog.intro}</DialogContentText>
          )}

          {dialog.content}
        </DialogContent>
        <DialogActions>
          {dialog.buttons &&
            dialog.buttons.map((item, idx) => (
              <Button key={idx} onClick={item.action} color="primary" autoFocus>
                {item.label}
              </Button>
            ))}

          <Button onClick={dialogHide} color="secondary">
            {translate("common.close")}
          </Button>
        </DialogActions>
      </Dialog>
    ) : null;
  }
}

ResponsiveDialog.defaultProps = {
  dialog: {
    intro: null,
    buttons: [],
    forcefs: false
  }
};

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
  //  name : PropTypes.string.isRequired
};

const enhance = compose(
  withMobileDialog(),
  withStyles(styles),
  translate,
  connect(
    state => ({ dialog: state.dialog }),
    { dialogHide }
  )
);

export default enhance(ResponsiveDialog);
