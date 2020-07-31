import React from 'react';
import Settings from '../datasources/Settings'
import EventInfo from '../components/EventInfo';


const WidgetEventInfo = ({items, ...props}) => (

    <Settings>{get => {

          const filtered = [
            {
              name : 'location',
              icon: 'location',
              secondary: 'event.location',
              primary: get("common.event_location")
            },

            {
              name : 'date',
              icon: 'date',
              secondary: 'event.date',
              primary: get("common.event_date")
            },

            {
              name : 'hours',
              icon: 'alarm',
              secondary: 'event.hours',
              primary: get("common.event_hours")
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




  