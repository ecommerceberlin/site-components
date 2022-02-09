import React from 'react'
import { useTranslate } from '../i18n';
import moment from 'moment';

const DateAgo = ({disabled=false, date="", ago="common.ago"}) => {

    const [translate] = useTranslate();

    if(disabled){
        return null
    }

    const days = moment(date).diff(moment(), "days")
    const hours = moment(date).diff(moment(), "hours")
    const minutes = moment(date).diff(moment(), "minutes")

    if(days < 0){
        return `${Math.abs(days)} ${translate('common.days')} ${ago ? translate(ago): null}`
    }

    if(hours){
        return `${Math.abs(hours)} ${translate('common.hours')}  ${ago ? translate(ago): null}`
    }

    return `${Math.abs(minutes)} ${translate('common.minutes')} ${ago ? translate(ago): null}`


}

export default DateAgo