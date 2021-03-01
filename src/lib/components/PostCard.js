
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {useRouter} from 'next/router'
import {slug} from '../helpers'
// import {useTranslate} from '../i18n'
// import CardActions from '@material-ui/core/CardActions';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    root: {
      // maxWidth: 700,
      marginBottom: 10,
      [theme.breakpoints.up('sm')]: {
        // maxWidth: 700,
      },
      
      backgroundColor: "#fff"
    },
  
    container: {
      display: 'flex',
      padding: 10,
      [theme.breakpoints.up('sm')]: {
      
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'baseline'
      }
    },
  
    icons : {
      width: 300,
      [theme.breakpoints.up('sm')]: {
     
      },
      flex: "1 0 100px",
    },
  
    texts: {
      flex: "3 0 300px",
      [theme.breakpoints.up('sm')]: {
      
      }
    }
  }));
  
  
function WidgetPostsCard({id, headline, quote}){

    const classes = useStyles();
    const router = useRouter();

    return (  <Card className={classes.root} elevation={0}>
    <CardActionArea className={classes.container} href={`/${slug(headline)},${id}`} onClick={() => router.push(`/${slug(headline)},${id}`)}>
        {/* <div className={classes.icons}></div> */}
        <CardContent className={classes.texts}>
        <Typography gutterBottom variant="h5" component="h3">
            {headline}
        </Typography>
        {quote && <Typography variant="body2" color="textSecondary" component="p">{quote}</Typography>}
        </CardContent>
    </CardActionArea>
    
    {/* <CardActions>
        <Button size="small" color="primary">
        Share
        </Button>
        <Link href="/publishers/[slug]" as="/publishers/targiehandlupl">
            <Button size="small" color="primary">
            {post.company.name}
            </Button>
        </Link>
    </CardActions> */}
    </Card>)
}

export default React.memo(WidgetPostsCard, (prevProps, nextProps) => prevProps.id == nextProps.id )