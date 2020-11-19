import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Wrapper from '../components/Wrapper';
import EventInfo from '../components/EventInfo';
import WidgetSupport from './WidgetSupport';
import Settings from '../datasources/Settings'
import Link from '../next/MyLink'
import WidgetEventInfo from './WidgetEventInfo'

const styles = theme => ({
  container: {
    borderTop: '1px solid #cccccc'
  },

  paper: {
    padding: 30
  }
});

const WidgetFooter = ({ links, classes, width, people}) => <Settings>{(get) => {

const footerLinks = get("footer.links", []);
const showEventInfo = get("footer.showEventInfo", true)
const backgroundColor = get("footer.backgroundColor", "#fafafa");

return (

<div className={classes.container}>
<Wrapper dense={true} color={backgroundColor}>
<Grid container spacing={2} justify="flex-start" alignItems="center">
  <Grid item xs={12} sm={12} md={6}>
    <WidgetSupport people={people} />
  </Grid>

  {showEventInfo && <Grid item xs={12} sm={6} md={5}><WidgetEventInfo /></Grid>}

  <Grid item xs={12} sm={6} md={6}>
    <EventInfo
      items={[
        {
        secondary: 'event.organizer.name',
        primary: get("common.organizer_name")
        },

        {
        secondary: 'event.organizer.address',
        primary: get("common.organizer_address")
        },

        {
        secondary: 'event.organizer.registration',
        primary: get("common.organizer_regno")
        }
      ]}
      orientation="v"
    />
  </Grid>
</Grid>


  <div style={{marginTop: 30, marginBottom : 30}}>
    <Grid container spacing={1} wrap="wrap" justify="space-around" alignItems="center">
    {footerLinks.map(({label, href}) => (<Grid item key={label}><Link prefetch={false} href={href} label={label} /></Grid>))}        
    </Grid>
  </div> 

</Wrapper>
</div>)

}}</Settings>


WidgetFooter.defaultProps = {
  links: [],
  people : [
    {
      title: 'event.support.hello',
      text: 'event.support.description',
      name: '',
      avatar: '/support.jpg',
      phone: '',
      email: ''
    }
  ]
};

export default withStyles(styles)(WidgetFooter);
