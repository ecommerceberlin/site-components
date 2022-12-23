
import React from 'react';
import Wrapper from '../components/Wrapper'
import Schedule from '../components/Schedule'
import Exhibitors from '../datasources/Exhibitors';
import {useDatasource, useSettings} from '../helpers'
import { isObject, isEmpty } from 'lodash';

const defaultProps = {
    wrapperProps: {
        label : "presenters.schedule",
        secondaryLabel : "presenters.list_description",
    },
    links : [],
    link : true,
    descriptions : false,
    times: {},
    venues: {},
    venueStyle : "black",
    minimized : [],
    inserts: {},
    day: null
}


const WidgetSchedule = ({setting = "schedule", ...props}) => {

    const settings = useSettings(setting)
    const {wrapperProps, day, venues,...otherProps} = Object.assign({}, defaultProps, settings, props)
    

    const presenters = useDatasource({
        resource: "presenters",
        filters: {
            filter: (item) =>  {
                const conditions = []
                if(day){
                    conditions.push(day.length && "presentation_day" in item && item.presentation_day == day)
                }
                if(venues && isObject(venues)){
                    conditions.push("presentation_venue" in item && Object.keys(venues).includes(item.presentation_venue) )
                }

                // if(short){
                //     conditions.push(item.presentation_time < "12:00")
                // }

                return conditions.length? conditions.every(c => c) : true
            }
        }
    })

    if(isEmpty(presenters)){
        return null
    }


    return (

        <Wrapper {...wrapperProps}>
        <Exhibitors>{
            (exhibitors) => (<Schedule
                day={day}
                setting={setting}
                exhibitors={ exhibitors }
                presenters={ presenters }
                {...otherProps}
                />)}</Exhibitors>
        </Wrapper>  
    )

}



export default WidgetSchedule