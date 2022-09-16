
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
import Grid from '@material-ui/core/Grid'


import {CompanyContextProvider, CompanyData, CompanyLogotype, CompanyContact, CompanyLocation} from '../components/Company'

const WidgetCompany = ({slug, map, router}) => {

  return (

    <SingleRecord endpoint="companies" slug={slug}>{(company) => <CompanyContextProvider data={company}>
   
      <Wrapper label="">
  
      <TwoColsLayout
        reverse={true}
        leftSize={8}
        left={        
          <Box>
            <CompanyLogotype />       
            <Box mt={3} mb={3}>
              <Grid container spacing={2} alignItems="center">     
                <Grid item><KeywordSelect keywords={get(company, 'profile.keywords', [])} /></Grid>
                <Grid item><CompanyContact /></Grid>
              </Grid>
            </Box>
            <CompanyData />
          </Box>
        }
        leftCentered={false}
        right={
          <Box>
            <Box mt={5}>
              <CompanyLocation />
            </Box>
          </Box>
        }
      />
  
      </Wrapper>
      
      </CompanyContextProvider>
  }
  </SingleRecord>)

}





WidgetCompany.defaultProps = {
  id: 0,
  map : true
}


export default withRouter(WidgetCompany)
