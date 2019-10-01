import React from 'react';
import { translate } from '../i18n'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const styles = {
    root : {
        color : red[500],
        fontWeight : 900,
        position : 'relative',
        top : -3
    }
}

const FullWidthTranslatableImage = ({locale, src, classes}) => {
    
    if (new Object(src) === src){
        if (locale in src){
            return <img src={ src[locale] } alt="" /> ;
        }
        const keys = Object.keys(src);
        return keys.length ? <img src={ src[keys[0]] } alt="" /> : null;
    }

    return <img src={src} alt="" />
}
 
    
const enhance = compose(
    translate,
    withStyles(styles)
)


export default enhance(FullWidthTranslatableImage);