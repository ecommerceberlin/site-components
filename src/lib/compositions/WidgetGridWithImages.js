import React from 'react'
import GridWithImages from '../components/GridWithImages'
import Settings from '../datasources/Settings'
import Wrapper from '../components/Wrapper'

const WidgetGridWithImages = ({setting}) => {

 return (<Settings>{(get) => {
    const {wrapperProps, ...rest} = get(setting);

    if(!wrapperProps){
        return (<GridWithImages {...rest} />)
    }

    return ( <Wrapper {...wrapperProps}><GridWithImages {...rest} /></Wrapper>)

 }}</Settings>)

}


export default WidgetGridWithImages;