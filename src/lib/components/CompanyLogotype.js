import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { getCompanyLogotype } from '../helpers';

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
    <img className={classes.image} src={getCompanyLogotype(company)} alt="" />
  </div>
);

export default withStyles(styles)(CompanyLogotype);
