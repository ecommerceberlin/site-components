import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { resourceFetchRequest, resourceFetchSuccess } from '../redux/actions';
import { getCart } from '../../redux/selectors'
import Pusher from "pusher-js";



const CartSync = ({autorefresh = 30}) => {

    const dispatch = useDispatch()
    const cart = useSelector(getCart)



    // useEffect(() => {

    //     if(!interacted && !cartItems){
    //         return;
    //     }

    //     const pusher = new Pusher("ef91111f814df12adcef", {
    //       cluster: "eu",
    //     });
    //     var channel = pusher.subscribe('eventjuicer');
    //     channel.bind('NewLockWasCreated', function({data}){
    //         dispatch(resourceFetchSuccess("blockings", data))
    //         // dispatch(resourceFetchRequest(["formdata"]))
    //     });
    //     return () => {
    //       pusher.unsubscribe("eventjuicer");
    //     };
    // }, [interacted, cartItems]);

    // useEffect(() => {

    //     if(!interacted && !cartItems){
    //         return;
    //     }

    //     const interval = setInterval(() => {
    //       dispatch(resourceFetchRequest(["formdata", "blockings"]))
    //     }, autorefresh * 1000);
    //     return () => clearInterval(interval);
    // }, [interacted, cartItems]);


    return null
}

export default CartSync;
