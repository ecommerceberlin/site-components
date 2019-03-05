import React from 'react'

import FacebookVote from '../components/FacebookVote'
import Settings from '../datasources/Settings';


const WidgetFacebookVote = ({sth}) => (

    <Settings 
    name="test"
  >
    {(data) => <FacebookVote 

    />}
  
  </Settings>
 

)

WidgetFacebookVote.defaultProps = {
  
}


export default WidgetFacebookVote
