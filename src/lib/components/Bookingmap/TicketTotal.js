import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCart, getTickets } from '../../redux/selectors'
import isEmpty from 'lodash/isEmpty'
import { resourceFetchRequest } from '../redux/actions';
import { useTranslate } from '../../i18n'
import get from 'lodash/get'


const localeCurrencyMapping = {
    pl: "PLN",
    de: "EUR",
    en: "EUR"
}


const TicketTotal = () => {

    const cart = useSelector(getCart)
    const tickets = useSelector(getTickets)
    const dispatch = useDispatch()
    const [translate, locale] = useTranslate()

    useEffect(() => {
        if(isEmpty(tickets)){
          dispatch(resourceFetchRequest("tickets", true))
        }
    })

    let total = 0;

    if(isEmpty(tickets) || isEmpty(cart)){
        return null
    }

    Object.keys(cart).forEach(ticket_id => {
        const {quantity} = cart[ticket_id]
        if(!(ticket_id in tickets)){
            return;
        }
        const ticket = tickets[ticket_id]
    
        total = total + parseInt(get(ticket.price, locale)) * quantity
        
    });

    return `${new Intl.NumberFormat(locale, { style: 'currency', currency: localeCurrencyMapping[locale]}).format(total)} ${translate('common.prices.net')}`;
}


export default TicketTotal



/**
 * 

  agg: {customers: 0, sold: 0}
  bookable: 1
  details_url: ""
  end: "2021-07-13 23:59:00"
  errors: []
  group_id: 314
  id: 1731
  image: ""
  in_dates: 1
  limit: 1
  max_quantity: 1
  names: {pl: "Przestrzeń 6x4 / Strefa GRAND / V pula", en: "Exhibition Space 6x4 / GRAND / 5th pool", de: ""}
  price: {pl: 16599, en: 4149, de: 4149}
  remaining: 1
  role: "exhibitor"
  start: "2021-06-06 00:00:00"
  thumbnail: ""
  translation_asset_id: ""

*/