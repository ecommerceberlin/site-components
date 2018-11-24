import React from 'react';
import { translate } from '../../i18n';
import moment from 'moment';

const TicketDate = ({start, end, inDates, translate}) => {

    const diff = moment(end).diff(moment(), "days")

    if(inDates) {
      return `${translate('event.sales.pool.end')} ${diff} ${translate('common.days')}`
    }

    return `${translate('event.sales.pool.start')} ${start.substring(0, 10)}` 

}

TicketDate.defaultProps = {
    inDates : false
}

export default translate(TicketDate)