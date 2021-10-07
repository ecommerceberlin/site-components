import React from 'react';
//import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import MyTypography from '../MyTypography';
import {useSettings} from '../../helpers'
// <Tags tags={_get(company.profile, "keywords")} />

const useStyles = props=> makeStyles(theme => ({
  root: {
    marginTop: 20,
    marginBottom: 25,

    [theme.breakpoints.down("md")]: {
      marginTop: 10,
      marginBottom: 10,
      marginRight: 5,
    }
  },

  title: {
    fontWeight: 600,
    
    fontSize: theme.typography.pxToRem(17),

    [theme.breakpoints.down("md")]: {
      fontSize: theme.typography.pxToRem(15),
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(13),
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

  const classes = useStyles(props)();
  const settings = useSettings();

  const {
    title,
    description,
    hideDescriptionOnMobile
  } = Object.assign({}, defaultProps, settings, props)

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>{title}</Typography>
      <div className={hideDescriptionOnMobile ? classes.description : ''}>
        <MyTypography template="presenterText">{description}</MyTypography>
      </div>
    </div>
  );
};


export default Presentation
