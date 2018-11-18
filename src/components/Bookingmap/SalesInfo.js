
import Typography from '../MyTypography';
import TicketGroup from './TicketGroup';
import Benefits from '../Benefits'
import BoothInfoContainer from './BoothInfoContainer'
import OrderSteps from './OrderSteps'

import {
  FaBolt as Electricity,
  FaUtensils as Catering,
  FaSquare as Space,
  FaInfoCircle as Info,
  FaIdCard as Ids,
  FaBookOpen as Catalogue,
  FaCouch as Furniture
} from 'react-icons/fa';



const steps = [
  "choose_booth",
  "confirm",
  "pay",
  "access"
]



const SalesInfo = (props) => (

  <BoothInfoContainer {...props} 
  
  header={
    <OrderSteps items={steps} active={1} />
  }
  
  content={
    <React.Fragment>

      <div >
  
  <Typography template="salesInfo" icon={ Info } label="event.sales.pool.info" />

  <TicketGroup
      noBookableTickets={<div />}
      {...props}
  />

  </div>

 <div style={{
    marginTop: 40,
    marginBottom : 10,
  }}>

 <Typography template="salesInfo" icon={ Info } label="exhibitors.standard.info" />

<Benefits
  orientation="h"
  baseLabel="exhibitors.standard"
  labels={[
    {
      icon : Space, 
      primary : "space"
    },

    {
      icon : Furniture,
      primary : "furniture"
    },
    
  {
    icon : Electricity, 
    primary : "electricity"
  },
  {
    icon : Catering, 
    primary : "catering"
  },

  {
    icon : Ids,
    primary : "ids"
  },
  {
    icon : Catalogue,
    primary : "profile"
  }

]} 
/>

</div>


    </React.Fragment>
  }
  
   />



)



export default SalesInfo
