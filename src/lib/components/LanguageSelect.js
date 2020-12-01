import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
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


const LanguageSelect = ({ label, selectedLocale, dialogShow, changeLocale }) => {

  const [translate] = useTranslate();
  const router = useRouter();
  const classes = useStyles();

  const {locale, locales, defaultLocale} = router;
  
  let alternativeLocale = false;

  if(locales && locales.length === 2){
    alternativeLocale =  locales.find(loc => loc != selectedLocale)
  }

  return (
    <Button
    //  variant="outlined"
      onClick={() => alternativeLocale ? changeLocale(alternativeLocale) : dialogShow({
          title: translate(label),
          content: <div style={{marginTop: 40}}>{
            locales.map( loc => {
              return <LanguageButton key={loc} target={loc} />
            })
          }</div>,
          buttons: []
      })}
      color="inherit"
    >
    <Language className={classNames(classes.leftIcon, classes.iconSmall)} />
    { translate(`common.locales.${alternativeLocale ? alternativeLocale : label}`) }
    </Button>
  )

}

LanguageSelect.defaultProps = {
  locales : [],
  label: 'change'
};

export default connect(
  (state) => ({selectedLocale : state.app.locale}),
  {dialogShow, changeLocale}, 
)(LanguageSelect);
