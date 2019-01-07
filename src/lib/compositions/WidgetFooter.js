import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Wrapper from '../components/Wrapper';
import EventInfo from '../components/EventInfo';
import WidgetSupport from './WidgetSupport';
import Settings from '../datasources/Settings'
import Link from '../next/MyLink'


const styles = theme => ({
  container: {
    borderTop: '1px solid #cccccc'
  },

  paper: {
    padding: 30
  }
});

const WidgetFooter = ({ links, classes, width, people}) => (
  <div className={classes.container}>
    <Wrapper dense={true} color="#fafafa" >
      <Grid container spacing={8} wrap="wrap" justify="space-around" alignItems="center">
        <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
          <WidgetSupport people={people} />
        </Grid>

        <Grid item xs={12} sm={6} md={5} lg={3} xl={3}>
        
        <Settings name="common">
        {
            ({
                event_location,
                event_date,
                event_hours
            }) => {
                return (
                    <EventInfo
                    items={[
                      {
                        icon: 'location',
                        secondary: 'event.location',
                        primary: event_location
                      },
        
                      {
                        icon: 'date',
                        secondary: 'event.date',
                        primary: event_date
                      },
        
                      {
                        icon: 'alarm',
                        secondary: 'event.hours',
                        primary: event_hours
                      }
                    ]}
                    orientation="v"
                  />
                )
            }
        }
        </Settings>
         
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          {/* <Typography /> */}

          <Settings name="common">
          {
             ({
                organizer_name,
                organizer_address,
                organizer_regno
            }) => (
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
              />
             ) 
          }</Settings>
         
        </Grid>
      </Grid>

      <Settings name="footer">{
            ({
                links
            }) => (
            <div style={{marginTop: 20, marginBottom : 20}}>
            <Grid container spacing={8} wrap="wrap" justify="space-around" alignItems="center">
            {links.map(({label, href}) => (<Grid item><Link prefetch={false} href={href} label={label} /></Grid>))}        
            </Grid>
            </div>
            
            )
      }</Settings>

    </Wrapper>
  </div>
);

WidgetFooter.defaultProps = {
  links: [],
  people : [
    {
      title: 'event.support.hello',
      text: 'event.support.description',
      name: 'Firstname Lastname',
      avatar: '/static/support.jpg',
      phone: '000000000',
      email: 'user@domain.com'
    }
  ]
};

export default withStyles(styles)(WidgetFooter);
