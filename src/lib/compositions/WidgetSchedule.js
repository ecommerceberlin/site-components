
import React from 'react';
import Wrapper from '../components/Wrapper'
import Schedule from '../components/Schedule'
import Presenters from '../datasources/Presenters';
import Exhibitors from '../datasources/Exhibitors';
import Settings from '../datasources/Settings';
import {useDatasource, useSettings} from '../helpers'


const defaultProps = {
    wrapperProps: {
        label : "presenters.schedule",
        secondaryLabel : "presenters.list_description",
    },
    links : [],
    link : true,
    descriptions : false,
    times: {},
    venues: {
        A: { company_id: 0 },
        B: { company_id: 0 },
        C: { company_id: 0 }
    },
    venueStyle : "black",
    minimized : []
}


const WidgetSchedule = ({setting = "schedule", day = null, ...props}) => {

    const settings = useSettings(setting)
    const {presenters} = useDatasource({
        presenters: {
            resource: "presenters",
            filters: {
                filter: (item) => day ? day.length && "presentation_day" in item && item.presentation_day == day: true
            }
        }
    })

    const {link, times, venues, venueStyle, minimized, descriptions, wrapperProps} = Object.assign({}, defaultProps, settings, props)

    return (

        <Wrapper {...wrapperProps}>
        <Exhibitors>{
            (exhibitors) => (<Schedule
                exhibitors={ exhibitors }
                presenters={ presenters }
                times={ times }
                venues={ venues }
                link={link} 
                descriptions={ descriptions }
                venueStyle={  venueStyle }
                minimized={ minimized }
                 />)}</Exhibitors>
        </Wrapper>  
    )

}



export default WidgetSchedule