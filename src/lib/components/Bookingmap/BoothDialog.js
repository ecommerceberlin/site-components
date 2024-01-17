
import React, {useEffect} from 'react';
import BoothDialogTakenHold from './BoothDialogTakenHold';
import BoothDialogTakenSold from './BoothDialogTakenSold';
import BoothDialogAvailable from './BoothDialogAvailable';
import BoothDialogTakenBlocked from './BoothDialogTakenBlocked';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { dialogTitleChange, resourceFetchRequest } from '../redux/actions'
import { useTranslate } from '../../i18n' 
import Cart from '../Cart'



import {
    BoothFormdataSelector, 
    BoothSelectedSelector,
    BoothBlockedSelector
  } from './selectors'

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

    const {boothId} = boothProps
    const dispatch = useDispatch();
    const [translate] = useTranslate()
    const {status} = useSelector((state) => BoothFormdataSelector(state, boothId), shallowEqual)
    const selected = useSelector(state => BoothSelectedSelector(state, boothId))
    const available = useSelector(state => BoothBlockedSelector(state, boothId))
    
    const getModalTitle = () => {
        //blocked by current user or other user
        if(available===false){
            return translate("event.sales.booths.blocked");
        }
        if(status == "hold"){
            return translate("event.sales.booths.hold");
        }
        if(status == "sold"){
            return translate("event.sales.booths.sold");
        }
        return translate("event.sales.booths.free");
    }

    useEffect(() => dispatch(dialogTitleChange(getModalTitle())), [available, status])

    if(available === false){
        return (<div><Cart embedded /><BoothDialogTakenBlocked setting={setting} {...boothProps} /></div>)
    }
    if(status == "hold"){
        return (<div><Cart embedded /><BoothDialogTakenHold setting={setting} {...boothProps} /></div>)
    }

    if(status == "sold"){
        return (<div><Cart embedded /><BoothDialogTakenSold setting={setting} {...boothProps} /></div>)
    }

    return (<div><Cart embedded /><BoothDialogAvailable setting={setting} {...boothProps} /></div>)


}


export default BoothDialog