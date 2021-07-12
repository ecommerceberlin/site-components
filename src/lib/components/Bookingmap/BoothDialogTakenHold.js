import React from 'react';
import BoothDialogContainer from './BoothDialogContainer'
import BoothDialogLegend from './BoothDialogLegend'

const BoothDialogTakenHold = ({setting, ...boothProps}) => (
    <BoothDialogContainer 
    setting={setting}
    header={<BoothDialogLegend setting={setting} />} 
    {...boothProps} />
)

export default BoothDialogTakenHold
