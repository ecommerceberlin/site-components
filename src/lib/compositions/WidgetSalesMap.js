import React from 'react';
import Bookingmap from '../components/Bookingmap/Bookingmap'
import OrderSteps from '../components/Bookingmap/OrderSteps'
import Legend from '../components/Bookingmap/Legend'
import Wrapper from '../components/Wrapper'
import Settings from '../datasources/Settings';

const WidgetSalesMap = ({disabled, disabledTicketIds, ...wrapperProps}) => (

    //{steps, allowedGroupIds, height}

    <Wrapper {...wrapperProps}>

    <Settings>{(get) => (

    <div>
        <div>
            <OrderSteps items={ get("bookingmap.steps") } active={0} />
            <Legend allowedGroupIds={ get("bookingmap.allowedGroupIds") } />
        </div>
        <Bookingmap disabled={disabled} disabledTicketIds={disabledTicketIds} height={ get("bookingmap.height") } /> 
    </div>

    )}</Settings>

    </Wrapper>
)

WidgetSalesMap.defaultProps = {
   disabled : false,
   disabledTicketIds : []
}

export default WidgetSalesMap