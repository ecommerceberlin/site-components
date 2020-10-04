import Wrapper from '../components/Wrapper'
import Settings from '../datasources/Settings'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles';
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
      }, null) || 'xs'
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

            const imgSrc = sizes && width in sizes ? sizes[width] : (src || defaultSrc);
            const optimized = resizeCloudinaryImage(imgSrc, cloudinaryOpts[width], cloudinaryOpts[width]);
            const component = <Link passHref={true} href={href}><a><img src={optimized} alt="" /></a></Link>

            if(!wrapperProps){
                return ( <div className={classes.root}>{component}</div>  )
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