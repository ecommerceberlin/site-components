import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { dialogHide } from './redux/actions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import {translate} from '../i18n'

const useStyles = makeStyles((theme) => ({
  root : {
    backgroundColor : '#eeeeee'
  }
}));

const MyDialog = ({ translate, dialog, dialogHide }) => {

  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const classes = useStyles();
  
  const open = dialog && 'title' in dialog;

  return open ? (
    <Dialog
      fullScreen={fullScreen}
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

 

const enhance = compose(
  translate,
  connect(
    state => ({ dialog: "dialog" in state.visuals ? state.visuals.dialog : {} }),
    { dialogHide }
  )
);

export default enhance(MyDialog);
