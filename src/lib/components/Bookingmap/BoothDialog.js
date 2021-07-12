

import React, {useEffect} from 'react';
import BoothDialogTakenHold from './BoothDialogTakenHold';
import BoothDialogTakenSold from './BoothDialogTakenSold';
import BoothDialogAvailable from './BoothDialogAvailable';
import { KeyedFormdataSelector } from '../../redux/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { dialogTitleChange } from '../redux/actions'
import { useTranslate } from '../../i18n' 
import Cart from '../Cart'

/***
 * 
 *   {
 *      boothId: id, 
 *      groupId: g, 
 *      label: ti, 
 *      status, 
 *      styleName: getStylingName(boothStyleMapping, g)
 *   }
 */

const BoothDialog = ({setting, ...boothProps}) => {

    const formdata  = useSelector(KeyedFormdataSelector)
    const dispatch = useDispatch();
    const [translate] = useTranslate()
    const {boothId} = boothProps

    const getStatus = () => boothId in formdata ? formdata[boothId] : {}
    
    const getStatusShort = () => {
        const { purchase } = getStatus();
        if (purchase) {
          return purchase.paid ? 'sold' : 'hold';
        }
        return false;
    }
    const status = getStatusShort()
    
    const getModalTitle = () => {

        switch(status){
            case "hold":
                return translate("event.sales.booths.hold");
            break
            case "sold":
                return translate("event.sales.booths.sold");
            break
            default:
                return translate("event.sales.booths.free");
            break
        }
    }

    useEffect(() => {

        dispatch(dialogTitleChange(getModalTitle()));

    }, [status])

    switch(status){
        case "hold":
        return (<div><Cart /><BoothDialogTakenHold setting={setting} {...boothProps} /></div>)

        case "sold":
        return (<div><Cart /><BoothDialogTakenSold setting={setting} {...boothProps} /></div>)

        default: 
        return (<div><Cart /><BoothDialogAvailable setting={setting} {...boothProps} /></div>)

    }

}


export default BoothDialog