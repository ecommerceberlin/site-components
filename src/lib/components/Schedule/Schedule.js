import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

// import compose from 'recompose/compose'

import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _get from 'lodash/get';

import ScheduleItemContainer from './ScheduleItemContainer';
import ScheduleVenue from './ScheduleVenue';
import ScheduleBlock from './ScheduleBlock';
import ScheduleBreak from './ScheduleBreak';
import {VenueSelector} from './redux'
import colconfig from './colconfig'
import {useSettings, filterFuncFromArr} from '../../helpers'


const useStyles = makeStyles(theme => ({

  root: {
    borderRadius: 5,
    backgroundColor: "#f0f2f5", 
    padding: 10,
  },

  timeSlot: {
    marginBottom: 20
  }

}))

const defaultProps = {
  day: null,
  selected: 0,
  presenters: [],
  exhibitors: [],
  times: {},
  venues: {},
  inserts: {},
  descriptions : true,
  venueStyle : "black",
  minimized : [],
  colconfig : colconfig
};



const Schedule = ({setting = "schedule", ...props}) => {

  const classes = useStyles();
  const settings = useSettings(setting)
  const {
    day,
    exhibitors, 
    presenters, 
    times, 
    venues, 
    descriptions, 
    venueStyle, 
    minimized,
    selected,
    inserts
  } = Object.assign({}, defaultProps, settings, props)

  const selectedVenue = useSelector(VenueSelector)

  function getKey(stage, time){
    return `${stage}${time}`
  }

  function getCompany(id) {
    return _find(exhibitors, { id }, {});
  }



  function renderBreak(label) {
    return (
      <Grid item xs={12}>
        <ScheduleBreak 
          setting={setting}
          label={label} 
        />
      </Grid>
    );
  }


function renderBlock(time) {

  return getIterableVenues().map((venue, j) => {

        const key = getKey(venue, time)
        const data = key in inserts? presenters.find(filterFuncFromArr(inserts[key])): null

        return (<Grid key={key} item {...getColNumber(venue)} style={{minWidth: 300}}><ScheduleBlock setting={setting} data={data} /></Grid>)

   })
 }

  function renderVenues() {
    
    const iterableVenues = getIterableVenues();

    return iterableVenues.map(venue => (
      <Grid key={venue} item {...getColNumber(venue)} style={{minWidth: 300}}> 

          <ScheduleVenue
          setting={setting}
          name={venue}
          company={getCompany(_get(venues[venue], 'company_id', 0))}
          total={iterableVenues.length}
          template={venueStyle}
          />
    
      </Grid>
    ));
  }


  
  function renderPresentation(time){

    return getIterableVenues().map((venue, j) => {

      const key = getKey(venue, time)

      const data = _filter(presenters, {
        presentation_venue: venue,
        presentation_time: time
      })

      return (
        <Grid key={key} item {...getColNumber(venue)} style={{minWidth: 300}}>
        <ScheduleItemContainer venue={venue} time={time} setting={setting} data={data} />        
        </Grid>
      )
    })

  }





  function getIterableVenues(){

    if(selectedVenue && selectedVenue in venues){
      return [selectedVenue]
    }

    return Object.keys(venues);
  }

  function getColNumber(currentVenue){

    const iterableVenues = getIterableVenues();
    const iterableVenuesCount = iterableVenues.length;

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

  


  return (
    <div>
  
      <Hidden implementation="css" smDown={true}>
      <Grid container spacing={1}>{renderVenues()}</Grid>
      </Hidden>

    <div className={classes.root}>
      {Object.keys(times).map((time) => (
        <Grid key={time} container spacing={1} className={classes.timeSlot} >
          {times[time].includes('break') && renderBreak(times[time])}
          {times[time].includes("block") && renderBlock(time)}
          {times[time].includes('presentation') && renderPresentation(time)}
        </Grid>
      ))}
    </div>
    </div>
  );
}


export default Schedule