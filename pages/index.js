import React from 'react'
  
import {connect} from 'react-redux'
import {configure} from '../src/lib/next'
import {reduxWrapper} from '../src/lib/redux'
import {
    WidgetSalesMap,
    WidgetIconGrid,
    WidgetVideoWithEventInfo,
    //WidgetAllExhibitorsAvatarlist,
    WidgetFeaturedCompanies,
    WidgetAllExhibitorsColumnList,
    WidgetFaq
} from '../src/lib/compositions'

import settings from '../settings'
  
  const Test = () => (
  
   <>

    <WidgetVideoWithEventInfo setting="heroExpo" />

    <WidgetSalesMap
      label="exhibitors.map.title"
      secondaryLabel="exhibitors.map.opensales"
    />

    <WidgetFeaturedCompanies />

    <WidgetIconGrid setting="exhibitors.benefits" />
  
    <WidgetFaq setting="exhibitors.faq" /> 

    {/* <WidgetAllExhibitorsAvatarlist label="exhibitors.list_full" /> */}
  
    <WidgetAllExhibitorsColumnList />
  
  </>
  
  )
  
  export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {
  
    return await configure(props, {
     settings : settings,
     preload : ['exhibitors', 'allexhibitors']
    })
  
  })
  
  export default connect()(Test);
