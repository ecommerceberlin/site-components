import React from 'react';
//import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import compose from 'recompose/compose';
import { translate } from '../i18n';
import TicketPrice from './Bookingmap/TicketPrice'
import TicketBuyButton from './Bookingmap/TicketBuyButton'

//

    const styles = {
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
        },

        price : {
            marginTop : 10,
            fontWeight : 800
        }
    };

function getTicketName(){

}

function Ticket(props) {
  const { data, classes, locale, translate } = props;
  return (
    <Card className={data.bookable ? classes.card : classes.cardDisabled }>
      <CardActionArea className={classes.cardActionArea}>

        {!data.bookable ? <div className={classes.soldout} /> : null}
          

        <CardMedia
          component="img"
          alt=""
          className={classes.media}
          height="140"
          image={data.thumbnail}
          title=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {translate(`${data.translation_asset_id}.name`)}
          </Typography>
          <Typography component="p">

        
          {translate(`${data.translation_asset_id}.description`)}
          </Typography>


           <Typography variant="h5" component="h5" className={classes.price}>
             <TicketPrice price={data.price} />
           </Typography>

        </CardContent>
      </CardActionArea>
      <CardActions>

           
            
            <TicketBuyButton label="common.buy" bookable={data.bookable} id={data.id} nonBookable={<span></span>} />

 

        {/* <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
}

Ticket.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
    translate,
    withStyles(styles)
)
export default enhance(Ticket);

