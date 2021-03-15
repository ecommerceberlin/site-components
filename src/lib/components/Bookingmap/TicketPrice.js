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

    const {locale, defaultLocale, locales} = useRouter();
    const [translate] = useTranslate();

    const localeLabel = locale in localeCurrencyMapping? localeCurrencyMapping[locale].toUpperCase(): "EUR"

    return `${get(price, locale, "en")} ${localeLabel} ${translate('common.prices.net')}`;
}

export default TicketPrice

