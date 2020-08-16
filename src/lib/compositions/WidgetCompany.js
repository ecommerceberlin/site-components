
import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {withRouter} from 'next/router'
import { MyHead } from '../next';

import {
  getCompanyAltOgImage,
  getCompanyProfileInfo,
} from '../helpers/data';

import SingleRecord from "../datasources/SingleRecord"
import Wrapper from '../components/Wrapper'
import CompanyData from '../components/CompanyData'
import CompanyLogotype from '../components/CompanyLogotype'
import KeywordSelect from '../components/KeywordSelect'
import {TwoColsLayout, Centered} from '../components/MyLayouts'
import WidgetCompanyBookingmap from './WidgetCompanyBookingmap'

const WidgetCompany = ({id, map, router}) => {

  return (

    <SingleRecord endpoint="companies" id={id}>{
    (company) =>
    <React.Fragment>
    <MyHead
        image={getCompanyAltOgImage(company, "/exhibitors")}
        url={"/companies"}
        titleLabel={[
          'companies.opengraph.title',
          { name: getCompanyProfileInfo(company, 'name') }
        ]}
      />
  
      <Wrapper label="">
  
      <TwoColsLayout
        leftSize={5}
        left={<CompanyLogotype company={company} />}
        leftCentered={true}
        right={
  
        <div style={{marginTop: 50}}>
  
          <Centered>
           <KeywordSelect keywords={get(company, 'profile.keywords', [])} />
          </Centered>
  
          <div style={{marginTop: 10}}>
            <CompanyData id={id} endpoint="companies" />
          </div>
        
        </div>  
      }
      />
  
      </Wrapper>
  
      {map && <WidgetCompanyBookingmap company={company} />}
      
      </React.Fragment>
  }
  </SingleRecord>)

}





WidgetCompany.defaultProps = {
  id: 0,
  map : true
}


export default withRouter(WidgetCompany)
