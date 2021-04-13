
import isObject from 'lodash/isObject'
/**
 * 
 * https://github.com/vercel/next.js/blob/canary/examples/with-google-tag-manager/lib/gtm.js
*/

export const event = (event) => {

  if(!isObject(event)){
    return false
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event)
  //console.log("datalayer pushed!", event, window.dataLayer)
}


export const pageview = (url) => {
  event({
    event: 'pageview',
    page: url,
  })
}

