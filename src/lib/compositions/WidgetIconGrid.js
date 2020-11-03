import React from 'react';

import GridBenefits from '../components/GridBenefits'
import Wrapper from '../components/Wrapper'
import Settings from '../datasources/Settings'


const WidgetIconGrid = ({setting, icons, defaults, ...passedProps}) => (
  
       <Settings>{ (get) => {

            const merged = {...defaults, ... get(setting, {}), ...passedProps};
            const {iconColor, iconSize, items, baseLabel, ...wrapperProps} = merged

            return (<Wrapper {...wrapperProps}>
                <GridBenefits icons={icons} items={items} baseLabel={baseLabel} iconColor={iconColor} iconSize={iconSize} />
                </Wrapper>)
           }
           
       }</Settings>
      

)

WidgetIconGrid.defaultProps = {
    setting: "speakers.benefits",
    icons: {},
    defaults: {
        typography: "H2C",
        secondaryTypography: 'SUBH2',
        dense: false,
        iconColor: "red",
        iconSize: 50,
        first: false
    }
}

export default WidgetIconGrid
