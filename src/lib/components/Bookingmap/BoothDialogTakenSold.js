import React from 'react';
import BoothDialogContainer from './BoothDialogContainer'
import BookingmapLegend from './BookingmapLegend'
// import {getCompanyProfileInfo, getCompanyName} from '../../helpers'
import { KeyedFormdataSelector } from '../../redux/selectors'
import { useSelector } from 'react-redux'
import BoothDialogTakenSoldContent from './BoothDialogTakenSoldContent'

/**
 * 
 * 
company: {id: 1406, slug: "easystorageio", featured: 0, debut: 0, promo: 0, …}
id: "booth-78-338"
participant_id: 105974
purchase: {id: 109364, paid: 1, status: "ok", status_source: "manual", created_at: "2019-12-04 12:21:50", …}
ti: "D4.4"
ticket_id: 1734

*/

const BoothDialogTakenSold = ({setting="", ...boothProps}) => {

    const formdata  = useSelector(KeyedFormdataSelector)
    const {boothId} = boothProps

    const getCompany = () => {

      if(!boothId || !formdata){
        return {}
      }

      if(!(boothId in formdata)){
        return {}
      }

      if(!("company" in formdata[boothId])){
        return {}
      }

      return formdata[boothId]["company"]

    }

    return (<BoothDialogContainer 
        setting={ setting }
        header={ <BookingmapLegend setting={setting} /> }
        content={
          <BoothDialogTakenSoldContent setting={setting} company={ getCompany() }/>
        }
        {...boothProps} 
    />);
}


export default BoothDialogTakenSold
