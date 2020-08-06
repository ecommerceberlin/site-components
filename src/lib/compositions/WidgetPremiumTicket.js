

import React from 'react'
import {TwoColsLayout} from '../components/MyLayouts'
import Wrapper from '../components/Wrapper'
import Markdown from '../components/Markdown'
import Chatlio from '../services/Chatlio'
import {resizeCloudinaryImage} from '../helpers'
import MyTypography from '../components/MyTypography'
import TicketPrice from  '../components/Bookingmap/TicketPrice'
import TicketBuyButton from '../components/Bookingmap/TicketBuyButton'
import DatasourceTickets from '../datasources/Tickets'

const PremiumTicketBody = ({first, name, ticket, resolveLabel, resolveSecondaryLabel, resolveText}) => (

  <Wrapper
  first={first}
  label={resolveLabel(name)}
  secondaryLabel={resolveSecondaryLabel(name)}
>
  <div style={{ marginTop: 80 }}>
    <TwoColsLayout
      left={
        <img
          src={resizeCloudinaryImage(
            ticket.image,
            800,
            800,
          )}
          alt=""
          style={{ width: '100%' }}
        />
      }
      right={
        <div style={{ marginLeft: 20 }}>
          <Markdown
            label={resolveText(name)}
          />

          <div style={{ marginBottom: 20 }}>
            <MyTypography template="price">
              <TicketPrice price={ticket.price} />
            </MyTypography>
          </div>

          <TicketBuyButton
            id={ticket.id}
            bookable={ticket.bookable}
            label="common.buy"
            right={<Chatlio label="common.request_more_info" />}
          />
        </div>
      }
    />
  </div>
</Wrapper>

)



const WidgetPremiumTicket = ({resolve, name, ticket, ...rest}) => {

  if("id" in ticket){
    return <PremiumTicketBody name={name} ticket={ticket} {...rest} />
  }else{
    return (<DatasourceTickets>{

      (alltickets) => {
  
        const _ticket = alltickets.find(t => resolve(t))
        // const name = ticket.translation_asset_id.replace()
        return <PremiumTicketBody name={name} ticket={_ticket} {...rest} />
  
      }
    }</DatasourceTickets>)
  }
} 

WidgetPremiumTicket.defaultProps = {
  resolve : function(){return true},
  name: "",
  ticket: {},
  first: true,
  resolveLabel: (name) => `resources.upgrades.misc.${name}.name`,
  resolveSecondaryLabel: (name) => `resources.upgrades.misc.${name}.description`,
  resolveText: (name) => `resources.upgrades.misc.${name}.text`

}

export default WidgetPremiumTicket