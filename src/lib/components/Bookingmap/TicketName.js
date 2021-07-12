import React from 'react';
import { useTranslate } from '../../i18n';
import get from 'lodash/get';
import {useRouter} from 'next/router'


const TicketName = ({ names = {}, label="" }) => {

    const [translate, locale] = useTranslate();
    const {defaultLocale} = useRouter()

    if(label.length){
        return label
    }

    const name = get(names, locale, "")

    return name.length ? name: get(names, defaultLocale, translate("as")) 
}

export default TicketName

