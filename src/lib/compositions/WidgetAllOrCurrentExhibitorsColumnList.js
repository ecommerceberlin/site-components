
import React from 'react';

import WidgetAllExhibitorsColumnList from './WidgetAllExhibitorsColumnList';
import ColumnList from '../components/ColumnList'
import Wrapper from '../components/Wrapper'
import { useDatasource, chunkArrayData, useWidth } from '../helpers';
import {
    ExhbitorsListUpdaterContextProvider,
    ExhibitorsListToolbar,
    useExhibitorsListUpdaterContext
} from './WidgetExhibitorsWithSearch'
import { Box } from '@material-ui/core';





const FilteredColumnList = () => {

    const {searched, keyword, data, filteredByKeyword} = useExhibitorsListUpdaterContext()
    const width = useWidth()
    const marked = keyword? filteredByKeyword: searched

    if(width == "lg" || width == "xl"){
        return (<ColumnList data={chunkArrayData(data, width) } marked={ marked.map(i => i.id) } />)
    }

    return (<ColumnList data={chunkArrayData(marked, width) } />)
}

const WidgetAllOrCurrentExhibitorsColumnList = ({threshold=100, wrapperProps}) => {

    const exhibitors_current = useDatasource({resource: "exhibitors2", filters: {
        sort: "profile.name"
    }})


    if(!Array.isArray(exhibitors_current)){
        return null
    } 
    
    if(exhibitors_current.length > threshold){
        return (<Wrapper {...wrapperProps} label="exhibitors.list_current" secondaryLabel={null}>
        <ExhbitorsListUpdaterContextProvider>
        <ExhibitorsListToolbar  /> 
        <Box><FilteredColumnList /></Box>
        </ExhbitorsListUpdaterContextProvider>
        </Wrapper>)
    }


    return (<WidgetAllExhibitorsColumnList />)


}



export default WidgetAllOrCurrentExhibitorsColumnList