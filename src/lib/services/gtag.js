
/**
 * 
 * https://github.com/vercel/next.js/blob/canary/examples/with-google-tag-manager/lib/gtm.js
*/


export const pageview = (url) => {

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event: 'pageview',
    page: url,
  })

}

export const event = ({action, category, label, value }) => {

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event: action,
    category: category, 
    label: label, 
    label: label
  })
}