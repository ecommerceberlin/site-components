
import React from 'react';

import Exhibitors from '../datasources/Exhibitors'
import Avatarlist from '../components/Avatarlist'
import KeywordSelect from '../components/KeywordSelect'
import {Centered} from '../components/MyLayouts'
import Wrapper from '../components/Wrapper'
import CompanyLocationMap from '../components/CompanyLocationMap'
import Bookingmap from '../components/Bookingmap/Bookingmap'

const WidgetExhibitorsByKeyword = ({keyword, ...rest}) => (

    <Wrapper {...rest}>

    <Exhibitors keyword={keyword} sort={['profile.name']} limit={1000} mobile={false}>
      {
        (all, keywords, filtered) =>

        <React.Fragment>

        <Centered>
          <KeywordSelect keywords={keywords} selected={keyword} />
        </Centered>

        <Avatarlist data={filtered} />

        <CompanyLocationMap data={filtered}>{
          (selected) =>  <div style={{marginTop: 30}}><Bookingmap selected={selected} /></div>
        }</CompanyLocationMap>

        </React.Fragment>

      }
    </Exhibitors>

  </Wrapper>

)

WidgetExhibitorsByKeyword.defaultProps = {
    label : "exhibitors.list_by_keyword",
    first : true
}

export default WidgetExhibitorsByKeyword

       