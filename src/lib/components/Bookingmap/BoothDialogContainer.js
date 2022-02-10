import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import WidgetSupport from '../../compositions/WidgetSupport';
import BookingmapLegendBooth from './BookingmapLegendBooth';

import {
  Power as Electricity,
  Fastfood as Catering,
  CropSquare as Space,
  Info,
  Receipt as Ids,
  MenuBook as Catalogue,
  EventSeat as Furniture
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({

  root: {
    
    marginRight : 20,
    marginLeft: 20,
    marginTop : 20,

    display : 'flex',
    flexDirection : 'row',
    
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      marginLeft: 0,
      marginRight : 0,
    }
  },
  boothId : {
    marginRight : 40,
    marginTop : 50,
    marginBottom : 10,
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      marginBottom : 10,
    }
  },

  mainContainer : {
    flexGrow: 5,
    marginBottom : 20
  },

  paper : {
      paddingRight : 24,
      paddingLeft : 24,
      paddingTop : 16,
      paddingBottom : 16,
      
      [theme.breakpoints.down('sm')]: {
        padding : 14,
      }
  }

}))


const BoothInfoContainer = ({setting="", header=null, content=null, ...boothProps}) => {

  const classes = useStyles()
  const {label, groupId} = boothProps

  /**
   * 
   * boothId: "booth-58-377"
   * groupId: "311"
   * label: "D4.2"
   * status: false
   * styleName: "hot"
   */

  return (<div>
            { header }
            <div className={classes.root}>
                <div className={classes.boothId}>
                     <BookingmapLegendBooth setting={setting} label={label} g={groupId} width="90" height="60" />
                   
                </div>
                <div className={classes.mainContainer}>
                   {content && <Paper className={classes.paper} elevation={1}>{content}</Paper>}
                    <WidgetSupport title="event.sales.support" />
                </div>
            </div>
    </div>)

}



export default BoothInfoContainer
