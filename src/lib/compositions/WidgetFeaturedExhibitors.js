import React from 'react'

import Exhibitors from '../datasources/Exhibitors'
import Avatarlist from '../components/Avatarlist'
import Wrapper from '../components/Wrapper'


const WidgetFeaturedExhibitors = ({filter, limit, mobile, center, ...wrapper}) => (

  <Wrapper {...wrapper}>
  
  <Exhibitors 
    filter={filter} 
    limit={limit}
    mobile={mobile} 
    sort={['profile.name']}
  >
    {(exhibitors, keywords) => <Avatarlist 
      data={exhibitors}  
      justify={center ? 'center' : 'flex-start'}
    />}
  
  </Exhibitors>
  </Wrapper>

)

WidgetFeaturedExhibitors.defaultProps = {
  label : "exhibitors.list_featured",
  secondaryLabel : null,
  filter : function(item){ return item.featured; },
  limit : 20,
  mobile : 12,
  center : false
}


export default WidgetFeaturedExhibitors
