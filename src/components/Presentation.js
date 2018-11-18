import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from './MyTypography';
// <Tags tags={_get(company.profile, "keywords")} />

const styles = theme => ({
  root: {
    marginBottom: 10
  },

  description: {
    [theme.breakpoints.down('sm')]: {
      overflow: 'hidden',
      height: 50,
      textOverflow: '...'
    },

    [theme.breakpoints.only('md')]: {
      overflow: 'hidden',
      height: 100,
      textOverflow: '...'
    }
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
