
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {resourceFetchSuccess} from '../components/redux/actions'
import {getUserByToken} from './api'
import get from 'lodash/get'

export const useUserData = () => {

    const token = useSelector(state => state.app.token)
    const currentUser = useSelector(state => state.resources.currentUser)
    const settings = useSelector(state => state.settings)
    const dispatch = useDispatch();

    useEffect(()=>{

        const api = get(settings, "system.service_api")

        const fetchTokenAndSetUser = async () => {
            const data = await getUserByToken(api, token)
            dispatch(resourceFetchSuccess("currentUser", data));
        }
        
        if(api && (!currentUser || !("token" in currentUser) || currentUser.token != token)){
            fetchTokenAndSetUser();
        }
      
    }, [token])

    return currentUser;
    
}


