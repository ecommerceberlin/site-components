
import React from 'react'
import {ToolBar, Wrapper} from '../components'
import { Bookingmap, BoothVisitor } from '../components/Bookingmap'
import { useDatasource } from '../helpers'
import { Box, Button } from '@material-ui/core'
// import { CompanyContextProvider } from '../components/Company'
import { isEmpty, flatten } from 'lodash'
import { useTranslate } from '../i18n'


export const findBoothsId = (source) => {
    let booths = [];

    if(Array.isArray(source)){
        source.forEach(exhibitor => {
            exhibitor.instances.filter(ticket => ticket.formdata && "id" in ticket.formdata)
            .map(ticket => ticket.formdata.id)
            .forEach(formdata => booths.push(formdata))    
        })
    }
   
    return booths
}

const ExhbitorsListUpdaterContextContainer = React.createContext({})
export const useExhibitorsListUpdaterContext = () => React.useContext(ExhbitorsListUpdaterContextContainer)
export const ExhbitorsListUpdaterContextProvider = ({children}) => {
    
    const [searched, _setSearched] = React.useState([])
    const [keyword, setKeyword] = React.useState("")

    const data = useDatasource({resource: "exhibitors2"})

    const setSearched = React.useCallback((str) => {
        setKeyword("")
        _setSearched(str)
    }, [searched, keyword])
    
    const keywords = React.useMemo(() => [...new Set(flatten(data.map(exhibitor => exhibitor.profile.keywords)))].filter(k => isNaN(k)), [data])

    const value = React.useMemo(() => {

        const filteredByKeyword = keyword? data.filter(exh => "profile" in exh && "keywords" in exh.profile && Array.isArray(exh.profile.keywords) && exh.profile.keywords.includes(keyword)): []

        return {
            data, 
            searched, 
            setSearched, 
            keyword, 
            setKeyword,
            keywords,
            filteredByKeyword
        }
    }, [data, searched, setSearched, keyword, setKeyword, keywords])
    
    return (<ExhbitorsListUpdaterContextContainer.Provider value={value}>{children}</ExhbitorsListUpdaterContextContainer.Provider>)
}


export const ExhibitorsListToolbar = () => {

    const {setSearched, data} = useExhibitorsListUpdaterContext()

    if(isEmpty(data)){
        return null
    }

    return (<Box mb={2}><ToolBar data={data} indexes={[
        ["profile", "name"],
        ["slug"],
    ]} buttons={<Keywords/>} onSearch={setSearched}  /></Box>)

}

const FilteredBookingMap = ({setting="bookingmap"}) => {

    const {searched, keyword, filteredByKeyword} = useExhibitorsListUpdaterContext()

    const marked = findBoothsId(keyword? filteredByKeyword: searched)

    return (<Bookingmap setting={setting} booth={BoothVisitor} marked={marked} />)
}


const Keywords = () => {
    const {keywords, keyword, setKeyword} = useExhibitorsListUpdaterContext()
    const [translate] = useTranslate()
    const handleSetKeyword = (name) => () => {
        if(keyword == name){
            setKeyword("")
        }else{
            setKeyword(name)
        }
    }
    return (<Box m={1}>{keywords.map(name => {
        if(!name){
            return null
        }

        return <Button key={name} onClick={handleSetKeyword(name)} color={name === keyword? "primary": "secondary"} variant={name === keyword? "outlined": "text"}>{translate(`common.tags.${name}`)}</Button>
    })}</Box>)
}


const WidgetExhibitorsWithSearch = ({setting="bookingmap"}) => {
    
    
    return (<Wrapper label="exhibitors.map.search" secondaryLabel={null}>
    <ExhbitorsListUpdaterContextProvider>
    <ExhibitorsListToolbar  /> 
    <Box><FilteredBookingMap setting={setting} /></Box>
    </ExhbitorsListUpdaterContextProvider>
    </Wrapper>)

}

export default WidgetExhibitorsWithSearch


