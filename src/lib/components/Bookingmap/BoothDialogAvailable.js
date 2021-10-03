import React from 'react';
import Typography from '../MyTypography';
import TicketGroup from './TicketGroup';
import Benefits from '../Benefits'
import BoothDialogContainer from './BoothDialogContainer'
import BoothOrderSteps from './BoothOrderSteps'
import { useSettings, capitalizeFirstLetter } from '../../helpers'
import isString from 'lodash/isString'


import {
  Power as Electricity,
  Fastfood as Catering,
  CropSquare as Space,
  Info,
  Receipt as Ids,
  MenuBook as Catalogue,
  EventSeat as Furniture
} from '@material-ui/icons';

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

const BoothIsAvailable = ({setting,  ...props}) => {

  const settings = useSettings(setting)
  const {benefits, defaultBenefits, groupId} = Object.assign({}, defaultProps, settings, props)
  let selectedBenefits =  benefits && groupId in benefits? benefits[groupId]: defaultBenefits
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

    <BoothDialogContainer {...props} 
    setting={setting}
    header={ <BoothOrderSteps setting={setting} active={1} /> }
    content={
      <React.Fragment>
        <div >
  
    <Typography template="salesInfo" icon={ Info } label="event.sales.pool.info" />
  
    <TicketGroup
      setting={setting}
      {...props}
    />

     
  
    </div>
  
  {selectedBenefits.length? <div style={{
      marginTop: 40,
      marginBottom : 10,
    }}> <Typography template="salesInfo" icon={ Info } label="exhibitors.standard.info" />
      <Benefits setting={setting} orientation="h" baseLabel="benefits" labels={selectedBenefits} /></div>: null} 
      </React.Fragment>
    }/>)
}


export default BoothIsAvailable