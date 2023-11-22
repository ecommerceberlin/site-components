import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Wrapper from '../components/Wrapper';
import EventInfo from '../components/EventInfo';
import WidgetSupport from './WidgetSupport';
import Link from '../next/MyLink'
import WidgetEventInfo from './WidgetEventInfo'
import {useSettings} from '../helpers'
import Typography from '@material-ui/core/Typography';
import RawTranslatedText from '../components/RawTranslatedText'
import { isEmpty, isString } from 'lodash';

const useStyles = makeStyles(theme => ({
  container: {
    borderTop: '1px solid #cccccc'
  },

  paper: {
    padding: 30
  }
}))


const defaultProps = {
  links: [],
  people : [],
  showEventInfo: true,
  backgroundColor: "#fafafa"
};


const useHasOrganizerInfo = (setting) => {

  const {hideOrganizerDetails} = useSettings(setting)
  const {organizer_name, organizer_address, organizer_regno} = useSettings("common")

  const details = {
    organizer_name, 
    organizer_address, 
    organizer_regno
  }

  const filtered = Object.values(details).filter(detail => detail && isString(detail))

  return React.useMemo(() => {

    if(hideOrganizerDetails){
      return false
    }

    if(!filtered.length){
      return false
    }

    return details

  }, [
    hideOrganizerDetails, 
    filtered
  ])

}

const useHasSupport = (setting) => {
  
  const {people} = useSettings(setting)

  return React.useMemo(() => {

    if(isEmpty(people)){
      return false
    }

    return people

  }, [people])
}


const WidgetFooter = ({setting="footer", ...props}) => {

  const settings = useSettings(setting)
  const classes = useStyles()
  const {title, description, links,showEventInfo, backgroundColor} = Object.assign({}, defaultProps, settings, props)

  const hasSupport = useHasSupport(setting)
  const hasOrganizerInfo = useHasOrganizerInfo(setting)

  /**determine grid cols**/

  const cols = [showEventInfo, hasSupport, hasOrganizerInfo].filter(val => val).length


  return (<div className={classes.container}>
    
    <Wrapper dense={false} color={backgroundColor}>
    
    <Grid container spacing={3} justifyContent="flex-start" alignItems="center">
      
    {hasSupport? 
    <Grid item xs={12} sm={12} md={cols>2? 4: 6}>
    <WidgetSupport setting={setting} />
    </Grid>: 
    null}


    {showEventInfo? 
    <Grid item xs={12} sm={6} md={cols>2? 4: 6}>
    <WidgetEventInfo setting={setting} /></Grid>: 
    null}
     
    {hasOrganizerInfo? 
    <Grid item xs={12} sm={6} md={cols>2? 4: 6}>
      <EventInfo
      items={[
        {
        secondary: 'event.organizer.name',
        primary: organizer_name
        },

        {
        secondary: 'event.organizer.address',
        primary: organizer_address
        },

        {
        secondary: 'event.organizer.registration',
        primary: organizer_regno
        }
      ]}
      orientation="v"
      primaryStyle={null}
      secondaryStyle={null}
      />
      </Grid>: 
      null}
     
 
    </Grid>

    <div style={{marginTop: 30, marginBottom : 30}}>
    <Grid container spacing={1} wrap="wrap" justifyContent="space-around" alignItems="center">
    {links.map(({label, href}) => (<Grid item key={label}><Link href={href} label={label} /></Grid>))}        
    </Grid>
    </div> 

    </Wrapper>
  </div>)
}


export default WidgetFooter
