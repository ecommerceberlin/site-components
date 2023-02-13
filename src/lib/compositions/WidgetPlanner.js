


import {useDatasource} from 'eventjuicer-site-components'

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



    console.log({meetups, schedule})

    return null


}

export default WidgetPlanner