import React from 'react'
import Wrapper from '../components/Wrapper'
import {TwoColsLayout as Section} from '../components/MyLayouts'
import Markdown from '../components/Markdown'
import WidgetRegForm from './WidgetRegForm'
import Cart from '../components/Cart'

const WidgetTransaction = ({setting}) => {


    return (
    <Wrapper label="exhibitors.agreement.title">
    <Section
    left={
        <div>
        {/* <Markdown>{
        `# asdasd
        
        lklklk
        
        lklklklk`
        }</Markdown> */}
       <WidgetRegForm setting={setting} />
       </div>
    }
    right={
        <Cart disabled />
     
    } />
    </Wrapper>)

}


export default WidgetTransaction