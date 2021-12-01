
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
    resourceFetchRequest, 
    resourceFetchSuccess, 
    setUserToken, 
    removeUserToken, 
    dialogShow, 
    uuidSet,
    lockSuccess,
    lockFailed
} from '../components/redux/actions'
import {getUserByToken} from './api'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { useRouter } from 'next/router'
import { FilteredDataSelector, SingleRecordSelector } from '../redux/selectors'
import {useTranslate} from '../i18n'
import Hashes from 'jshashes'
import { v4 as uuidv4 } from 'uuid';


export const useDialog = () => {
    const [translate] = useTranslate();
    const dispatch = useDispatch();
    return useCallback(({label, content, buttons})=> dispatch(dialogShow({
        title: translate(label),
        content: content,
        buttons: buttons
    })))
}


export const sha1 = (str) => (new Hashes.SHA1).hex(str)

export const uuidCreate = () => uuidv4()

export const useBlocking =  () => {

    const dispatch = useDispatch()
    const {post_api} = useSettings("system")
    const uuid = useSelector(state => state.app.uuid)

    useEffect(()=>{
        if(!uuid){
            dispatch(uuidSet(uuidCreate()))
        }
    }, [])
 
    return useCallback(async (ticket_id, quantity, formdata) => {

        const query = await fetch(post_api.replace("register", "lock"), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( {uuid, cart: {
            [ticket_id]: {
                quantity,
                formdata
            }    
            }} )
        })
        if(query.ok && query.status >= 200){
            const {data, failed} = await query.json()
            
            if(isEmpty(failed)){
                dispatch(lockSuccess(data))
                return true
            }else{
                dispatch(lockFailed(data, failed))
                return false
            }
        }
        return null

    })
}

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

export const useDatasource = (query) => {

    const {params} = query;
    const dispatch = useDispatch();
    const results = useSelector((state) => FilteredDataSelector(state, query))
    /**
     * run only once per set of params
     */
    useEffect(() => dispatch(resourceFetchRequest(query)), [JSON.stringify(params)])

    return results;
}

export const useRecord = (endpoint, id) => {

    const dispatch = useDispatch();
    const results = useSelector((state) => SingleRecordSelector(state, {
        endpoint, id
    }))

    useEffect(() => dispatch(resourceFetchRequest(`${endpoint}/${id}`)), [endpoint, id])

    return results
}


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

export const useSavedToken = () => {

    const token = useSelector(state => state.app.token)

    return token

}

export const useTransactions = (type = "profile_updated") => {
    const transactions = useSelector(state => state.transactions.forms)
    return Array.isArray(transactions) ? transactions.filter(item => item.action == type) : []
}

export const useUserData = (doFetch = true) => {

   // const [updates, setUpdates] = useState(0);
    const token = useSelector(state => state.app.token)
    const currentUser = useSelector(state => state.resources.currentUser)
    const {service_api} = useSettings("system", {})
    const transactions = useTransactions("profile_updated");

    const dispatch = useDispatch();

    useEffect(()=>{

        const fetchTokenAndSetUser = async () => {
            const data = await getUserByToken(service_api, token)
            dispatch(resourceFetchSuccess("currentUser", data));
        }
        
        if(service_api &&  (!currentUser || !("token" in currentUser) || currentUser.token != token)){
            fetchTokenAndSetUser();
            //setUpdates(updates+1);
        }
      
    }, [token, transactions])

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
