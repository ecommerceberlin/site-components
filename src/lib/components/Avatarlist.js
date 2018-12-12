import React from 'react';
import Grid from '@material-ui/core/Grid';
import AvatarlistCell from './AvatarlistCell';


const Avatarlist = ({data, ...gridProps}) => (
<Grid 
  container 
  {...gridProps}
  >
    {data.map((company, i) => (
        <AvatarlistCell key={company.id} id={company.id} company={company} />
    ))}
  </Grid>
)

Avatarlist.defaultProps = {
  data : [],
  justify : "space-between",
  spacing : 24
};

export default Avatarlist
