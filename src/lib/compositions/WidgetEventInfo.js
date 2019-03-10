import React from 'react';
import Settings from '../datasources/Settings'
import EventInfo from '../components/EventInfo';


const WidgetEventInfo = ({items, ...props}) => (

    <Settings name="common">
  {
      ({
          event_location,
          event_date,
          event_hours
      }) => {

          const filtered = [
            {
              name : 'location',
              icon: 'location',
              secondary: 'event.location',
              primary: event_location
            },

            {
              name : 'date',
              icon: 'date',
              secondary: 'event.date',
              primary: event_date
            },

            {
              name : 'hours',
              icon: 'alarm',
              secondary: 'event.hours',
              primary: event_hours
            }
          ].filter(({name}) => items.indexOf(name) > -1)

          return (
              <EventInfo
              {...props}
              items={ filtered }         
            />
          )
      }
  }
  </Settings>

)

WidgetEventInfo.defaultProps = {
    orientation : "v",
    iconStyle : "black",
    items : ["location", "date"]
    
}

export default WidgetEventInfo;




  