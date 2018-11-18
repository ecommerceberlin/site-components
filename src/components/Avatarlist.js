import React from 'react';
import Grid from '@material-ui/core/Grid';
import AvatarlistCell from './AvatarlistCell';


const Avatarlist = ({data}) => (<Grid container spacing={24}>
    {data.map((company, i) => (
        <AvatarlistCell key={company.id} id={company.id} company={company} />
    ))}
  </Grid>
)

Avatarlist.defaultProps = {
  data : []
};

export default Avatarlist
