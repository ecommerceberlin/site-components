import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { map, get } from 'lodash';
import {Wrapper, Bookingmap} from '../components';
import { getCompanyProfileInfo } from '../helpers';

const styles = {};

const CompanyBookingmap = ({ company, label }) => {
  const name = getCompanyProfileInfo(company, 'name');
  const purchases = get(company, 'instances');
  //const data = filterCompanyInstances(purchases, eventId);
  const selectedBoothIds = map(purchases, 'formdata.id');
  const selectedBoothNames = map(purchases, 'formdata.ti');

  if(!selectedBoothIds.length)
  {
    return null
  }

  return (
    <Wrapper
      label={[label, {
          cname2: name,
          loc: selectedBoothNames.join(','),
          smart_count: selectedBoothNames.length
        }]}
    >
      <Bookingmap selected={selectedBoothIds} />
    </Wrapper>
  );
};

CompanyBookingmap.propTypes = {
//  eventId: PropTypes.number.isRequired,
  company: PropTypes.object.isRequired
};

CompanyBookingmap.defaultProps = {
  label: 'exhibitors.booth_location_full'
};

export default withStyles(styles)(CompanyBookingmap);
