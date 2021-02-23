import Wrapper from '../components/Wrapper'
import Settings from '../datasources/Settings'
import Box from '@material-ui/core/Box'
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import {resizeCloudinaryImage} from '../helpers'
import useMediaQuery from '@material-ui/core/useMediaQuery';


function useWidth() {
    const theme = useTheme();
    const keys = [...theme.breakpoints.keys].reverse();
    return (
      keys.reduce((output, key) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const matches = useMediaQuery(theme.breakpoints.up(key));
        return !output && matches ? key : output;
      }, null) || 'md'
    );
  }


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& img': {
       // margin: theme.spacing(0.5),
        width: '100%'
      },
    },
  }));


const WidgetBanner = ({setting, cloudinaryOpts, defaultSrc}) => {

    const width = useWidth();
    const classes = useStyles();

    return (

        <Settings>{(get) => {
    
            const {wrapperProps, href, sizes, src} = get(setting)


            if((!sizes || !Object.keys(sizes).length) && !src ){
                return null;
            }

            const imgSrc = sizes && width in sizes ? sizes[width] : (src || defaultSrc);
            const optimized = resizeCloudinaryImage(imgSrc, cloudinaryOpts[width], cloudinaryOpts[width]);
            const component = href.indexOf("http") > -1 ? <a href={href} target="_blank"><img src={optimized} alt="" /></a> : <Link passHref={true} href={href}><a><img src={optimized} alt="" /></a></Link>

            if(!wrapperProps){
                return ( <Box p={1} className={classes.root}>{component}</Box>  )
            }
    
            return (
                <Wrapper {...wrapperProps}>{component}</Wrapper>
            )
    
            }
        
        }</Settings>
      
    )

}

WidgetBanner.defaultProps = {
    setting: "banner_cfp",
    cloudinaryOpts: {
        xs: 600,
        sm: 960,
        md: 1280,
        lg: 1920,
        xl: 2560
    },
    defaultSrc: ""
}

export default WidgetBanner


/**
* 
* xs, extra-small: 0px
* sm, small: 600px
* md, medium: 960px
* lg, large: 1280px
* xl, extra-large: 1920px
*
*/