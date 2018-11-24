
import React from 'react';

import Exhibitors from '../datasources/Exhibitors'
import ColumnList from '../components/ColumnList'
import KeywordSelect from '../components/KeywordSelect'
import {Centered} from '../components/MyLayouts'
import MyTypography from '../components/MyTypography'
import Wrapper from '../components/Wrapper'
 

const WidgetAllExhibitorsColumnList = (props) => (

    <Wrapper label="exhibitors.list_full" color="#ffffff" {...props}>

    <Exhibitors columns={true} sort='profile.name'>
      {(exhibitors, keywords) => 
        
    <React.Fragment>

    <Centered style={{marginTop: 80}}>

      <MyTypography label="exhibitors.list.filter_title" template="SUBH2CH" />
      <KeywordSelect keywords={keywords} />

    </Centered>

    <ColumnList data={exhibitors} />

    </React.Fragment>
      
       }
    </Exhibitors>

    </Wrapper>


)

WidgetAllExhibitorsColumnList.defaultProps = {


}

export default WidgetAllExhibitorsColumnList
