import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { connect } from 'react-redux'

import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _get from 'lodash/get';

import ScheduleItem from './ScheduleItem';
import ScheduleVenue from './ScheduleVenue';
import ScheduleBreak from './ScheduleBreak';
import {VenueSelector} from './redux'

class Schedule extends React.PureComponent {
 
  getCompany(id) {
    return _find(this.props.exhibitors, { id }, {});
  }

  findPresentations(search, first = false) {
    const { presenters, selected, descriptions } = this.props;

    return _filter(presenters, search).map((item, i) => (
      
      <ScheduleItem
        key={item.id}
        selected={item.id == selected}
        first={i === 0}
        data={item}
        descriptions={descriptions}
      />

    ));
  }

  renderBreak(label) {
    return (
      <Grid item xs={12}>
        <ScheduleBreak label={label} />
      </Grid>
    );
  }

  renderVenues(iterableVenues, gridData) {
    
    const { venues } = this.props;

    return iterableVenues.map(venue => (
      <Grid key={venue} item {...gridData}>
        <ScheduleVenue
          name={venue}
          company={this.getCompany(_get(venues[venue], 'company_id', 0))}
          total={iterableVenues.length}
        />
      </Grid>
    ));
  }

  getColNumber(iterableVenues){
    const cols = 12 / iterableVenues.length;
    return { xs: 12, sm: 12, md: cols, lg: cols, xl: cols };
  }

  render() {  
    const { venues, times, selectedVenue } = this.props;
    let iterableVenues = Object.keys(venues);

    if(selectedVenue && selectedVenue in venues){
      iterableVenues = [selectedVenue]
    }

    const gridData = this.getColNumber(iterableVenues);
   
    return (
      <div>
    
        <Hidden implementation="css" smDown={true}>

        <Grid
          container
          spacing={40}
        >
          {this.renderVenues(iterableVenues, gridData)}
        </Grid>

        </Hidden>

        {Object.keys(times).map((time, i) => (
          <Grid key={i} container spacing={40}>
            {times[time] !== 'presentation' && this.renderBreak(times[time])}

            {times[time] === 'presentation' &&
              iterableVenues.map((venue, j) => (
                <Grid key={`${i}${j}`} item {...gridData}>
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
  times: {
    '11:15': 'presentation',
    '11:50': 'presentation',
    '12:10': 'break_30',
    '12:40': 'presentation',
    '13:15': 'presentation',
    '13:35': 'break_30',
    '14:05': 'presentation',
    '14:40': 'presentation',
    '15:00': 'break_30',
    '15:30': 'presentation',
    '16:05': 'presentation'
  },

  venues: {
    A: { company_id: 0 },
    B: { company_id: 0 },
    C: { company_id: 0 },
    D: { company_id: 0 }
  },

  descriptions : true

};

export default connect((state) => ({
  selectedVenue : VenueSelector(state)
}), null)(Schedule)
