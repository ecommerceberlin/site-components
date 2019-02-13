import React from 'react';
import Settings from '../datasources/Settings'
import EventInfo from '../components/EventInfo';


const WidgetEventInfo = (props) => (

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
              {...props}
             
            />
          )
      }
  }
  </Settings>

)

WidgetEventInfo.defaultProps = {
    orientation : "v",
    iconStyle : "black",
}

export default WidgetEventInfo;




  