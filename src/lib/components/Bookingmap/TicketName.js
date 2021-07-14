import React from 'react';
import { useTranslate } from '../../i18n';
import { useSelector } from 'react-redux'
import { KeyedTicketGroupsSelector } from '../../redux/selectors'
import get from 'lodash/get'
import {slug} from '../../helpers'

const TicketName = ({ names = {}, group_id=0, baseLabel="" }) => {

    const [translate, locale, defaultLocale] = useTranslate();
    const ticketgroups = useSelector(KeyedTicketGroupsSelector)

    const prefix = ticketgroups && group_id in ticketgroups? get(ticketgroups[group_id], "name"): null
    
    if(group_id && baseLabel && prefix){
        return translate(`tickets.${slug(prefix, "_")}.${baseLabel}`)
    }

    const name = get(names, locale, "")
    return name.length>3 ? name: get(names, defaultLocale, "")

}

export default TicketName

