import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {useRouter} from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from '../i18n';
import TicketPrice from './Bookingmap/TicketPrice'
import TicketBuyButton from './Bookingmap/TicketBuyButton'
import {useSettings, resizeCloudinaryImage} from '../helpers'
import SubPageButton from './SubPageButton';
import MyTypography from './MyTypography';
import TicketImage from './TicketImage'
import {Centered} from './MyLayouts'


const useStyles = makeStyles(theme => ({

    card: {
        maxWidth: 445,
    },

    cardDisabled : {
        maxWidth: 445,
        opacity : 0.5
    },

    cardActionArea : {
        position : 'relative'
    },

    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },

    soldout : {
        backgroundImage : "url('https://res.cloudinary.com/eventjuicer/image/upload/v1561412798/soldout.png')",
        backgroundSize : 'contain',
        backgroundRepeat : 'no-repeat',
        position: 'absolute',
        width: '100%',
        height : '100%',
        zIndex: 1111
    },

}))
  

const Ticket = ({ icon = null, setting="premium", data }) => {
    
  const [translate, locale] = useTranslate(); 
  const {disabledBuying, disabledTicketIds = []} = useSettings(setting);
  const classes = useStyles();
  const router = useRouter();

  const hasDetailsPage = "details_url" in data && data.details_url.startsWith("/")

  const jumpToDetails = hasDetailsPage ? {
      href: data.details_url,
      onClick: () => router.push(data.details_url)
  }: {}

  return (<Card className={data.bookable ? classes.card : classes.cardDisabled }>
      <CardActionArea className={classes.cardActionArea} {...jumpToDetails}>

        {!data.bookable ? <div className={classes.soldout} /> : null}
          
        <Centered style={{minHeight: 200, justifyContent: 'center'}}> {icon} </Centered>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">{translate(`${data.translation_asset_id}.name`)}</Typography>
          <Typography component="p">
          {translate(`${data.translation_asset_id}.description`)}
          </Typography>
        <MyTypography template="price">
            <TicketPrice price={data.price} />
        </MyTypography>
        </CardContent>
      </CardActionArea>
      <CardActions>

    
         
         {hasDetailsPage && <SubPageButton color="default" variant="text" target={jumpToDetails} />} 
      {!disabledBuying && data.bookable && !(disabledTicketIds || []).includes(data.id) ?      
            <TicketBuyButton 
                label="common.buy" 
                bookable={data.bookable} 
                id={data.id} 
                nonBookable={<span></span>} 
                right={
                    hasDetailsPage ? <SubPageButton color="default" variant="contained" target={jumpToDetails} /> : null
                }    
            /> : null}
        

   

      </CardActions>
    </Card>
  );
}


export default Ticket

