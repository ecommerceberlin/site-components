import React from 'react';

import GridBenefits from '../components/GridBenefits'
import Wrapper from '../components/Wrapper'
import Settings from '../datasources/Settings'


const WidgetVisitorBenefits = ({benefits, ...rest}) => (
    <Wrapper {...rest}>
       <Settings>{
           (get) => <GridBenefits baseLabel="visitors.benefits" items={get("visitor.benefits")} />
       }</Settings>
      
    </Wrapper>
)

WidgetVisitorBenefits.defaultProps = {
    benefits : []
}

export default WidgetVisitorBenefits
