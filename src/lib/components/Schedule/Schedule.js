import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { connect } from 'react-redux'
// import { withStyles } from '@material-ui/core/styles';
// import compose from 'recompose/compose'

import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _get from 'lodash/get';

import ScheduleItem from './ScheduleItem';
import ScheduleItemMinimized from './ScheduleItemMinimized';
import ScheduleVenue from './ScheduleVenue';
import ScheduleVenueMinimized from './ScheduleVenueMinimized';

import ScheduleBreak from './ScheduleBreak';
import {VenueSelector} from './redux'
import colconfig from './colconfig'

class Schedule extends React.PureComponent {
 
  getCompany(id) {
    return _find(this.props.exhibitors, { id }, {});
  }

  findPresentations(search, first = false) {
   
    const { presenters, venues, selected, selectedVenue, descriptions, minimized } = this.props;

    const details = (selectedVenue && selectedVenue in venues);

    return _filter(presenters, search).map((item, i) => {

      // if(Array.isArray(minimized) && minimized.indexOf(item.presentation_venue)>-1){

      //   return (

      //     <ScheduleItemMinimized
      //     key={item.id}
      //     selected={item.id == selected}
      //     first={i === 0}
      //     data={item}
      //   />
      //   )
      // }

      return (
        <ScheduleItem
          key={item.id}
          selected={item.id == selected}
          first={i === 0}
          data={item}
          description={details || descriptions}
        />
      ) 

    }
    
    );
  }

  renderBreak(label) {
    return (
      <Grid item xs={12}>
        <ScheduleBreak label={label} />
      </Grid>
    );
  }

  renderVenues() {
    
    const { venues, venueStyle, minimized } = this.props;
    const iterableVenues = this.getIterableVenues();


    /*
      Array.isArray(minimized) && minimized.indexOf(venue) > -1 ? 
          
          <ScheduleVenueMinimized   
            name={venue}  
            total={iterableVenues.length}
            template={venueStyle}
          />        
          
          :
  
          */
    return iterableVenues.map(venue => (
      <Grid key={venue} item {...this.getColNumber(venue)} style={{minWidth: 300}}>
      

        
          <ScheduleVenue
          name={venue}
          company={this.getCompany(_get(venues[venue], 'company_id', 0))}
          total={iterableVenues.length}
          template={venueStyle}
          />

    
      </Grid>
    ));
  }
  
  getIterableVenues(){
    const { venues, selectedVenue } = this.props;

    if(selectedVenue && selectedVenue in venues){
      return [selectedVenue]
    }

    return Object.keys(venues);
  }

  getColNumber(currentVenue){

    const iterableVenues = this.getIterableVenues();
    const iterableVenuesCount = iterableVenues.length;

    const {minimized, selectedVenue, colconfig} = this.props;

    //GRID unfriendly number of scenes - 5....

    if(selectedVenue || iterableVenuesCount <= 4){

      const cols = 12 / iterableVenues.length;
      return { xs: 12, sm: 12, md: cols, lg: cols, xl: cols };

    }else{

      return colconfig[iterableVenuesCount]

      //if we have 5 stages than 2 must be collapsed (=1) and 3 shown...
      //if we have 7 stages than 6 must be collapsed (3 slots) and 1 shown...

    //   //odd number of stages...
    //   if(Array.isArray(minimized) && minimized.indexOf(currentVenue)>-1){

    //     return { xs: 12, sm: 12, md: 1, lg: 1, xl: 1 };

    //   }

    //  // const cols = 12 / (iterableVenues.length + minimized.length);
    //   return { xs: 12, sm: 12, md: 3, lg: 3, xl: 3 };

    }
    
  }



  render() {  
    const { times } = this.props;
    const iterableVenues = this.getIterableVenues();
   
    return (
      <div style={{overflowX: "scroll"}}>
    
        <Hidden implementation="css" smDown={true}>

        <Grid
          container
          spacing={10}
          wrap="nowrap" 
        >
          {this.renderVenues()}
        </Grid>

        </Hidden>

        {Object.keys(times).map((time, i) => (
          <Grid key={time} container spacing={10} wrap="nowrap" >
            {times[time] !== 'presentation' && this.renderBreak(times[time])}

            {times[time] === 'presentation' &&
              iterableVenues.map((venue, j) => (
                <Grid key={`${time}${venue}`} item {...this.getColNumber(venue)} style={{minWidth: 300}}>
                  {this.findPresentations(
                    {
                      presentation_venue: venue,
                      presentation_time: time
                    },
                    j === 0
                  )}
                </Grid>
              ))}
          </Grid>
        ))}
      </div>
    );
  }
}

Schedule.defaultProps = {
  selectedVenue : null,
  selected: 0,
  presenters: [],
  exhibitors: [],
  times: {},

  venues: {
    A: { company_id: 0 },
    B: { company_id: 0 },
    C: { company_id: 0 },
    D: { company_id: 0 }
  },

  descriptions : true,
  venueStyle : "black",
  minimized : [],
  colconfig : colconfig
};

export default connect((state) => ({
  selectedVenue : VenueSelector(state)
}), null)(Schedule)
