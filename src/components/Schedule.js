import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _get from 'lodash/get';

import ScheduleItem from './ScheduleItem';
import ScheduleVenue from './ScheduleVenue';
import ScheduleBreak from './ScheduleBreak';

class Schedule extends React.PureComponent {
 
  getCompany(id) {
    return _find(this.props.exhibitors, { id }, {});
  }

  findPresentations(search, first = false) {
    const { presenters, selected } = this.props;

   

    return _filter(presenters, search).map((item, i) => (
      
      <ScheduleItem
        key={item.id}
        selected={item.id == selected}
        first={i === 0}
        data={item}
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

  renderVenues() {
    
    const { venues } = this.props;

    const gridData = this.getColNumber();

    return Object.keys(venues).map(venue => (
      <Grid key={venue} item {...gridData}>
        <ScheduleVenue
          name={venue}
          company={this.getCompany(_get(venues[venue], 'company_id', 0))}
        />
      </Grid>
    ));
  }

  getColNumber(){
    const {venues} = this.props;
    const cols = 12 / Object.keys(venues).length;
    return { xs: 12, sm: 12, md: cols, lg: cols, xl: cols };
  }


  render() {
  
    const { venues, times } = this.props;
    const gridData = this.getColNumber();

   return (
      <div>
    
        <Hidden implementation="css" smDown={true}>

        <Grid
          container
          spacing={40}
        >
          {this.renderVenues()}
        </Grid>

        </Hidden>

        {Object.keys(times).map((time, i) => (
          <Grid key={i} container spacing={40}>
            {times[time] !== 'presentation' && this.renderBreak(times[time])}

            {times[time] === 'presentation' &&
              Object.keys(venues).map((venue, j) => (
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
    A: { company_id: 1303 },
    B: { company_id: 1245 },
  //  C: {}
    C: {  }
  }

};

export default Schedule
