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
  justifyContent : "space-between",
  spacing : 7
};

export default Avatarlist
