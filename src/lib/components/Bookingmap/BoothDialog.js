
import React, {useEffect} from 'react';
import BoothDialogTakenHold from './BoothDialogTakenHold';
import BoothDialogTakenSold from './BoothDialogTakenSold';
import BoothDialogAvailable from './BoothDialogAvailable';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { dialogTitleChange, resourceFetchRequest } from '../redux/actions'
import { useTranslate } from '../../i18n' 
import Cart from '../Cart'
import Pusher from "pusher-js";


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
    const {status, name, image} = useSelector((state) => BoothFormdataSelector(state, boothId), shallowEqual)
    const selected = useSelector(state => BoothSelectedSelector(state, boothId))
    const blocked = useSelector(state => BoothBlockedSelector(state, boothId))


    useEffect(() => {
        const pusher = new Pusher("ef91111f814df12adcef", {
          cluster: "eu",
        });
    
        var channel = pusher.subscribe('eventjuicer');
        channel.bind('NewLockWasCreated', function(data) {
        //   alert(JSON.stringify(data));
            dispatch(resourceFetchRequest(["formdata", "blockings"]))
        });
    
        return () => {
          pusher.unsubscribe("eventjuicer");
        };
    }, []);

    
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
        return (<div><Cart embedded /><BoothDialogTakenHold setting={setting} {...boothProps} /></div>)

        case "sold":
        return (<div><Cart embedded /><BoothDialogTakenSold setting={setting} {...boothProps} /></div>)

        default: 
        return (<div><Cart embedded /><BoothDialogAvailable setting={setting} {...boothProps} /></div>)

    }

}


export default BoothDialog