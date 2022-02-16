import React from 'react'

import Partners from '../datasources/Partners'
import Grid from '@material-ui/core/Grid';
import Wrapper from '../components/Wrapper'
import AvatarlistCellExternal from '../components/AvatarlistCellExternal'
import {Centered} from '../components/MyLayouts'

const WidgetPartners = ({filter, limit, mobile, center, spacing, placeholder, ...wrapper}) => (

  <Wrapper {...wrapper}>
  
  <Partners 
    filter={filter} 
    limit={limit}
    mobile={mobile}
  >
    {(partners) =>  {

      if(!partners || !partners.length){
        return (<Centered>{placeholder}</Centered>)
      }

      return (<Grid 
      container 
      justifyContent={center ? 'center' : 'flex-start'}
      spacing={spacing}
      >
      {partners.map((partner) => (
        <AvatarlistCellExternal key={partner.id} source={partner} link="website" />
      ))}
      </Grid>)

    }}
  
  </Partners>
  </Wrapper>

)

WidgetPartners.defaultProps = {
  label : "partners.media.title",
  secondaryLabel : null,
  filter : function(item){ return true; },
  limit : 50,
  mobile : 12,
  center : false,
  spacing : 5,
  placeholder: null
}


export default WidgetPartners
