import React from 'react'

import Exhibitors from '../datasources/Exhibitors'
import Avatarlist from '../components/Avatarlist'
import Wrapper from '../components/Wrapper'


const WidgetFeaturedExhibitors = (props) => (

  <Wrapper {...props}>
  <Exhibitors filter={(e) => e.featured} limit="20" mobile="12" sort={['profile.name']}>{
    (exhibitors, keywords) =>

    <React.Fragment>
      <Avatarlist data={exhibitors}  />

      {/* <Centered style={{marginTop: 80}}>

        <MyTypography label="exhibitors.list.filter_title" template="SUBH2CH" />
        <KeywordSelect keywords={keywords} />

      </Centered> */}

    </React.Fragment>
  }</Exhibitors>
  </Wrapper>

)

WidgetFeaturedExhibitors.defaultProps = {
  label : "exhibitors.list_featured"
}


export default WidgetFeaturedExhibitors
