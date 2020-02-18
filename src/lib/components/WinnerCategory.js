import React from 'react';
import { translate } from '../i18n';


const WinnerCategory = ({translate, keyword, place}) => {

    if(parseInt(place) === 0){
        return null;
    }

    return `${translate(`common.place${place}`)} - ${translate(`common.tags.${keyword}`)}`
}

WinnerCategory.defaultProps = {
    place : 1   
}

export default translate(WinnerCategory);