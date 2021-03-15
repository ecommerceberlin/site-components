

import React from 'react'
import {TwoColsLayout} from '../components/MyLayouts'
import Wrapper from '../components/Wrapper'
import Markdown from '../components/Markdown'
import Chatlio from '../services/Chatlio'
import {resizeCloudinaryImage, useDatasource, useSettings} from '../helpers'
import MyTypography from '../components/MyTypography'
import TicketPrice from  '../components/Bookingmap/TicketPrice'
import TicketBuyButton from '../components/Bookingmap/TicketBuyButton'
import TicketImage from '../components/TicketImage'

const PremiumTicketBody = (props) => {

  const {
    first,
    ticket, 
    resolveLabel, 
    resolveSecondaryLabel, 
    resolveText,
    setting,
    icon
  } = props;

  if(! "image" in ticket){

    return null
  }

  const {disabledBuying, disabledTicketIds = []} = useSettings(setting)

  return (

    <Wrapper
    first={first}
    label={resolveLabel(ticket)}
    secondaryLabel={resolveSecondaryLabel(ticket)}
  >
    <div style={{ marginTop: 80 }}>
      <TwoColsLayout
        left={
          icon
        }
        leftCentered={true}
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
  
            {!disabledBuying && ticket.bookable && !disabledTicketIds.includes(ticket.id) ? <TicketBuyButton
              id={ticket.id}
              bookable={ticket.bookable}
              label="common.buy"
              right={<Chatlio label="common.request_more_info" />}
            />: null}

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

const WidgetPremiumTicket = ({setting, name = "", icons, ticket={}, resolve, ...rest}) => {

  const settings = useSettings(setting);

  const {alltickets} = useDatasource({
    alltickets: {
      resource: "tickets"
    }
  })

  const data = ticket && "id" in ticket && ticket.id? ticket: (alltickets || []).find(t => resolve(t, name))

  return <PremiumTicketBody {...rest} setting={setting} ticket={data} icon={<TicketImage data={data} path="image"  icons={icons} maxWidth={300} />} />
  
} 

WidgetPremiumTicket.defaultProps = {
  setting: "premium",
  resolve : function(ticket, name){return ticket.translation_asset_id.indexOf(name)>-1},
  first: true,
  resolveLabel: (ticket) => `${ticket.translation_asset_id}.name`,
  resolveSecondaryLabel: (ticket) => `${ticket.translation_asset_id}.description`,
  resolveText: (ticket) => `${ticket.translation_asset_id}.text`
}

export default WidgetPremiumTicket