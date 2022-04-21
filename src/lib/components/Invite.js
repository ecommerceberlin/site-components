import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import _get from 'lodash/get';
import { useTranslate } from '../i18n';
import { getInviteOgImage } from '../helpers';
import Sharer from './Sharer';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 50
  },

  image: {
    width: '100%',
    height: 'auto',

    [theme.breakpoints.down('sm')]: {
      //    maxWidth : 300,
    }
  }
}));

const Invite = ({ person={}, text="See you!", from=", ", template="teh20_visitor_template1" }) => {
  const [translate] = useTranslate()
  const classes = useStyles()

  return (
    <div className={classes.root}>
    <Typography variant="h4" gutterBottom>{`${_get(person, 'fname')}, ${translate("visitors.promorequest.title")}`}</Typography>
    <Grid container spacing={2}>
    <Grid item md={5} sm={6} xs={12}>
      <Box m={2}>
      <Sharer url={`/invites/${person.id}`} />
      </Box>
    </Grid>
    <Grid item md={7} sm={6} xs={12}>
      <Box m={4}>
      <Typography variant="body1" gutterBottom>{translate("visitors.promorequest.description")}</Typography>
      <img src={getInviteOgImage(`${text} ${_get(person, 'fname', '')} ${from} ${_get(person, 'cname2')}.`, template)} alt="" className={classes.image} />
      </Box>
    </Grid>
    </Grid>
    </div>
  );
};


export default Invite
