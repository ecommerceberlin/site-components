import React from 'react';
//import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import MyTypography from '../MyTypography';
import {useSettings} from '../../helpers'
// <Tags tags={_get(company.profile, "keywords")} />

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 10,
    marginBottom: 15,
    marginRight: 20,
    [theme.breakpoints.down("md")]: {
      marginTop: 5,
      marginBottom: 5,
      marginRight: 5,
    }
  },

  description: {
    [theme.breakpoints.down('md')]: {
    
    },

  }
}))


const defaultProps = {
  title: '',
  description: '',
  hideDescriptionOnMobile: false
};

const Presentation = ({setting, ...props}) => {

  const classes = useStyles();
  const settings = useSettings();

  const {
    title,
    description,
    hideDescriptionOnMobile
  } = Object.assign({}, defaultProps, settings, props)

  return (
    <div className={classes.root}>
      <Typography variant="h5">{title}</Typography>
      <div className={hideDescriptionOnMobile ? classes.description : ''}>
        <MyTypography template="presenterText">{description}</MyTypography>
      </div>
    </div>
  );
};


export default Presentation
