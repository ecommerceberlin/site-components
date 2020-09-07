import React from 'react';

import GridBenefits from '../components/GridBenefits'
import Wrapper from '../components/Wrapper'
import Settings from '../datasources/Settings'


const WidgetIconGrid = ({setting, defaultTypography, defaultSecondaryTypography, defaultDense, icons}) => (
  
       <Settings>{ (get) => {

            const {label, secondaryLabel, typography, secondaryTypography, dense, ...rest} = get(setting, {})

            return (<Wrapper label={label} secondaryLabel={secondaryLabel} typography={typography || defaultTypography} dense={dense || defaultDense}  secondaryTypography={secondaryTypography || defaultSecondaryTypography}>
                <GridBenefits {...rest} icons={icons} />
                </Wrapper>)
           }
           
       }</Settings>
      

)

WidgetIconGrid.defaultProps = {
    setting: "speakers.benefits",
    icons: {},
    defaultTypography: "H2C",
    defaultSecondaryTypography: 'SUBH2',
    defaultDense: false
}

export default WidgetIconGrid
