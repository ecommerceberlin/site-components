import React from 'react';
import Bookingmap from '../components/Bookingmap/Bookingmap'
import OrderSteps from '../components/Bookingmap/OrderSteps'
import Legend from '../components/Bookingmap/Legend'
import Wrapper from '../components/Wrapper'
import Settings from '../datasources/Settings';

const WidgetSalesMap = ({disabled, disabledTicketIds, ...wrapperProps}) => (

    <Wrapper {...wrapperProps}>

    <Settings name="bookingmap">
    
    {({steps, allowedGroupIds, height}) => (

    <div>

        <div>
            <OrderSteps items={steps} active={0} />
            <Legend allowedGroupIds={allowedGroupIds} />
        </div>

        <Bookingmap disabled={disabled} disabledTicketIds={disabledTicketIds} height={height} /> 
       
    </div>

    )}</Settings>

    </Wrapper>
)

WidgetSalesMap.defaultProps = {
   disabled : false,
   disabledTicketIds : []
}

export default WidgetSalesMap