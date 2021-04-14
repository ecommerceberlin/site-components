import React from 'react';
import Bookingmap from '../components/Bookingmap/Bookingmap'
import OrderSteps from '../components/Bookingmap/OrderSteps'
import Legend from '../components/Bookingmap/Legend'
import Wrapper from '../components/Wrapper'
import {useSettings} from '../helpers'

const defaultProps = {
    disabledTicketIds: [],
    steps: [],
    allowedGroupIds: [],
    disabled : false,
    boothStyleMapping: {},
    wrapperProps: {
        label: "salesmap"
    }
}


const WidgetSalesMap = ({setting = "bookingmap", ...props}) => {

    const settings = useSettings(setting, {})
    const {wrapperProps} = Object.assign({}, defaultProps, settings, props)

    return (
        <Wrapper {...wrapperProps}>
        <div>
                    <div>
                    <OrderSteps setting={setting}  />
                    <Legend setting={setting} />
                    </div>
                    <Bookingmap setting={setting} />
        </div>
        </Wrapper>
    )
} 

export default WidgetSalesMap