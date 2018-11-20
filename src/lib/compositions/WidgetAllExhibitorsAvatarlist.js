import React from 'react'

import Exhibitors from '../datasources/Exhibitors'

import {
  Avatarlist,
  KeywordSelect,
  Centered,
  MyTypography,
  Wrapper
} from '../components';


const WidgetAllExhibitorsAvatarlist = (props) => (

  <Wrapper {...props}>

  <Exhibitors mobile={false} random={false} sort='profile.name'>{
    (exhibitors, keywords) =>

    <React.Fragment>

      <Centered style={{marginTop: 80}}>

        <MyTypography label="exhibitors.list.filter_title" template="SUBH2CH" />
        <KeywordSelect keywords={keywords} />

      </Centered>

      <Avatarlist data={exhibitors} />

    </React.Fragment>
  }</Exhibitors>

  </Wrapper>

)
export default WidgetAllExhibitorsAvatarlist
