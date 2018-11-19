import React from 'react';
import PropTypes from 'prop-types';

const CompanyLocationMap = ({ children, data }) => {

  let boothIds = []

  data.forEach(exhibitor => {

    const formdata = exhibitor.instances.filter(purchase => purchase.formdata && "id" in purchase.formdata).map(purchase => purchase.formdata.id)

    if(formdata.length){
      boothIds = boothIds.concat(formdata)
    }

  })


  // const name = getCompanyProfileInfo(company, 'name');
  // const data = filterCompanyInstances(purchases, eventId);
  // const selectedBoothIds = map(data, 'formdata.id');
  // const selectedBoothNames = map(data, 'formdata.ti');

  return children(boothIds)

};

CompanyLocationMap.propTypes = {
  data: PropTypes.array.isRequired,
};

CompanyLocationMap.defaultProps = {

};

export default CompanyLocationMap
