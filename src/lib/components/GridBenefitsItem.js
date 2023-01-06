import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Markdown from './Markdown'
import { useDialog, useSettings } from '../helpers'
import { useTranslate } from '../i18n'
import isFunction from 'lodash/isFunction'
import MyButton from './MyButton'
import isEmpty from 'lodash/isEmpty';
import Box from '@material-ui/core/Box'

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
    return (<div onClick={onClick} className={classes.expandableText}><Typography variant="body1">{description.substr(0, 120)}{`... `}<Typography variant="button">{`(`}{translate("common.more")}{`)`}</Typography></Typography></div>)
  }

  return <Markdown label={`${label}.description`} />

}


const GridBenefitsItemIcons = ({baseLabel, buttons}) => {

  if(isEmpty(buttons) || !Array.isArray(buttons)){
    return null
  }

  return <Box mt={2}>{buttons.map(({href, label}) => <MyButton key={`${baseLabel}${label}`} variant="contained" color="secondary" label={label} href={href} />)}</Box>
}

const GridBenefitsItemContent = ({onClick=null, icon, label="", buttons=[]}) => {
  const classes = useStyles()
  const [translate] = useTranslate()
  
  return (
    <div className={classes.container}>
    <div className={classes.iconContainer}>{icon}</div>
    <div className={classes.texts}>
      <Typography variant="h5" gutterBottom>{translate(`${label}.title`)}</Typography>
      <GridBenefitsItemContentDescription label={label} onClick={onClick} />
      <GridBenefitsItemIcons baseLabel={label} buttons={buttons} />
    </div>
   
  </div>)

}


const GridBenefitsItem = ({setting, icon, buttons=[], label="", ...otherProps}) => {

    const settings = useSettings(setting)
    const dialog = useDialog();
    const props = Object.assign({}, defaultProps, settings, otherProps)

    return (     
      <GridBenefitsItemContent 
        icon={icon} 
        label={label} 
        buttons={buttons}
        onClick={() => dialog({
          label: "",
          content: <GridBenefitsItemContent icon={icon} label={label} />
        })}
      />
    ) 

}


export default GridBenefitsItem
