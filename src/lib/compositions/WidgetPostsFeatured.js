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
import CachableDatasource from '../datasources/CachableDatasource'
import get from 'lodash/get'
import { resizeCloudinaryImage } from '../helpers';

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
        <CachableDatasource queries={{
          featured: {
            resource: "posts",
            params: { 
              page: page,
              is_promoted: 1
            },
            filters: {
              limit: 4
            }
          }
        }}>{({featured}) => {
        
        return (<Grid container spacing={5} direction="row">{

          featured.map(post => {

            const id = get(post, "id")
            const headline = get(post, "meta.headline");
            const quote = get(post, "meta.quote", null);

            if(!id){
              return null;
            }
      
            return (<Grid item key={id} {...gridSettings}><Card elevation={0} square={false} className={classes.root}>
              <CardActionArea className={classes.container} href={`/${slug(headline)},${id}`} onClick={() => router.push(`/${slug(headline)},${id}`)}>
                <CardMedia
                  component="img"
                  alt=""
                  height="250"
                  image={resizeCloudinaryImage(post.cover)}
                  title=""
                  className={classes.filter}
                />
                <CardContent className={classes.content}>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.headline}>
                  {headline}
                  </Typography>
                 {quote && <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>{quote}</Typography>} 
                </CardContent>
              </CardActionArea>
          </Card></Grid>)
          })

        }</Grid>)

        }}</CachableDatasource>
         
      
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
