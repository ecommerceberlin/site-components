import React from 'react';
import Bookingmap from '../components/Bookingmap/Bookingmap'
import OrderSteps from '../components/Bookingmap/OrderSteps'
import Legend from '../components/Bookingmap/Legend'
import Wrapper from '../components/Wrapper'
import Settings from '../datasources/Settings';

const WidgetSalesMap = ({allowedGroupIds, steps, ...rest}) => (

    <Wrapper {...rest}>
    <div>
        <div>
            <OrderSteps items={steps} active={0} />
            <Legend allowedGroupIds={allowedGroupIds} />
        </div>
 
        <Bookingmap />

    </div>
    </Wrapper>

)

WidgetSalesMap.defaultProps = {
    allowedGroupIds : [264,265,266,267],
    steps : [
        "choose_booth",
        "confirm",
        "pay",
        "access"
    ]
}

export default WidgetSalesMap