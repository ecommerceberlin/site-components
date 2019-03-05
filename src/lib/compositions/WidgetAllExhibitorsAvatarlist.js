import React from 'react'

import AllExhibitors from '../datasources/AllExhibitors'

import {
  Avatarlist,
  // KeywordSelect,
  // Centered,
  // MyTypography,
  Wrapper
} from '../components';


const WidgetAllExhibitorsAvatarlist = ({filter, ...wrapperProps}) => (

  <Wrapper {...wrapperProps}>

  <AllExhibitors mobile={false} random={false} sort='profile.name' filter={filter}>{

    (exhibitors) =>   <Avatarlist data={exhibitors} />

  }</AllExhibitors>

  </Wrapper>

)

WidgetAllExhibitorsAvatarlist.defaultProps = {
  filter : function(item){ return "name" in item.profile && item.profile.name }
}

export default WidgetAllExhibitorsAvatarlist
