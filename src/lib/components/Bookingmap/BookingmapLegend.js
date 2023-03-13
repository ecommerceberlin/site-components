import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import _get from 'lodash/get';
import {getTicketGroups} from '../../redux/selectors'
import BookingmapLegendBooth from './BookingmapLegendBooth'
import { useTranslate } from '../../i18n'
import { useBookingmapSettings } from './Context';
import ImageButton  from '../ImageButton';

const useStyles = makeStyles(theme => ({
    root : {
      width : "90%",
      maxWidth: 1200,
      margin: '10px auto 10px auto',
    },

    description : {
        marginRight : 10,
        maxWidth : 800,
    },
    
    groups : {
        flexGrow : 8,
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap'
    }
}));

const BookingmapLegend = ({setting, ...props}) =>  {

    const {allowedGroupIds, venueLayout} = useBookingmapSettings(setting, props)
    const classes = useStyles()
    const [translate] = useTranslate()
    const ticketgroups = useSelector(getTicketGroups)
    const filtered = (ticketgroups || []).filter(tg => allowedGroupIds.includes(tg.id))

   return (
        <Grid container className={classes.root} justifyContent="center" alignItems="center">
         
            <Grid item xl={7} lg={7} md={6}>
            <div className={classes.description}>
            <Typography variant="subtitle2">{ translate("event.sales.pool.legend")}</Typography>
            </div>
            <div className={classes.groups}>
            {filtered.map(tg => <BookingmapLegendBooth key={tg.name} setting={setting} g={tg.id} label={tg.name} />)}
            </div>
            </Grid>

            {venueLayout ? <Grid item xl={5} lg={5} md={6}>
                
                <ImageButton src={venueLayout} label="common.venuelayout" />

            </Grid>: null}
 
        </Grid>
      )

}
  
export default BookingmapLegend
  
