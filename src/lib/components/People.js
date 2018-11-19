import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import _get from 'lodash/get';
import Person from './Person';

import { changeLimitForScreen } from '../helpers';


const FullJobInfo = ({ company, job }) => (
  <span>
    {job} @ <strong>{company}</strong>
  </span>
);


const People = ({data, link}) => {

  const gridData = { xs: 6, sm: 6, md: 4, lg: 3, xl: 3 };

  return (

    <Grid container spacing={24}>
    {data.map((item, i) => (
      <Grid key={_get(item, 'id')} item {...gridData}>
        <Person
          key={_get(item, 'id')}
          id={_get(item, 'id')}
          avatar={_get(item, 'avatar')}
          title={`${_get(item, 'fname')} ${_get(item, 'lname')}`}
          subtitle={
            <FullJobInfo
              company={_get(item, 'cname2')}
              job={_get(item, 'position')}
            />
          }
          text={_get(item, 'bio')}
          link={link}
        />
      </Grid>
    ))}
  </Grid>

  )

}


People.defaultProps = {
  data: [],
  link: false
};

// People.propTypes = {

// };

export default People;