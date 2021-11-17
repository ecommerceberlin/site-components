import React from 'react';
import { useTranslate } from '../../i18n';
import { useSettings } from '../../helpers'


const ecommerceDefaultProps = {
  
}

const TicketRemainingInfo = ({setting="ecommerce", remaining=0, bookable=false, isFuture=false}) => {

  const ecommerceSettings = useSettings(setting, {});
  // const {show_start, show_end} = Object.assign({}, ecommerceDefaultProps, ecommerceSettings)
  const [translate] = useTranslate()

  if(!bookable && !isFuture){
    return null
  }

  return   <span>{`${translate("common.remaining")} ${remaining} ${translate("common.pcs")}`}</span>

}


export default TicketRemainingInfo