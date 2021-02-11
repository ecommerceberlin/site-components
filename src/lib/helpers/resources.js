
import get from 'lodash/get';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';

export const tagsUsed = (data, source) => [...new Set(data.map(c => get(c, source)).flat())].filter(item=>item); 

export const resourceToUrl = (endpoint) => {

    
    //this is in order to properly sort params...
    if(isString(endpoint) && endpoint.indexOf("?")>0){
        const parts = endpoint.split("?")
        endpoint = {
          resource: parts[0],
          params: parts[1]
        }

    }

    if( isObject(endpoint) && "resource" in endpoint && "params" in endpoint ){
        let searchParams;

        if( isObject(endpoint.params) ){
          //object
          searchParams = new URLSearchParams()

          Object.keys(endpoint.params).forEach(key => {
            searchParams.set(key, endpoint.params[key])
          })

        }else{
          searchParams = new URLSearchParams(endpoint.params)
        }

        searchParams.sort()
        return `${endpoint.resource}?${ searchParams.toString() }` 
     }
    
    return endpoint;

}