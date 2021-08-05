import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { resourceFetchRequest, resourceFetchSuccess } from '../redux/actions';
import { getTransactions, CartItemsSelector } from '../../redux/selectors'
import Pusher from "pusher-js";



const BookingmapDataUpdater = ({autorefresh = 60}) => {

    const dispatch = useDispatch()
    const {interacted} = useSelector((state) => getTransactions(state))
    const cartItems = useSelector(CartItemsSelector)

    console.log(cartItems)

    if(interacted && interacted.includes("bookinmap")){
    //
    }

    useEffect(() => {
        const pusher = new Pusher("ef91111f814df12adcef", {
          cluster: "eu",
        });
        var channel = pusher.subscribe('eventjuicer');
        channel.bind('NewLockWasCreated', function({data}){
            dispatch(resourceFetchSuccess("blockings", data))
            dispatch(resourceFetchRequest(["formdata"]))
        });
        return () => {
          pusher.unsubscribe("eventjuicer");
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
          dispatch(resourceFetchRequest(["formdata", "blockings"]))
        }, autorefresh * 1000);
        return () => clearInterval(interval);
    }, []);


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       dispatch(resourceFetchRequest(["formdata", "blockings"]))
    //     }, * 1000);
    //     return () => clearInterval(interval);
    // }, [ cartItems > 0 ]);


    return null
}

export default BookingmapDataUpdater;
