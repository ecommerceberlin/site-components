import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { map, get } from 'lodash';
import {Wrapper, Bookingmap} from '../components';
import { getCompanyProfileInfo } from '../helpers';
import Settings from '../datasources/Settings';

const styles = {};

const WidgetCompanyBookingmap = ({disabled, steps, allowedGroupIds, boothStyleMapping, disabledTicketIds, company, label, ...wrapperProps}) => {
  
  
  const name = getCompanyProfileInfo(company, 'name');
  const purchases = get(company, 'instances');
  //const data = filterCompanyInstances(purchases, eventId);

  const selectedBoothIds = map(purchases, 'formdata.id').filter(v => v && v.length);
  const selectedBoothNames = map(purchases, 'formdata.ti').filter(v => v && v.length);

  if(!selectedBoothIds.length)
  {
    return null
  }

  return (<Settings>{(get) => (
        
      <Wrapper {...wrapperProps} label={[label, {
        cname2: name,
        loc: selectedBoothNames.join(','),
        smart_count: selectedBoothNames.length
      }]}>

        <Bookingmap 
            disabled={disabled} 
            disabledTicketIds={get("bookingmap.disabledTicketIds", disabledTicketIds)} 
            height={ get("bookingmap.height") } 
            boothStyleMapping={get("bookingmap.boothStyleMapping", boothStyleMapping)}
            selected={selectedBoothIds} 
        />

        </Wrapper>
       
    )}</Settings>);
};

WidgetCompanyBookingmap.propTypes = {
//  eventId: PropTypes.number.isRequired,
  company: PropTypes.object.isRequired
};

WidgetCompanyBookingmap.defaultProps = {
  company: {},
  label: 'exhibitors.booth_location_full',
  disabledTicketIds: [],
  steps: [],
  allowedGroupIds: [],
  disabled : false,
  boothStyleMapping: {}
};

export default withStyles(styles)(WidgetCompanyBookingmap);
