import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {setSettings} from '../settings/redux/actions'

const ExternalSettings = ({urls}) => {

    const dispatch = useDispatch()

    useEffect(() => {
      /***
       * `/api/proxy?url=${ encodeURIComponent(url) }` 
       */
      if(urls && Array.isArray(urls)){
          Promise.allSettled(urls.map(url => fetch(url).then(response => response.json()))).then(data => {
              const obj = {}
              data.forEach((p, i)=> {
                if(p.status == "fulfilled"){
                  obj[urls[i]] = p.value
                }
              })
              dispatch(setSettings(obj))
          })
      }
        
    }, [JSON.stringify(urls)])

   return null

}

export default ExternalSettings