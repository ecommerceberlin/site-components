



import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {changeLocale} from './redux/actions'
import get from 'lodash/get'


function getLang(){
    if (navigator.languages !== undefined) {
        return navigator.languages[0]; 

    }else{
        return navigator.language;
    } 
}


const DetectLocale = ({locale, settings, dispatch}) => {

    useEffect(()=>{

        const availableLocales = get(settings, "system.available_locales")
        const defaultLocale = get(settings, "default_locale");

        console.log(availableLocales)

        // const browserLang = getLang().substr(0, 2);

        // console.log("detected lanng", browserLang)

        // if(availableLocales.includes(browserLang)){
        //     dispatch(changeLocale(browserLang))
        // }

        //can change locale???
       
    })

    return null
        
}

const mapStateToProps = state => ({
    locale: state.app.locale,
    settings : state.settings,
});
  
export default connect(mapStateToProps, {
    changeLocale: changeLocale
})(DetectLocale);