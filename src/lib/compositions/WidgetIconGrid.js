import React from 'react';

import GridBenefits from '../components/GridBenefits'
import Wrapper from '../components/Wrapper'
import {useSettings} from '../helpers'

const defaultProps = {
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

const WidgetIconGrid = ({setting, ...props}) => {

    const settings = useSettings(setting)
    const {wrapperProps, icons} = Object.assign({}, defaultProps, settings, props)
    return (<Wrapper {...wrapperProps}><GridBenefits icons={icons} setting={setting} /></Wrapper>)

}



export default WidgetIconGrid
