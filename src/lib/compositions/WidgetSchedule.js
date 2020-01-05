
import React from 'react';
import Wrapper from '../components/Wrapper'
import Schedule from '../components/Schedule'
import Presenters from '../datasources/Presenters';
import Exhibitors from '../datasources/Exhibitors';
import Settings from '../datasources/Settings';


const WidgetSchedule = ({link, descriptions, ...wrapper}) => (

    <Wrapper {...wrapper}>
    <Settings name="schedule">
    {({venues, times, venueStyle, minimized}) => (

<Exhibitors>{
    (exhibitors) => (
        <Presenters  
        random={false}
        mobile={0}
        filter={false}
        >{
        (presenters) => 
        
        <Schedule
            exhibitors={exhibitors}
            presenters={presenters}
            times={times}
            venues={venues}
            link={link} 
            descriptions={descriptions}
            venueStyle={venueStyle}
            minimized={minimized}
        />
        
        }</Presenters>
    )
}


</Exhibitors>
    )}
    </Settings>
    </Wrapper> 

)

WidgetSchedule.defaultProps = {
    label : "presenters.schedule",
    secondaryLabel : "presenters.list_description",
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
/* 

 
   */
/*
[
    // <Link key="all" href="/presenters" label="common.menu.visitors.presenters" variant="flat" color="secondary" />,
    // <Link key="subjects" href="/schedule" label="common.menu.visitors.schedule" variant="flat" color="secondary" />
]
*/

export default WidgetSchedule