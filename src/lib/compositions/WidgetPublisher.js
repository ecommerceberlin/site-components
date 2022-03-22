
import React from 'react';
import Box from '@material-ui/core/Box';
import get from 'lodash/get'
import SingleRecord from "../datasources/SingleRecord"
import Publisher from '../components/Publisher'
import Markdown from 'react-markdown'

const WidgetPublisher = ({id, company, initialData}) => <SingleRecord initialData={initialData} endpoint="publishers" id={id} slug={company}>{(data) => {
    
    const id = get(data, "id", 0)
    const about = get(data, "profile.about", "")
    const logotype = get(data, "profile.logotype_cdn", "")

    return  (<Box mt={5} mb={10}>
    <Publisher logotype={logotype} fluid={true} link={`/authors/${id}`} /> 
      <Box mt={5}>
     <Markdown children={about}  />
     </Box>
    </Box>)
    
}}</SingleRecord>


WidgetPublisher.defaultProps = {
  company: null,
  id: 0,
  initialData: {}
}


export default WidgetPublisher
