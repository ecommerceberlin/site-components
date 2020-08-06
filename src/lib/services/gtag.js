
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = url => {
  
  if(typeof window !== "undefined" && window.gtag){
    

    window.gtag('config', process.env.NEXT_PUBLIC_GTM, {
      page_location: url
    });
  }

};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {

  if(typeof window !== "undefined" && window.gtag){
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
  
};
