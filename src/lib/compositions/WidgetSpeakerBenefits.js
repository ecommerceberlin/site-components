import React from 'react';

import GridBenefits from '../components/GridBenefits'
import Wrapper from '../components/Wrapper'
import Settings from '../datasources/Settings'


const WidgetSpeakerBenefits = ({benefits, ...rest}) => (
    <Wrapper {...rest}>
       <Settings name="speakers">{
           ({benefits}) => <GridBenefits baseLabel="presenters.steps" items={benefits} />
       }</Settings>
      
    </Wrapper>
)

WidgetSpeakerBenefits.defaultProps = {
    benefits : []
}

export default WidgetSpeakerBenefits
