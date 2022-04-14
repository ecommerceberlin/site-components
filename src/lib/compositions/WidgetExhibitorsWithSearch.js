
import React from 'react'
import {ToolBar, Wrapper} from '../components'
import { Bookingmap, Booth } from '../components/Bookingmap'
import { useDatasource } from '../helpers'
import { Box } from '@material-ui/core'
import { CompanyContext } from '../components/Company'

export const findBoothsId = (source) => {
    let booths = [];

    source.forEach(exhibitor => {
        exhibitor.instances.filter(ticket => ticket.formdata && "id" in ticket.formdata)
        .map(ticket => ticket.formdata.id)
        .forEach(formdata => booths.push(formdata))    
    })
    return booths
}

const WidgetExhibitorsWithSearch = ({setting="bookingmap"}) => {
    const exhibitors = useDatasource({resource: "exhibitors2"})
    const [filtered, setFiltered] = React.useState(exhibitors)

    const marked = filtered.length < 10? findBoothsId(filtered): []

    return (<Wrapper label="exhibitors.map.search" secondaryLabel={null}>

    <ToolBar data={exhibitors} onSearch={setFiltered} indexes={["slug", "profile.name"]} /> 

    <Box>
        <Bookingmap setting={setting} booth={Booth} marked={marked} />

        {/* {filtered.map(exh => <CompanyContext key={exh.id}></CompanyContext>)} */}
    </Box>

    </Wrapper>)

}

export default WidgetExhibitorsWithSearch