import React from 'react'
import { useSettings } from '../../helpers'
import { useTranslate } from '../../i18n';
import moment from 'moment';


const ecommerceDefaultProps = {
  show_start: true,
  show_end: true,
}


const TicketDate = ({setting="ecommerce", start="", end="", bookable=0, isFuture=false}) => {

    const [translate] = useTranslate();
    const ecommerceSettings = useSettings(setting, {});
    const {show_start, show_end} = Object.assign({}, ecommerceDefaultProps, ecommerceSettings)

    
    const endDays = moment(end).diff(moment(), "days")
    const endHours = moment(end).diff(moment(), "hours")
    const endMins = moment(end).diff(moment(), "minutes")

    const startDays = moment(start).diff(moment(), "days")
    const startHours = moment(start).diff(moment(), "hours")
    const startMins = moment(start).diff(moment(), "minutes")

    if(isFuture) {

      if(startDays > 0 || startHours > 0){
        return `${translate('event.sales.pool.start')} ${start.substring(0, 16)}` 
      }
      return `${translate('event.sales.pool.start')} ${startMins} ${translate('common.minutes')}` 
    }

    if(bookable){
      if(endDays > 0){
        return `${translate('event.sales.pool.end')} ${endDays} ${translate('common.days')}`
      }  
      if(endHours > 0){
        return `${translate('event.sales.pool.end')} ${endHours} ${translate('common.hours')}`
      }  

      return `${translate('event.sales.pool.end')} ${endMins} ${translate('common.minutes')}`
    }

    return null

}

export default TicketDate