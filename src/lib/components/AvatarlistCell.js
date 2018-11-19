import React from 'react';
import Grid from '@material-ui/core/Grid';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import SubPageLink from './SubPageLink';
import { getCompanyLogotype, getCompanyName } from '../helpers';

const AvatarlistCell = ({company}) => (  <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
  <h3>
    <SubPageLink
      subpage="company"
       name={getCompanyName(company)}
       id={company.id}
       src={getCompanyLogotype(company)}
    />
  </h3>
  </Grid>
)



export default onlyUpdateForKeys(["id"])(AvatarlistCell)
