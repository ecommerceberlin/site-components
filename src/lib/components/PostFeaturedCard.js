
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// import take from 'lodash/take'
import {useRouter} from 'next/router'
import {slug} from '../helpers'
import { resizeCloudinaryImage } from '../helpers';

const useStyles = makeStyles(theme => ({
    
    filter: {
      filter: 'url(#svgFilter)'
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


function PostFeaturedCard({id, headline, quote, cover, secondary}){


    const classes = useStyles();
    const router = useRouter();

    if(!headline){
        return null
    }

    return (
        <Card elevation={0} square={false} className={classes.root}>
              <CardActionArea className={classes.container} href={`/${slug(headline)},${id}`} onClick={() => router.push(`/${slug(headline)},${id}`)}>
                <CardMedia
                  component="img"
                  alt=""
                  height="250"
                  image={resizeCloudinaryImage(cover)}
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
          </Card>
    )

}

PostFeaturedCard.defaultProps = {
    id: 0,
    headline: "",
    quote: "",
    cover: "",
    secondary: false
}

export default React.memo(PostFeaturedCard, (prevProps, nextProps) => prevProps.id == nextProps.id)