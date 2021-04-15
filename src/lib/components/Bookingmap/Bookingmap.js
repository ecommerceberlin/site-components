import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux'
import { useSettings } from '../../helpers'
import { useTranslate } from '../../i18n'

import Booth from './Booth';
import Loader from './Loader'

import {KeyedFormdataSelector, KeyedTicketGroupsSelector, getBookingmap, getBoothsSelected} from '../../redux/selectors'


import {
  resourceFetchRequest,
} from '../redux/actions';

const useStyles = makeStyles( (theme) => ({

  scrollableContainer: {
    overflowX: 'auto',
    overflowY: 'visible',
    height: 520,
    whiteSpace: 'nowrap',
  },

  container: {
    position: 'relative',
    margin: '0px auto',
    padding: 0,
    width: 1170,
    height: '100%'
  },

  bg: {
    position: 'absolute',
    filter: 'grayscale(90%)',
    top: 0,
    left: 0,
    width: '100%',
    height: 'auto',
    zIndex: 2
  },

  booths: {
    position: 'relative',
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    zIndex: 3
  }
}));


const defaultProps = {
  zoom: 1,
  height: 750,
  width: 1170,
  defaultHeight: 500,
  boothsSelected : [],
  formdata : {},
  ticketgroups : {},
  bookingmap : [],
  disabled : false,
  disabledTicketIds : [],
  autorefresh : 15,
  defaultSize : 21,
  boothStyleMapping: {}
};

const Bookingmap = ({setting, ...props}) => {

  const [translate] = useTranslate();
  const dispatch = useDispatch()
  const settings = useSettings(setting)
  const classes = useStyles()

  // const formdata  = useSelector(KeyedFormdataSelector)
  const bookingmap = useSelector(getBookingmap)
  //const ticketgroups = useSelector(KeyedTicketGroupsSelector)
  //const boothsSelected = useSelector(getBoothsSelected)

  const {
    autorefresh, 
    defaultSize, 
    zoom, 
    height, 
    width,
    defaultHeight, 
    boothStyleMapping,
    selected 
  } = Object.assign({}, defaultProps, settings, props)

  useEffect(() => dispatch(resourceFetchRequest(["bookingmap", "ticketgroups", "formdata"])), [])

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(resourceFetchRequest(["formdata", "ticketgroups"]))
    }, autorefresh * 1000);
    return () => clearInterval(interval);
  }, []);


  return (

      <div
        className={classes.scrollableContainer}
        style={{
          height: !isNaN(height) ? height * zoom : defaultHeight * zoom
        }}
      >
      <div
        className={classes.container}
        style={{
          width: width * zoom
        }}
      >{bookingmap && 'mapsource' in bookingmap ? (
             <React.Fragment>
            <img src={bookingmap.mapsource} className={classes.bg} />

            <ul className={classes.booths}>
              {bookingmap.booths && bookingmap.booths.map(booth => (<Booth key={booth.id} setting={setting} {...booth} />))}
            </ul>
            </React.Fragment>) : <Loader />
         } 
         </div>
      </div>
    );
}


export default Bookingmap;
