
import { 
    Wrapper, 
    Box 
} from '../components'
import { 
    useDatasource, useSettings
} from '../helpers'

import { isEmpty, get, flatten, sortBy } from 'lodash'
import ScheduleItemContainer from '../components/Schedule/ScheduleItemContainer'
import {
    Bookingmap,
    Booth
} from '../components/Bookingmap'
import Grid from '@material-ui/core/Grid';


const filterMeetups = (meetups=[], allowedDirections=[]) => !isEmpty(meetups) && Array.isArray(meetups)? meetups.filter(meetup => allowedDirections.includes(meetup.direction)): []


const WidgetPlannerScheduledMeetups = ({email="", setting="bookingmap"}) => {

    const meetups = useDatasource({
        resource: "planner", 
        params: {
            scope: "meetups",
            email
        }
    })

    const filtered = filterMeetups(meetups, ["C2P", "P2C"])

    const marked = flatten(filtered.map(item=>get(item, "company.booths", []))).map(item => item.id)

    if(isEmpty(marked)){
        return null
    }

    return (
        <Wrapper label="planner.meetups.title">
        <Bookingmap setting={setting} booth={Booth} marked={marked} />
        </Wrapper>
    )


}

const WidgetPlannerWorkshops = ({email="", setting="schedule"}) => {

    const meetups = useDatasource({
        resource: "planner", 
        params: {
            scope: "meetups",
            email
        }
    })

    const filtered = filterMeetups(meetups, ["LTD"])

    if(isEmpty(filtered)){
        return null
    }

    const workshops = sortBy(filtered.map(workshop => workshop.presenter), function(item){
        return get(item, "presenter.presentation_time")
    })

    return ( <Wrapper label="planner.workshops.title"><Grid container spacing={1}>{
        workshops.map(workshop => {
        return (<Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={workshop.id}><ScheduleItemContainer setting={setting} data={[workshop]} /></Grid>)
    })}</Grid></Wrapper>)
}



const WidgetPlanner = ({email=""}) => {


    const schedule = useDatasource({
        resource: "planner", 
        params: {
            scope: "schedule",
            email
        }
    })

    const favs = useDatasource({
        resource: "planner", 
        params: {
            scope: "favs",
            email
        }
    })


    return (<div>
        <WidgetPlannerWorkshops email={email} />
        <WidgetPlannerScheduledMeetups email={email} />
    </div>)

}

export default WidgetPlanner