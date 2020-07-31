import React from 'react';

import GridBenefits from '../components/GridBenefits'
import Wrapper from '../components/Wrapper'
import Settings from '../datasources/Settings'


const WidgetVipVisitorBenefits = ({label, baseLabel, items, ...wrapperOptions}) => (

        <Settings>{(get) =>  
            
            <Wrapper {...wrapperOptions} label={ get("vips.label", label) } >
                <GridBenefits baseLabel={ get("vips.baseLabel", baseLabel) } items={ get("vips.items", items) } />
            </Wrapper>

        }</Settings>
       
)

WidgetVipVisitorBenefits.defaultProps = {
    items : [],
    label : "vips.benefits.title",
    baseLabel : "vips.benefits"
}

export default WidgetVipVisitorBenefits
