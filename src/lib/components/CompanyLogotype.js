import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { getCompanyProfileInfo } from '../helpers';

const styles = {
  root: {
    marginTop: 30
  },

  image: {
    maxWidth: 300,
    maxHeight: 200
  }
};

const CompanyLogotype = ({ company, classes }) => (
  <div className={classes.root}>
    <img className={classes.image} src={ getCompanyProfileInfo(company, "thumbnail") } alt="" />
  </div>
);

export default withStyles(styles)(CompanyLogotype);
