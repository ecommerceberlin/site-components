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
  },

  tiny: {
    maxWidth: 130,
    maxHeight: 150
  }

};

const CompanyLogotype = ({ company, classes, tiny }) => (
  <div className={classes.root}>
    <img className={tiny ? classes.tiny : classes.image} src={ getCompanyProfileInfo(company, "thumbnail") } alt="" />
  </div>
);

CompanyLogotype.defaultProps = {
  tiny: false
}

export default withStyles(styles)(CompanyLogotype);
