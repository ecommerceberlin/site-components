import React from 'react';

import GridBenefits from '../components/GridBenefits'
import Wrapper from '../components/Wrapper'
import Settings from '../datasources/Settings'


const WidgetSpeakerBenefits = ({benefits, ...rest}) => (
    <Wrapper {...rest}>
       <Settings>{
           (get) => <GridBenefits baseLabel="presenters.steps" items={ get("speakers.benefits", benefits) } />
       }</Settings>
      
    </Wrapper>
)

WidgetSpeakerBenefits.defaultProps = {
    benefits : []
}

export default WidgetSpeakerBenefits
