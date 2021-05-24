import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
// import red from '@material-ui/core/colors/red';
import { useTranslate } from '../../i18n';
import {useSettings} from '../../helpers'
import isString from 'lodash/isString'
import isObject from 'lodash/isObject'

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

const PresentationLabel = ({ setting, time="", venue="", category=null, buttons = null, ...otherProps }) => {

  const [translate] = useTranslate();
  const classes = useStyles();
  const settings = useSettings(setting)
  const {categories} = Object.assign({}, defaultProps, settings, otherProps)
  const styling = isObject(category) && category in categories? categories[category]: {}

  return (
    <div className={classes.root}>

      <Chip 
        label={time} 
        className={classes.chip} 
        variant="outlined"
      />
      <Chip
        label={<><span className={classes.stageLabel}>{`${translate("common.stage")} `}</span>{venue}</>}
        className={classes.chip}
        classes={{
          root: classes.venue
        }}
        variant="outlined"
      />

      {isString(category) && category.length > 1 && <Chip 
        label={translate(`tags.${category}`)} 
        className={classes.chip}
        style={styling} 
      />}


      {buttons}
    </div>
  );
}

export default PresentationLabel
