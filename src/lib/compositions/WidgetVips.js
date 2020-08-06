import React from 'react'

import Vips from '../datasources/Vips'
import Avatarlist from '../components/Avatarlist'
import Wrapper from '../components/Wrapper'
import Grid from '@material-ui/core/Grid';
import AvatarlistCellDumb from '../components/AvatarlistCellDumb'

const WidgetVips = ({filter, include, limit, mobile, center, spacing, ...wrapper}) => (

  <Wrapper {...wrapper}>
  
  <Vips 
    filter={filter} 
    limit={limit}
    mobile={mobile} 
    //sort={['profile.name']}
  >
    {(visitors) =>
    
    <Grid 
    container 
    justify={center ? 'center' : 'flex-start'}
    spacing={spacing}
    >
    {visitors.map((visitor) => (
        <AvatarlistCellDumb key={visitor.id} source={visitor} />
    ))}
    </Grid>
    }
  
  </Vips>
  </Wrapper>

)

WidgetVips.defaultProps = {
  label : "visitors.list_featured",
  secondaryLabel : null,
  filter : function(item){ return item.logotype.indexOf("cloudinary") > -1; },
  limit : 20,
  mobile : 12,
  center : false,
  spacing : 5,
  include : null
}


export default WidgetVips
