import React from 'react';

import GridBenefits from '../components/GridBenefits'
import Wrapper from '../components/Wrapper'
import Settings from '../datasources/Settings'


const WidgetVipVisitorBenefits = ({label, baseLabel, items, ...wrapperOptions}) => (

        <Settings name="vips">{
            ({label, baseLabel, items}) =>  
            
            <Wrapper {...wrapperOptions} label={label} >
                <GridBenefits baseLabel={baseLabel} items={items} />
            </Wrapper>

        }</Settings>
       
   
)

WidgetVipVisitorBenefits.defaultProps = {
    items : [],
    label : "vips.benefits.title",
    baseLabel : "vips.benefits"
}

export default WidgetVipVisitorBenefits
