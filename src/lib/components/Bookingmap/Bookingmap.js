import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
// import { useTranslate } from '../../i18n'
import Loader from './Loader'
import { getBookingmap } from '../../redux/selectors'
import { useSettings } from '../../helpers'
import { resourceFetchRequest } from '../redux/actions';
import BookingmapDataUpdater from './BookingmapDataUpdater'
import BoothContext from './Context'

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
  marked: []
};

const Bookingmap = ({setting, booth, ...props}) => {

  const dispatch = useDispatch()
  const settings = useSettings(setting)
  const classes = useStyles()
  const bookingmap = useSelector(getBookingmap)

  const {
    zoom, 
    height, 
    width,
    defaultHeight,
    marked 
  } = Object.assign({}, defaultProps, settings, props)


  /**
   * run only once!
   */
  useEffect(() => dispatch(resourceFetchRequest([
    "bookingmap", 
    "ticketgroups", 
    "formdata",
    "blockings"
  ])), [])

  const isBoothMarked = (id) => marked.includes(id)

  return (<div
        className={classes.scrollableContainer}
        style={{
          height: !isNaN(height) ? height * zoom : defaultHeight * zoom
        }}
      >
      <BookingmapDataUpdater />
      <div className={classes.container} style={{width: width * zoom}}>{bookingmap && 'mapsource' in bookingmap ? (
            <React.Fragment>
            <img src={bookingmap.mapsource} className={classes.bg} />
            <ul className={classes.booths}>{bookingmap.booths && bookingmap.booths.map(b => (<BoothContext key={b.id} setting={setting} {...b}>{booth? React.createElement(booth, {marked: isBoothMarked(b.id)}): null}</BoothContext>))}</ul>
            </React.Fragment>
        ) : <Loader />}</div>
      </div>
  );
}


export default Bookingmap;

