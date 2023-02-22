


import {
    Wrapper,
    Bookingmap,
    useDatasource} from 'eventjuicer-site-components'


const WidgetPlannerBookingmap = ({setting="bookingmap"}) => {
   
    return (<Wrapper>
        <Bookingmap setting={setting} booth={(props) => <div {...props}>asdas</div>} />
        </Wrapper>)


}


const WidgetPlanner = ({email=""}) => {

    const schedule = useDatasource({
        resource: "planner", 
        params: {
            scope: "schedule",
            email
        }
    })

    const meetups = useDatasource({
        resource: "planner", 
        params: {
            scope: "meetups",
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

    console.log({meetups, schedule})

    return <WidgetPlannerBookingmap />

}

export default WidgetPlanner