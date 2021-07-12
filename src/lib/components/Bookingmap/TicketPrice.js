import React from 'react';
import { useTranslate } from '../../i18n';
import get from 'lodash/get';
import {useRouter} from 'next/router'


const localeCurrencyMapping = {
    pl: "PLN",
    de: "EUR",
    en: "EUR"
}

const TicketPrice = ({ price = {} }) => {

    const {defaultLocale, locales} = useRouter();
    const [translate, locale] = useTranslate();

   // const localeLabel = locale in localeCurrencyMapping? localeCurrencyMapping[locale].toUpperCase(): "EUR"

    const formatedPrice =  (new Intl.NumberFormat(locale, { 
        style: 'currency', 
        currency: get(localeCurrencyMapping, locale, "EUR")
    })).format(get(price, locale, get(price, defaultLocale)));

    return `${formatedPrice} ${translate('common.prices.net')}`;
}

export default TicketPrice

