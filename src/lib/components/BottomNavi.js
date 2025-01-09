import React from 'react'
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RawTranslatedText from './RawTranslatedText'
import AppBar from '@material-ui/core/AppBar';


const useStyles = props => makeStyles(theme => ({

    appBar: {
        top: 'auto',
        bottom: 0,
        height: 'auto',
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
    },
    image: {
      position: 'relative',
      height: props.height,
      width: '50%',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        height: props.height/1.5,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid #ffffff',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
      filter: 'grayscale(100%)'
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(6)}px`,
      fontSize : 40
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  
  }))



export const scrollIntoTheView = (id) => {
    let element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
    });
};


/**

const router = useRouter();
const urlFragment = router.asPath.split('#')[1];
const targetRef = useRef<HTMLDivElement>(null);

useEffect(() => {
 if (urlFragment && targetRef.current) {
  if (urlFragment === id) {
    targetRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }
 }
}, [urlFragment, id]);


 */

function BottomNavi({targets=[], height=100}){

    const classes = useStyles({height})()

    if(!Array.isArray(targets)){
        return null
    }

    return (
    
        <AppBar position="fixed" color="secondary" className={classes.appBar} >
        <div className={classes.root}>{
        targets.map(target =>   
      <ButtonBase
        focusRipple
        key={target.label}
        className={classes.image}
        focusVisibleClassName={classes.focusVisible}
        onClick={() => scrollIntoTheView(target.target)}
        >
        <span className={classes.imageBackdrop} />
        <span className={classes.imageButton}>
            <Typography
            component="span"
            variant="h5"
            color="inherit"
            className={classes.imageTitle}
            >
                <RawTranslatedText label={target.label} />
                <span className={classes.imageMarked} />
            </Typography>
        </span>
        </ButtonBase>
        )}</div>
        </AppBar>
    )


}

export default BottomNavi;