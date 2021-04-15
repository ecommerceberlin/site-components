import React from 'react';
import Typography from '../MyTypography';
import TicketGroup from './TicketGroup';
import Benefits from '../Benefits'
import BoothInfoContainer from './BoothInfoContainer'
import OrderSteps from './OrderSteps'
import { useSettings, capitalizeFirstLetter } from '../../helpers'
import isString from 'lodash/isString'
import {
  FaBolt as Electricity,
  FaUtensils as Catering,
  FaSquare as Space,
  FaInfoCircle as Info,
  FaIdCard as Ids,
  FaBookOpen as Catalogue,
  FaCouch as Furniture
} from 'react-icons/fa';
import DefaultIcon from '@material-ui/icons/Done';

const defaultProps = {
  label: "",
  status: "",
  groupId: 0,
  boothId: "",
  disabledTicketIds: [],
  defaultBenefits: [
    {
    icon : "Space", 
    primary : "space"
    },
    {
    icon : "Furniture",
    primary : "furniture"
    },
    {
    icon : "Electricity", 
    primary : "electricity"
    },
    {
    icon : "Catering", 
    primary : "catering"
    },
    {
    icon : "Ids",
    primary : "ids"
    },
    {
    icon : "Catalogue",
    primary : "profile"
    }
  ]
}

const availableIcons = {Space, Furniture, Electricity, Catering, Ids, Catalogue}

const BoothIsAvailable = ({setting, disabled,  ...props}) => {

  const settings = useSettings(setting)
  const {disabledTicketIds, benefits, defaultBenefits, groupId} = Object.assign({}, defaultProps, settings, props)
  let selectedBenefits =  groupId in benefits? benefits[groupId]: defaultBenefits
  selectedBenefits = selectedBenefits.map((item) => {

    if("icon" in item && item.icon && isString(item.icon)){
        const name = capitalizeFirstLetter(item.icon)
        if(name in availableIcons){
          return ({...item, icon: availableIcons[name] })
        }else{
          return ({...item, icon: DefaultIcon})
        }
    }

    return item
  })
  
  return (

    <BoothInfoContainer 
    {...props} 
    header={
      <OrderSteps setting={setting} active={1} />
    }
    content={
      <React.Fragment>
        <div >
    
    <Typography template="salesInfo" icon={ Info } label="event.sales.pool.info" />
  
    <TicketGroup
      setting={setting}
      disabled={disabled}
      disabledTicketIds={disabledTicketIds}
      noBookableTickets={<div />}
      {...props}
    />
  
    </div>
  
  {selectedBenefits.length? <div style={{
      marginTop: 40,
      marginBottom : 10,
    }}> <Typography template="salesInfo" icon={ Info } label="exhibitors.standard.info" />  <Benefits
    orientation="h"
    baseLabel="exhibitors.standard"
    labels={selectedBenefits} 
  /></div>: null} 
  

      </React.Fragment>
    }/>)
}


export default BoothIsAvailable