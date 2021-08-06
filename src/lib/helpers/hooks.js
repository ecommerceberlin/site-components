
import React, { useEffect, useState, useCallback } from 'react';
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
import { FilteredDataSelector } from '../redux/selectors'
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



export const useDatasource = (queries = {}, props = {}) => {

    const dispatch = useDispatch();
    const results = useSelector((state) => {
            const dataSet = {};
            Object.keys(queries).forEach(key => {
              dataSet[key] = FilteredDataSelector(state, queries[key])
            })
            return dataSet
          }
    );

    useEffect(()=>{
        Object.values(queries).forEach(query => dispatch(resourceFetchRequest(query)) )
    }, [])

    return results;

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
