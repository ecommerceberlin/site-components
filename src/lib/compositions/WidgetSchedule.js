
import React from 'react';
import Wrapper from '../components/Wrapper'
import Schedule from '../components/Schedule'
import Presenters from '../datasources/Presenters';
import Exhibitors from '../datasources/Exhibitors';


const WidgetSchedule = ({link, times, venues, descriptions, venueStyle, ...wrapper}) => (

    <Wrapper {...wrapper}>
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

    </Wrapper> 


)

WidgetSchedule.defaultProps = {
    label : "presenters.schedule",
    secondaryLabel : "presenters.list_description",
    links : [],
    link : true,
    descriptions : false,
    times: {
        '11:15': 'presentation',
        '11:50': 'presentation',
        '12:10': 'break_30',
        '12:40': 'presentation',
        '13:15': 'presentation',
        '13:35': 'break_30',
        '14:05': 'presentation',
        '14:40': 'presentation',
        '15:00': 'break_30',
        '15:30': 'presentation',
        '16:05': 'presentation'
      },
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