
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {resourceFetchSuccess, setUserToken, removeUserToken} from '../components/redux/actions'
import {getUserByToken} from './api'
import get from 'lodash/get'
import { useRouter } from 'next/router'

export const useSettings = (_path = null, _fallback = undefined) => {

    const settings = useSelector(state => state.settings)

    const func = (path, fallback = undefined) => {

        const out = get(settings, path, undefined)

        if(out !== undefined){
            return out
        }

        if(fallback !== undefined){
            return fallback
        }

        return path
    }
    
    return _path? func(_path, _fallback): func;
}

export const useUserData = () => {

    const [updates, setUpdates] = useState(0);
    const token = useSelector(state => state.app.token)
    const currentUser = useSelector(state => state.resources.currentUser)
    const transactions = useSelector(state => state.transactions.forms)

    const filteredTransactions = transactions.filter(item => item.action == "profile_updated")
    const settings = useSelector(state => state.settings)
    const dispatch = useDispatch();

    useEffect(()=>{

        const api = get(settings, "system.service_api")

        const fetchTokenAndSetUser = async () => {
            const data = await getUserByToken(api, token)
            dispatch(resourceFetchSuccess("currentUser", data));
        }
        
        if(api &&  (!currentUser || !("token" in currentUser) || currentUser.token != token)){
            fetchTokenAndSetUser();
            //setUpdates(updates+1);
        }
      
    }, [token, filteredTransactions])

    return currentUser;
    
}

export const useUserLogout = () => {

    const dispatch = useDispatch(); 

    const handleLogout = useCallback(() => {
        dispatch(removeUserToken())
        dispatch(resourceFetchSuccess("currentUser", null));
    })

    return handleLogout
}

export const useToken = (token, target = "/account") => {

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(()=>{
    
        if(token){
            dispatch(setUserToken(token))
            router.push(target)
        }
    })
}
