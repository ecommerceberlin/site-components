import React from 'react';
import BoothDialogContainer from './BoothDialogContainer'
import BookingmapLegend from './BookingmapLegend'

const BoothDialogTakenHold = ({setting, ...boothProps}) => (
    <BoothDialogContainer 
    setting={setting}
    header={<BookingmapLegend setting={setting} />} 
    {...boothProps} />
)

export default BoothDialogTakenHold
