import React from 'react';
import _get from 'lodash/get';
import Grid from '@material-ui/core/Grid';
import ColumnlistItem from './ColumnlistItem'
import Highlight from './Highlight'


const ColumnList = ({data}) => (

  <Grid container spacing={24}>
    {data.map((chunk, i) => (
      <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={3}>
        {chunk.map((company) => (

          <ColumnlistItem 
            key={company.id} 
            id={company.id} 
            subpage="company" 
            name={_get(company, 'profile.name')} 
            highlighted={company.promo ? <Highlight /> : null} 
          />

        ))}
      </Grid>
    ))}
  </Grid>

)

ColumnList.defaultProps = {
  data: [],
};

export default ColumnList
