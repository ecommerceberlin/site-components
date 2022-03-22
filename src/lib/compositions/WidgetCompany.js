
import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {withRouter} from 'next/router'
import { MyHead } from '../next';

import {
  getCompanyProfileInfo,
} from '../helpers/data';

import SingleRecord from "../datasources/SingleRecord"
import Wrapper from '../components/Wrapper'
// import CompanyData from '../components/CompanyData'

import KeywordSelect from '../components/KeywordSelect'
import {TwoColsLayout, Centered} from '../components/MyLayouts'
import Box from '@material-ui/core/Box'
import {CompanyContext, CompanyData, CompanyLogotype, CompanyContact, CompanyLocation} from '../components/Company'

const WidgetCompany = ({slug, map, router}) => {

  return (

    <SingleRecord endpoint="companies" slug={slug}>{(company) => <CompanyContext data={company}>
   
      <Wrapper label="">
  
      <TwoColsLayout
        leftSize={7}
        left={
        
        <Box>
          <CompanyLogotype />
       
          <CompanyData />
        </Box>}
        leftCentered={true}
        right={

        <Box>

            <Box mb={1}>
            <KeywordSelect keywords={get(company, 'profile.keywords', [])} />
            </Box>
     
            <Box mb={1}>
            <CompanyLocation />
            </Box>
     
            <Box mb={1}>
            <CompanyContact />
            </Box>
      
        </Box>


        }
      />
  
      </Wrapper>
      
      </CompanyContext>
  }
  </SingleRecord>)

}





WidgetCompany.defaultProps = {
  id: 0,
  map : true
}


export default withRouter(WidgetCompany)
