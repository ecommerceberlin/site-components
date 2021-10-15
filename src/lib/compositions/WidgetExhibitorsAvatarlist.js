import React from 'react'

import {useDatasource, useSettings} from '../helpers'

import {
  Avatarlist,
  KeywordSelect,
  Centered,
  MyTypography,
  Wrapper
} from '../components';

const defaultProps={

  wrapperProps: {
    label: "exhibitors.list_current"
  }
}

const WidgetExhibitorsAvatarlist = ({setting, ...props}) => {

  const settings = useSettings(setting)
  const {wrapperProps} = Object.assign({}, defaultProps, settings, props)
  const data = useDatasource({resource: "exhibitors2", filters: {
    sort: "profile.name"
  }})

  if(!data){
    return null
  }

  return (

    <Wrapper {...wrapperProps}>
     <Avatarlist data={data} />
    </Wrapper>
  
  )

} 
export default WidgetExhibitorsAvatarlist
