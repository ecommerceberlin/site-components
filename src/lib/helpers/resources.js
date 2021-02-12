
import get from 'lodash/get';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';

export const tagsUsed = (data, source) => [...new Set(data.map(c => get(c, source)).flat())].filter(item=>item); 

export const resourceToUrl = (endpoint) => {

    //this is in order to properly sort params...
    if(isString(endpoint)){
        const parts = endpoint.split("?")
        endpoint = {
          resource: parts[0],
          params: typeof parts[1] === "undefined"? "": parts[1]
        }
    }

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

    //remove null params
    searchParams.forEach((value, key) => {
      if(value === null || value === undefined){
        searchParams.delete(key)
      }
      if(typeof value === "boolean"){
        searchParams.set(key, +value)
      }
    })

    if( !searchParams.has("page") && !searchParams.has("id") ){
      searchParams.set("page", 1)
    }

    searchParams.sort()

    return `${endpoint.resource}?${ searchParams.toString() }` 

}