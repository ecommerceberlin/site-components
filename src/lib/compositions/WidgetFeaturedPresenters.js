
import React from 'react';
import WidgetPresenters from './WidgetPresenters';

const WidgetFeaturedPresenters = (props) => (

  <WidgetPresenters {...props} />

)

WidgetFeaturedPresenters.defaultProps = {

  filter: function(item) {
      return  (
        "avatar" in item 
        && item.avatar.indexOf("http") > -1
        && "logotype" in item
        && item.logotype.indexOf("http") > -1
        //&& item.bio.length > 20
        && item.featured > 0
      )
      
  },

  bio : false,
  limit : 16,
  link: true
}

export default WidgetFeaturedPresenters;
