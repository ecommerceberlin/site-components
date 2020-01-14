import React from 'react';

import GridBenefits from '../components/GridBenefits'
import Wrapper from '../components/Wrapper'
import Settings from '../datasources/Settings'



const WidgetExhibitorBenefits = ({benefits, ...rest}) => (
    <Wrapper {...rest}>
     <Settings name="exhibitors">{
         ({benefits}) =>   <GridBenefits baseLabel="exhibitors.benefits" items={benefits} />
     }</Settings>
      
    </Wrapper>
)

WidgetExhibitorBenefits.defaultProps = {
    benefits : []
}

export default WidgetExhibitorBenefits
