
import React from 'react';
import Wrapper from '../components/Wrapper'
import {useSettings} from '../helpers'


import {
    Bookingmap,
    BoothOrderSteps,
    BookingmapLegend,
    RecentPurchases,
    Booth
} from '../components/Bookingmap'

const defaultProps = {
    wrapperProps: {
        label: "exhibitors.map.title",
        secondaryLabel: "exhibitors.map.opensales"
    }
}


const WidgetSalesMap = ({setting = "bookingmap", ...props}) => {

    const settings = useSettings(setting, {})
    const {wrapperProps} = Object.assign({}, defaultProps, settings, props)

    return (
        <Wrapper {...wrapperProps}>
        <div>
                    <div>
                    <BoothOrderSteps setting={setting}  />
                    <BookingmapLegend setting={setting} />
                    <RecentPurchases setting={setting} />
                    </div>
                    <Bookingmap setting={setting} booth={Booth} />
                  
        </div>
        </Wrapper>
    )
} 

export default WidgetSalesMap