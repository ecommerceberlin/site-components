import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
// import red from '@material-ui/core/colors/red';
import { useTranslate } from '../../i18n';
import {useSettings} from '../../helpers'
import isString from 'lodash/isString'
import isObject from 'lodash/isObject'
import isEmpty from 'lodash/isEmpty'
import { usePresentation } from './context';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 10
  },

  chip: {
    marginRight: 15,
    [theme.breakpoints.down("md")]: {
      marginRight: 5,
    }
  },

  stageLabel: {
    [theme.breakpoints.down("md")]: {
      display: 'none'
    }
  },

  venue: {
    // backgroundColor : red[500],
    // color : '#ffffff'
  }
}));

const defaultProps = {}

const PresentationLabel = ({ buttons = null}) => {

  const {time, venue, category, categories} = usePresentation()
  const [translate] = useTranslate();
  const classes = useStyles();
  const styling = isObject(category) && category in categories? categories[category]: {}

  return (
    <div className={classes.root}>

      <Chip 
        label={<><strong>{venue}</strong> {time}</>} 
        className={classes.chip} 
        variant="outlined"
      />
    
      {!isEmpty(categories) && isString(category) && category.length > 1 && <Chip 
        label={translate(`tags.${category}`)} 
        className={classes.chip}
        style={styling} 
      />}


      {buttons}
    </div>
  );
}

export default PresentationLabel
