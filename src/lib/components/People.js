import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import _get from 'lodash/get';
import Person from './Person';

import { 
//  changeLimitForScreen, 
  getSpeakerName,
  getSpeakerAvatar,
  generateLinkParams
} from '../helpers';


const FullJobInfo = ({ company, job }) => (
  <span>
    {job} @ <strong>{company}</strong>
  </span>
);


const People = ({data, gridData, link, title, subtitle, text, voted, moreLabel}) => {

  return (

    <Grid container spacing={24}>
    {data.map((item, i) => (
      <Grid key={_get(item, 'id')} item {...gridData}>
        <Person
          key={_get(item, 'id')}
          id={_get(item, 'id')}
          avatar={ getSpeakerAvatar(item) }
          title={ title(item) }
          subtitle={ subtitle(item) }
          text={ text(item) }
          link={link}
          mark={_get(item, "id") in voted}
          moreLabel={moreLabel}
        />
      </Grid>
    ))}
  </Grid>

  )

}


People.defaultProps = {
  gridData : { xs: 6, sm: 6, md: 4, lg: 3, xl: 3 },
  data: [],
  title : (item) => getSpeakerName(item),
  link: (item) => generateLinkParams( getSpeakerName(item), 'speaker', item.id), 
  subtitle : (item) => <FullJobInfo company={_get(item, 'cname2')} job={_get(item, 'position')} />,
  text : (item) => `${_get(item, 'bio', "").substring(0, 350)}...`,
  voted : {},
  moreLabel : "common.more"
};

// People.propTypes = {

// };

export default People;