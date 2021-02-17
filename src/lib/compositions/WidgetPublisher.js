
import React from 'react';
import Box from '@material-ui/core/Box';
import get from 'lodash/get'
import SingleRecord from "../datasources/SingleRecord"
import Publisher from '../components/Publisher'


const WidgetPublisher = ({company}) => <SingleRecord endpoint="publishers" slug={company}>{(company) => {
    
    return  (<Box mt={5} mb={10}>
    <Publisher data={company} fluid={true} />  
    </Box>)
    
}}</SingleRecord>


WidgetPublisher.defaultProps = {
  company: null
}


export default WidgetPublisher
