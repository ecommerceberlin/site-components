import { translate } from '../../i18n';
import _get from 'lodash/get';


const TicketPrice = ({ price, locale, translate }) => {

    const currency = locale === "en" ? "eur" : "pln"

    return `${_get(price, locale, "en")} ${translate(
      `common.currencies.${currency}`
    )} ${translate('common.prices.net')}`;
}

TicketPrice.defaultProps = {
    price : {}
}

export default translate(TicketPrice)

