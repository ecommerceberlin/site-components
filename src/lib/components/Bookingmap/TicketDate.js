import React from 'react'

import { useTranslate } from '../../i18n';
import moment from 'moment';

const TicketDate = ({setting="", start="", end="", inDates = 0}) => {

    const [translate] = useTranslate();

    const endDays = moment(end).diff(moment(), "days")
    const endHours = moment(end).diff(moment(), "hours")
    const endMins = moment(end).diff(moment(), "minutes")

    const startDays = moment(start).diff(moment(), "days")
    const startHours = moment(start).diff(moment(), "hours")
    const startMins = moment(start).diff(moment(), "minutes")

    if(inDates) {

      if(endDays > 0){
        return `${translate('event.sales.pool.end')} ${endDays} ${translate('common.days')}`
      }  

      if(endHours > 0){
        return `${translate('event.sales.pool.end')} ${endHours} ${translate('common.hours')}`
      }  

      return `${translate('event.sales.pool.end')} ${endMins} ${translate('common.minutes')}`

    }else{

      if(startDays > 0 || startHours > 0){
        return `${translate('event.sales.pool.start')} ${start.substring(0, 16)}` 
      }

      return `${translate('event.sales.pool.start')} ${startMins} ${translate('common.minutes')}` 
    }


}

export default TicketDate