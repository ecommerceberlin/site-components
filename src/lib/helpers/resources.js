
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
        const value = endpoint.params[key];
        searchParams.set(key, value)
      })

    }else{
      searchParams = new URLSearchParams(endpoint.params)
    }

    //remove null params
    searchParams.forEach((value, key) => {

      let _value;

      try{
         _value =  JSON.parse(value)
      }catch{
         _value = value; //for cases like "xxxx-xxxxx"
      }

      if(_value === null || _value === undefined){
        searchParams.delete(key)
      }
      //convert booleans to numbers
      if(typeof _value === "boolean"){
        searchParams.set(key, +_value)
      }
    })

    if( !searchParams.has("page") && !searchParams.has("id") ){
      searchParams.set("page", 1)
    }

    searchParams.sort()

    return `${endpoint.resource}?${ searchParams.toString() }` 

}