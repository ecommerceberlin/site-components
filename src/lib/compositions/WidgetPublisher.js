
import React from 'react';
import Box from '@material-ui/core/Box';
import get from 'lodash/get'
import SingleRecord from "../datasources/SingleRecord"
import Publisher from '../components/Publisher'
import CompanyTabContainer from '../components/CompanyTabContainer'

const WidgetPublisher = ({id, company, initialData}) => <SingleRecord initialData={initialData} endpoint="publishers" id={id} slug={company}>{(data) => {
    
    const about = get(data, "profile.about", "")

    return  (<Box mt={5} mb={10}>
    <Publisher data={data} fluid={true} /> 
      <Box mt={5}>
     <CompanyTabContainer data={about}  />
     </Box>
    </Box>)
    
}}</SingleRecord>


WidgetPublisher.defaultProps = {
  company: null,
  id: 0,
  initialData: {}
}


export default WidgetPublisher
