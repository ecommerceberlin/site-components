import React from 'react'
import Wrapper from '../components/Wrapper'
import {TwoColsLayout as Section} from '../components/MyLayouts'
import Markdown from '../components/Markdown'
import WidgetRegForm from './WidgetRegForm'
import Cart from '../components/Cart'
import { useSettings } from '../helpers'
import { getCart } from '../redux/selectors'
import  { useSelector } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

const defaultProps = {

}

const WidgetTransaction = ({setting="", ...props}) => {

    const cart = useSelector(getCart)
    const settings = useSettings(setting)
    const {wrapperProps, path_to_regform} = Object.assign({}, defaultProps, settings, props)

    // if(isEmpty(cart)){
    //     return (<Wrapper label="ecommerce.cart.empty" />)
    // }

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