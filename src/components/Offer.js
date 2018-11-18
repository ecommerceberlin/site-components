
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import OfferLocationButton from './OfferLocationButton'
import classNames from 'classnames'

const styles = theme => ({
  card: {
    display: 'flex',
    backgroundColor: 'transparent',
    marginTop: 10,

    [theme.breakpoints.down('sm')]: {
      flexDirection : 'column',
    }
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  // content: {
    
  //   flex: '1 0 auto',
  //   position: 'relative',
 

  // },

  avatarContainer : {
    textAlign : 'center',
    width : '100%'
  },

  avatar : {

    maxWidth : 150,

   [theme.breakpoints.down('sm')]: {
      maxWidth : 100,
      maxHeight : 100,
    }

  },


  baseText : {

    fontFamily : theme.typography.fontFamily,
    fontSize: '1.1rem',
    fontWeight: 400,

  },

  text : {

    overflowY : "hidden",
    position: 'relative',
    maxHeight : 150,
    fontSize: '0.9rem',

    '&:before': {
      content: '""',
      width: '100%',
      height: '100%',    
      position: 'absolute',
      zIndex : 1000,
      left: 0,
      top: 0,
      background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255, 0.8))',
      pointerEvents: 'none'
    }

   
  }
});

const Offer = ({ id, name, classes, text, imageSrc, primary }) => (

    <Card
    elevation={primary ? 2 : 0}
    raised={primary}
    className={classes.card}
    >
    <CardHeader
    avatar={
    <img
        //  alt={opinion.person}
        src={imageSrc}
        className={classes.avatar}
    />
    }
    classes={{avatar : classes.avatarContainer}}
    />
    <div className={classes.details}>
        <CardContent className={classes.content}>
            <div className={classNames(classes.baseText, classes.text)} dangerouslySetInnerHTML={{__html : text}} />
        </CardContent>
        <CardActions className={classes.controls}>
            <OfferLocationButton id={id} name={name} text={text} className={classes.baseText} />
        </CardActions>
    </div>
    </Card>

)  


Offer.defaultProps = {
  link: null,
  title: 'title',
  text: '',
  primary: false,
  imageSrc: ''
};

Offer.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Offer);
