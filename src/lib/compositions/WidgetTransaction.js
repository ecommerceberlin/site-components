import React from 'react'
import Wrapper from '../components/Wrapper'
import {TwoColsLayout as Section} from '../components/MyLayouts'
import Markdown from '../components/Markdown'
import WidgetRegForm from './WidgetRegForm'
import Cart from '../components/Cart'
import { useSettings } from '../helpers'


const defaultProps = {

}

const WidgetTransaction = ({setting="", ...props}) => {

    const settings = useSettings(setting)
    const {wrapperProps, path_to_regform} = Object.assign({}, defaultProps, settings, props)

    return (
    <Wrapper {...wrapperProps}>
    <Section
    left={
        <div>
       <WidgetRegForm setting={path_to_regform} />
       </div>
    }
    right={
        <Cart disabled />
    } />
    </Wrapper>)

}


export default WidgetTransaction