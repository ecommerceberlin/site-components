

import Wrapper from '../components/Wrapper'
import Schedule from '../components/Schedule'

import Presenters from '../datasources/Presenters';
import Exhibitors from '../datasources/Exhibitors';


const WidgetSchedule = ({label, secondaryLabel, links, link}) => (

    <Wrapper
    label={label}
    secondaryLabel={secondaryLabel}
    links={links}
    >
   

    <Exhibitors>{
        (exhibitors) => (
            <Presenters  
       //     limit={20}
            random={false}
            mobile={0}
       //     filter={function(item){ return [77504, 77505, 77508, 77529, 77557, 77773, 78014, 78429].indexOf(item.id) > -1 }}  
            >{
            (presenters) => 
         
            <Schedule
                exhibitors={exhibitors}
                presenters={presenters}
                link={link} 
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
    link : true
}

/*
[
    // <Link key="all" href="/presenters" label="common.menu.visitors.presenters" variant="flat" color="secondary" />,
    // <Link key="subjects" href="/schedule" label="common.menu.visitors.schedule" variant="flat" color="secondary" />
]
*/

export default WidgetSchedule