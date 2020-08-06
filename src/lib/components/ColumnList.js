import React from 'react';
import _get from 'lodash/get';
import Grid from '@material-ui/core/Grid';
import ColumnlistItem from './ColumnlistItem'
import Highlight from './Highlight'


const ColumnList = ({data, offers, path}) => (

  <Grid container spacing={7}>
    {data.map((chunk, i) => (
      <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={3}>
        {chunk && Array.isArray(chunk) ? chunk.map((company) => (

        <ColumnlistItem 
          key={company.id} 
          id={company.id} 
          path={path}
          slug={_get(company, "slug")} 
          name={_get(company, 'profile.name')} 
          highlighted={offers && _get(company, "promo", 0) ? <Highlight /> : null} 
        />

        )) : null}
      </Grid>
    ))}
  </Grid>

)

ColumnList.defaultProps = {
  data: [],
  offers : false,
  path: "/exhibitors"
};

export default ColumnList


/**
 *  

 */