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

const WidgetFooter = ({setting="footer", ...props}) => {

  const settings = useSettings(setting)
  const {title, description} = useSettings("sales_support")

  const {organizer_name, organizer_address, organizer_regno} = useSettings("common")
  const classes = useStyles()
  const { links, people, showEventInfo, backgroundColor} = Object.assign({}, defaultProps, settings, props)

  return (<div className={classes.container}>
    <Wrapper dense={false} color={backgroundColor}>
    

    <Typography variant="h4">
      <RawTranslatedText label={ title } />
    </Typography>
    <Typography variant="subtitle1" color="textSecondary">
      <RawTranslatedText label={ description } />
    </Typography>
  

    <Grid container spacing={3} justifyContent="flex-start" alignItems="center">
      <Grid item xs={12} sm={12} md={showEventInfo? 4: 6}>
      <WidgetSupport setting={setting} people={people} />
      </Grid>
      {showEventInfo && <Grid item xs={12} sm={6} md={4}><WidgetEventInfo setting={setting} /></Grid>}
      <Grid item xs={12} sm={6} md={showEventInfo? 4: 6}>
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
      </Grid>
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
