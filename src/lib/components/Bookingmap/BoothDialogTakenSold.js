import React from 'react';
import BoothDialogContainer from './BoothDialogContainer'
import BookingmapLegend from './BookingmapLegend'
// import {getCompanyProfileInfo, getCompanyName} from '../../helpers'
import BoothDialogTakenSoldContent from './BoothDialogTakenSoldContent'

/**
 * 
 * 
id: "booth-78-338"
participant_id: 105974
purchase: {id: 109364, paid: 1, status: "ok", status_source: "manual", created_at: "2019-12-04 12:21:50", …}
ti: "D4.4"
ticket_id: 1734

*/

const BoothDialogTakenSold = ({setting="", ...boothProps}) => {

    const {boothId} = boothProps

    return (<BoothDialogContainer 
        setting={ setting }
        header={ <BookingmapLegend setting={setting} /> }
        content={
          <BoothDialogTakenSoldContent setting={setting} boothId={boothId} />
        }
        {...boothProps} 
    />);
}


export default BoothDialogTakenSold
