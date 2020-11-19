

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

const PremiumTicketBody = (props) => {

  const {
    first,
    ticket, 
    resolveLabel, 
    resolveSecondaryLabel, 
    resolveText
  } = props;

  if(! "image" in ticket){

    return null
  }


  return (

    <Wrapper
    first={first}
    label={resolveLabel(ticket)}
    secondaryLabel={resolveSecondaryLabel(ticket)}
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
              label={resolveText(ticket)}
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
  
}

PremiumTicketBody.defaultProps = {
  ticket : {}
}

const WidgetPremiumTicket = ({resolve, name, ticket, ...rest}) => {

  if(ticket && "id" in ticket && ticket.id){
    return <PremiumTicketBody ticket={ticket} {...rest} />
  }else{
    return (<DatasourceTickets>{

      (alltickets) => {
  
        const _ticket = (alltickets || []).find(t => resolve(t, name))
        return <PremiumTicketBody ticket={_ticket} {...rest} />
  
      }
    }</DatasourceTickets>)
  }
} 

WidgetPremiumTicket.defaultProps = {
  resolve : function(ticket, name){return ticket.translation_asset_id.indexOf(name)>-1},
  name: "",
  ticket: {},
  first: true,
  resolveLabel: (ticket) => `${ticket.translation_asset_id}.name`,
  resolveSecondaryLabel: (ticket) => `${ticket.translation_asset_id}.description`,
  resolveText: (ticket) => `${ticket.translation_asset_id}.text`

}

export default WidgetPremiumTicket