import React from 'react';
import Bookingmap from '../components/Bookingmap/Bookingmap'
import OrderSteps from '../components/Bookingmap/OrderSteps'
import Legend from '../components/Bookingmap/Legend'
import Wrapper from '../components/Wrapper'
import Settings from '../datasources/Settings';



const WidgetSalesMap = ({disabled, steps, allowedGroupIds, boothStyleMapping, disabledTicketIds, ...wrapperProps}) => (

    //{steps, allowedGroupIds, height}

    <Wrapper {...wrapperProps}>

    <Settings>{(get) => (

    <div>
        <div>
            <OrderSteps items={ get("bookingmap.steps", steps) } active={0} />
            <Legend  />
        </div>

        <Bookingmap 
            disabled={disabled} 
            disabledTicketIds={get("bookingmap.disabledTicketIds", disabledTicketIds)} 
            height={ get("bookingmap.height") } 
            boothStyleMapping={get("bookingmap.boothStyleMapping", boothStyleMapping)}
        />

    </div>

    )}</Settings>

    </Wrapper>
)

WidgetSalesMap.defaultProps = {
    disabledTicketIds: [],
    steps: [],
    allowedGroupIds: [],
    disabled : false,
    boothStyleMapping: {}
}

export default WidgetSalesMap