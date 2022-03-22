import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useCompany } from './context';

const useStyles = makeStyles(theme => ({

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

}))

const CompanyLogotype = ({ tiny=false }) => {

  const classes = useStyles()
  const {logotype} = useCompany()

  return (
    <div className={classes.root}>
      <img className={tiny ? classes.tiny : classes.image} src={ logotype } alt="" />
    </div>
  );
}


export default CompanyLogotype