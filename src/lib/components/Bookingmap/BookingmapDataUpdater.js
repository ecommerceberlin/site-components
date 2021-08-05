import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { resourceFetchRequest, resourceFetchSuccess } from '../redux/actions';
import { UserInteractedWith, CartItemsSelector } from '../../redux/selectors'
import Pusher from "pusher-js";



const BookingmapDataUpdater = ({autorefresh = 30}) => {

    const dispatch = useDispatch()
    const interacted = useSelector((state) => UserInteractedWith(state, "bookingmap"))
    const cartItems = useSelector(CartItemsSelector)


    useEffect(() => {

        if(!interacted){
            return;
        }

        const pusher = new Pusher("ef91111f814df12adcef", {
          cluster: "eu",
        });
        var channel = pusher.subscribe('eventjuicer');
        channel.bind('NewLockWasCreated', function({data}){
            dispatch(resourceFetchSuccess("blockings", data))
            // dispatch(resourceFetchRequest(["formdata"]))
        });
        return () => {
          pusher.unsubscribe("eventjuicer");
        };
    }, [interacted]);

    useEffect(() => {

        if(!interacted){
            return;
        }

        const interval = setInterval(() => {
          dispatch(resourceFetchRequest(["formdata", "blockings"]))
        }, autorefresh * 1000);
        return () => clearInterval(interval);
    }, [interacted]);


    return null
}

export default BookingmapDataUpdater;
