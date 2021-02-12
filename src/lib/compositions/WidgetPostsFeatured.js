import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import take from 'lodash/take'
import {useRouter} from 'next/router'
/** */
import {slug} from '../helpers'
import SvgFilter from '../components/svg/Black'
import Posts from '../datasources/Posts'
import get from 'lodash/get'

const useStyles = makeStyles(theme => ({
    
    filter: {
      filter: 'url(#svgFilter)'
    },

    root: {

        marginBottom: 25
    },

    container: {
      position: 'relative',
    },

    content: {
      
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: 10

    },

    headline: {
       color: "#fff",
    },

    description: {
      color: "#fff",
    }

}));


function WidgetPostsFeatured({page, gridSettings}){
    
    const classes = useStyles();
    const router = useRouter();

    return (

      <div className={classes.root}>
        <SvgFilter />
        <Posts queries={{
          featured: {
            resource: "posts",
            params: { page: page},
            filters: {
              filter: (item) => item.is_sticky || item.is_promoted
            }
          }
        }}>{({featured}) => {
        
        return (<Grid container spacing={5} direction="row">{

          take(featured, 4).map(post => <Grid item key={post.id} {...gridSettings}><Card elevation={0} square={false} className={classes.root}>
            <CardActionArea className={classes.container} onClick={() => router.push(`/${slug(get(post, "meta.headline"))},${post.id}`)}>
              <CardMedia
                component="img"
                alt=""
                height="250"
                image={post.cover}
                title=""
                className={classes.filter}
              />
              <CardContent className={classes.content}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.headline}>
                {get(post, "meta.headline")}
                </Typography>
               {get(post, "meta.quote", null) && <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>{get(post,"meta.quote")}</Typography>} 
              </CardContent>
            </CardActionArea>
        </Card></Grid>)

        }</Grid>)

        }}</Posts>
         
      
      </div>
    );
  }

WidgetPostsFeatured.defaultProps = {
  gridSettings: {
    xs: 12,
    sm: 6,
    md: 6,
    lg: 3,
    xl: 3,
  },
  page: 1
}
  
  export default WidgetPostsFeatured
