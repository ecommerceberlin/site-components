import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Markdown from './Markdown'
import { useDialog, useSettings } from '../helpers'
import { useTranslate } from '../i18n'
import isFunction from 'lodash/isFunction'

const defaultProps = {
  dense: false
}


const useStyles = makeStyles((theme) => ({
  container : {
    display: 'flex',
    flexDirection : 'row',
    //  alignItems : 'center'
    marginBottom : 15,
    [theme.breakpoints.up('md')]: {
      marginBottom : 30,
    },
  },

  iconContainer : {
    //width: 150
  },

  texts : {
    marginLeft : 30
  },

  expandableText: {
    cursor: 'pointer'
  }
})) 


const GridBenefitsItemContentDescription = ({onClick=null, label=""}) => {
  const classes = useStyles()
  const [translate] = useTranslate()
  const description = translate(`${label}.description`) || ""

  if(isFunction(onClick) && description.length>200 ){
    return (<div onClick={onClick} className={classes.expandableText}><Typography variant="body1">{description.substr(0, 120)}{`...`}{`(`}{translate("common.more")}{`)`}</Typography></div>)
  }

  return <Markdown label={`${label}.description`} />

}


const GridBenefitsItemContent = ({onClick=null, icon, label=""}) => {
  const classes = useStyles()
  const [translate] = useTranslate()
  
  return (
    <div className={classes.container}>
    <div className={classes.iconContainer}>{icon}</div>
    <div className={classes.texts}>
      <Typography variant="h5" gutterBottom>{translate(`${label}.title`)}</Typography>
      <GridBenefitsItemContentDescription label={label} onClick={onClick} />
    </div>
  </div>)

}


const GridBenefitsItem = ({setting, icon, label="", ...otherProps}) => {

    const settings = useSettings(setting)
    const dialog = useDialog();
    const props = Object.assign({}, defaultProps, settings, otherProps)

    return (     
      <GridBenefitsItemContent 
        icon={icon} 
        label={label} 
        onClick={() => dialog({
          label: "",
          content: <GridBenefitsItemContent icon={icon} label={label} />
        })}
      />
    ) 

}


export default GridBenefitsItem
