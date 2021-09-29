import React, {useEffect} from 'react';
import { map, get } from 'lodash';
import {Wrapper, Bookingmap} from '../components';
import { getCompanyProfileInfo } from '../helpers';
import {useSettings} from '../helpers/hooks'
import isEmpty from 'lodash/isEmpty'
import Alert from '../components/Alert'
import {useDispatch} from 'react-redux'
import {markBooths} from '../components/redux'

const defaultProps = {
  company: {},
  wrapperProps: {
    label: 'exhibitors.booth_location_full',
  },
  mapSetting: "bookingmap",
  absentLabel: "exhibitors.profile_archived"
};

const WidgetCompanyBookingmap = ({setting, ...otherProps}) => {
  
  const dispatch = useDispatch()
  const settings = useSettings(setting)
  const {wrapperProps, company, mapSetting, absentLabel} = Object.assign({}, defaultProps, settings, otherProps)
  const {label} = wrapperProps 
  const name = getCompanyProfileInfo(company, 'name');
  const purchases = get(company, 'instances', []).filter(p => parseInt(p.sold));

  const selectedBoothIds = map(purchases, 'formdata.id').filter(v => v && v.length);
  const selectedBoothNames = map(purchases, 'formdata.ti').filter(v => v && v.length);

  useEffect(()=>{
    if(!isEmpty(selectedBoothIds)){
      //dispatch selected booths!
      dispatch(markBooths(selectedBoothIds))
    }

    return () => dispatch(markBooths([]))
  }, [selectedBoothIds])

  if(isEmpty(company)){
    return null
  }

  if(isEmpty(purchases)){
    return <Wrapper><Alert type="info" label={absentLabel} /></Wrapper>
  }

  return (
    <Wrapper {...wrapperProps} label={[label, {
      cname2: name,
      loc: selectedBoothNames.join(','),
      smart_count: selectedBoothNames.length
    }]}>
      <Bookingmap setting={mapSetting} />
      </Wrapper>
  )
};


export default WidgetCompanyBookingmap
