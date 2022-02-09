import React from 'react';
import Bookingmap from '../components/Bookingmap/Bookingmap'
import BoothOrderSteps from '../components/Bookingmap/BoothOrderSteps'
import BoothDialogLegend from '../components/Bookingmap/BoothDialogLegend'
import Wrapper from '../components/Wrapper'
import {useSettings} from '../helpers'
import RecentPurchases from '../components/Bookingmap/RecentPurchases'

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
                    <BoothDialogLegend setting={setting} />
                    </div>
                    <Bookingmap setting={setting} />
                    <RecentPurchases setting={setting} />
        </div>
        </Wrapper>
    )
} 

export default WidgetSalesMap