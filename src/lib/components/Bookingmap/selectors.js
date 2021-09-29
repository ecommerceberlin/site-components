
import { createCachedSelector } from 're-reselect';
import keyBy from 'lodash/keyBy'
import get from 'lodash/get';
import isObject from 'lodash/isObject'

import { getCompanyProfileInfo, getCompanyName, sha1 } from '../../helpers'
import { 
    getFormdata, 
    getCart, 
    getBlockings, 
    getUUID,
    KeyedTicketGroupsSelector,
    getVisuals
 } from '../../redux/selectors'



export const BoothTicketGroupSelector = createCachedSelector(
    KeyedTicketGroupsSelector,
    (state, g) => g,
    (ticketgroups, g) => {

        if(! (g in ticketgroups)){
            return 0;
        }
        const size = parseInt(ticketgroups[g].map.width);
        return !isNaN(size) ? size : 20; 

    }
)((state, g) => g)

/**
* blockings
* 
    booth-29-203: {
        sessid: 735edc77677b2ed88315da20c4c642965c5de29c,
        ticket_id: 1731,
        remaining: 563
    }
*/

export const BoothBlockedSelector = createCachedSelector(
    getBlockings,
    getUUID,
    (state, id) => id,
    (blockings, uuid, id) => {
        const lock = get(keyBy(blockings, "item_uid"), id, {})
        if("sessid" in lock){
            return (lock.sessid == sha1(uuid))
        }
        return null
    }
)((state, id) => id)

export const BoothSelectedSelector = createCachedSelector(
    getCart,
    (state, id) => id,
    (cart, id) => Object.values(cart).map(({formdata})=> formdata && "id" in formdata? formdata.id: "").includes(id)
)((state, id) => id)




/**
* formdata
* 
booth-29-203: {
    company: {id: 1158, slug: "i-systemspl", featured: 0, debut: 0, promo: 0, …}
    id: "booth-29-203"
    participant_id: 106207
    purchase: {id: 109625, paid: 1, status: "ok", status_source: "manual", created_at: "2019-12-11 12:36:00", …}
    ti: "G8"
    ticket_id: 1732
}
*/


export const BoothFormdataSelector = createCachedSelector(
    getFormdata,
    (state, id) => id,
    (data, id) =>  {
    
    const { purchase, company } = get(keyBy(data, "id"), id, {})
  
      return {
        status: purchase && "paid" in purchase? purchase.paid? "sold" : "hold" : false,
        name : company && "profile" in company? getCompanyName(company) : "", 
        image : company && "profile" in company? getCompanyProfileInfo(company, "thumbnail") : "",
        slug: company? company.slug: ""
      }
    }
)((state, id) => id)