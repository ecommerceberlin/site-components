
import React from 'react';

import AllExhibitors from '../datasources/AllExhibitors'
import ColumnList from '../components/ColumnList'
import Wrapper from '../components/Wrapper'
 

const WidgetAllExhibitorsColumnList = ({filter, ...wrapperProps}) => (

    <Wrapper label="exhibitors.list_full" color="#ffffff" {...wrapperProps}>

    <AllExhibitors columns={true} filter={filter} sort='profile.name'>

      {(exhibitors) => <ColumnList data={exhibitors} />  
    }

    </AllExhibitors>

    </Wrapper>

)

WidgetAllExhibitorsColumnList.defaultProps = {
  filter : function(item){ return "name" in item.profile && item.profile.name }
}

export default WidgetAllExhibitorsColumnList