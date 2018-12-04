import { translate } from '../../i18n';
import * as moment from 'moment';

const TicketDate = ({start, end, inDates, translate}) => {

    const diffDays = moment(end).diff(moment(), "days")
    const diffHours = moment(end).diff(moment(), "hours")
    const diffMins = moment(end).diff(moment(), "minutes")

    if(inDates) {

      if(diffDays > 0){
        return `${translate('event.sales.pool.end')} ${diffDays} ${translate('common.days')}`
      }  

      if(diffHours > 0){
        return `${translate('event.sales.pool.end')} ${diffHours} ${translate('common.hours')}`
      }  

      return `${translate('event.sales.pool.end')} ${diffMins} ${translate('common.minutes')}`

    }

    return `${translate('event.sales.pool.start')} ${start.substring(0, 16)}` 

}

TicketDate.defaultProps = {
    inDates : false
}

export default translate(TicketDate)