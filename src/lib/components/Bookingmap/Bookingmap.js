import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux'
import { useSettings } from '../../helpers'
import { useTranslate } from '../../i18n'
import Booth from './Booth';
import Loader from './Loader'
import { getCart, KeyedFormdataSelector, KeyedTicketGroupsSelector, getBookingmap, KeyedBlockingsSelector } from '../../redux/selectors'
import { getCompanyProfileInfo, getCompanyName } from '../../helpers/data'
import { resourceFetchRequest } from '../redux/actions';

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
  autorefresh : 60,
  defaultSize : 21,
  boothStyleMapping: {}
};

const Bookingmap = ({setting, ...props}) => {

  const [translate] = useTranslate();
  const dispatch = useDispatch()
  const settings = useSettings(setting)
  const classes = useStyles()

  const formdata  = useSelector(KeyedFormdataSelector)
  const bookingmap = useSelector(getBookingmap)
  const ticketgroups = useSelector(KeyedTicketGroupsSelector)
  const cart = useSelector(getCart)
  const blockings = useSelector(KeyedBlockingsSelector)

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

  /**
   * bookingmap - list of booths (id, label, placing, dimensions)
   * ticketgroups - list of available tickets 
   */

   /**
    * blockings
    * 
booth-29-203: {
  sessid: 735edc77677b2ed88315da20c4c642965c5de29c,
  ticket_id: 1731,
  remaining: 563
}
    */

   /**
    * formdata
    * 
booth-29-203: {company: {id: 1158, slug: "i-systemspl", featured: 0, debut: 0, promo: 0, …}
id: "booth-29-203"
participant_id: 106207
purchase: {id: 109625, paid: 1, status: "ok", status_source: "manual", created_at: "2019-12-11 12:36:00", …}
ti: "G8"
ticket_id: 1732}
    */

  useEffect(() => dispatch(resourceFetchRequest(["bookingmap", "ticketgroups", "formdata"])), [])

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(resourceFetchRequest(["formdata"]))
    }, autorefresh * 1000);
    return () => clearInterval(interval);
  }, []);

  const isBoothSelected = (id) => {
    return Object.values(cart).map(({formdata})=> formdata && "id" in formdata? formdata.id: "").includes(id)
  }

  const getStatus = (id) => {
    return id in formdata ? formdata[id] : {};
  }

  const getStatusShort = (id) => {
    const { purchase } = getStatus(id);
    if (purchase) {
      return purchase.paid ? 'sold' : 'hold';
    }

    /***
     * OWNERSHIP must be checked!!!!
     */
    if(id in blockings){
   //   return "hold"
    }

    return false;
  }

  const getDefaultSize = (g) => {

    if(! (g in ticketgroups)){
      return 0;
    }
    const size = parseInt(ticketgroups[g].map.width);
    return !isNaN(size) ? size : 20; 
  }

  const getBuyerInfo = (id) => {
    const { company } = getStatus(id);
    return { 
      name : getCompanyName(company), 
      image : getCompanyProfileInfo(company, "thumbnail") 
    };
  }

  const fixBoothData = (booth) => {
    booth.dw = "dw" in booth && booth.dw > 0 ? booth.dw : getDefaultSize(booth.g);
    booth.dh = "dh" in booth && booth.dh > 0 ? booth.dh : getDefaultSize(booth.g);
    return booth
  }
  
  return (<div
        className={classes.scrollableContainer}
        style={{
          height: !isNaN(height) ? height * zoom : defaultHeight * zoom
        }}
      >
      <div className={classes.container} style={{width: width * zoom}}>{bookingmap && 'mapsource' in bookingmap ? (
            <React.Fragment>
            <img src={bookingmap.mapsource} className={classes.bg} />
            <ul className={classes.booths}>{bookingmap.booths && bookingmap.booths.map(booth => (<Booth key={booth.id} setting={setting} status={getStatusShort(booth.id)} selected={isBoothSelected(booth.id)} {...getBuyerInfo(booth.id)} {...fixBoothData(booth)} />))}</ul>
            </React.Fragment>
        ) : <Loader />}</div>
      </div>
  );
}


export default Bookingmap;
