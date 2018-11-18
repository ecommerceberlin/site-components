import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import classNames from 'classnames'

import Typography from './MyTypography';
import Tags from './Tags';

// <Tags tags={_get(company.profile, "keywords")} />

const styles = {};

const Presenter = ({ showBio, data }) => {
  const {
    bio,
    cname2,
    fname,
    lname,
    position,
    presentation_description,
    presentation_time,
    presentation_venue,
    presentation_title
  } = data;

  return (
    <div style={{ marginTop: 30 }}>
      <Typography template="presenter1">{`${fname} ${lname}`}</Typography>

      <Typography template="presenter2">{`${position} ${cname2}`}</Typography>

      {showBio && <Typography template="presenterText">{bio}</Typography>}
    </div>
  );
};

Presenter.defaultProps = {
  data: {},
  showBio: true
};

export default withStyles(styles)(Presenter);
