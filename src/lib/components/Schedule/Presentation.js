import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '../MyTypography';
// <Tags tags={_get(company.profile, "keywords")} />

const styles = theme => ({
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
});

const Presentation = ({
  classes,
  title,
  description,
  hideDescriptionOnMobile
}) => {
  return (
    <div className={classes.root}>
      <Typography template="presenter2">{title}</Typography>

      <div className={hideDescriptionOnMobile ? classes.description : ''}>
        <Typography template="presenterText">{description}</Typography>
      </div>
    </div>
  );
};

Presentation.defaultProps = {
  title: '',
  description: '',
  hideDescriptionOnMobile: false
};

export default withStyles(styles)(Presentation);
