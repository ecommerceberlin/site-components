import React, {useState} from 'react';
import compose from 'recompose/compose';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames'
import Button from '@material-ui/core/Button';
import {useTranslate, changeLocale} from '../i18n'
import Language from '@material-ui/icons/Language';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router'

import {
  dialogShow
} from './redux/actions';


import LanguageButton from './LanguageButton'

const useStyles = makeStyles( theme => ({
  selectors : {
    margin : 40,
  },
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
}));


const LanguageSelect = ({ label="choose" }) => {

  const [labelVisible, changeLabelVisibility] = useState(false)
  const [translate, selectedLocale] = useTranslate();
  const {locales, defaultLocale} = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch()

  if(!locales || locales.length === 1){
    return null
  }

  let alternativeLocale = false;

  if(locales && locales.length === 2){
    alternativeLocale =  locales.find(loc => loc != selectedLocale)
  }

  return (<Button
      //variant="outlined"
      onClick={() => alternativeLocale ? dispatch(changeLocale(alternativeLocale)) : dispatch(dialogShow({
          title: translate(label),
          content: <div style={{marginTop: 40}}>{
            locales.map( loc => {
              return <LanguageButton key={loc} target={loc} />
            })
          }</div>,
          buttons: []
      }))}
      color="inherit"
      onMouseOver={() => changeLabelVisibility(true)}
      onMouseOut={() => changeLabelVisibility(false)}
    >

    <Language className={classNames(classes.leftIcon, classes.iconSmall)} />
    {
      alternativeLocale ? 
        labelVisible ? `${translate(`common.locales.switch_to_${alternativeLocale}`)}`: selectedLocale.toUpperCase() : 
        labelVisible ? translate(`common.locales.${label}`) : null

    }
    
    </Button>

  )

}

export default LanguageSelect