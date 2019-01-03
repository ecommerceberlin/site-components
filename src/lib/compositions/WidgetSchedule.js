
import React from 'react';
import Wrapper from '../components/Wrapper'
import Schedule from '../components/Schedule'
import Presenters from '../datasources/Presenters';
import Exhibitors from '../datasources/Exhibitors';
import Settings from '../datasources/Settings';


const WidgetSchedule = ({link, descriptions, ...wrapper}) => (

    <Wrapper {...wrapper}>
    <Settings name="schedule">
    {({venues, times, venueStyle}) => (

<Exhibitors>{
    (exhibitors) => (
        <Presenters  
        //limit={20}
        random={false}
        mobile={0}
   //     filter={function(item){ return [77504, 77505, 77508, 77529, 77557, 77773, 78014, 78429].indexOf(item.id) > -1 }}  
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
    venueStyle : "black"
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