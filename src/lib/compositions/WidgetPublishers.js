import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Companies from '../datasources/Companies'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {slug} from '../helpers'
import take from 'lodash/take'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 700,
    marginBottom: 10,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 700,
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

function WidgetPublishers() {

    const classes = useStyles();
    const router = useRouter();

    return (<Companies filter={(item)=>item.featured}>{(all) => take(all,3).map(company => {
      return (

        <Card key={company.id} className={classes.root} elevation={0}>
        <CardActionArea 
            className={classes.container} 
        //    onClick={() => router.push(`/${slug(post.meta.headline)},${post.id}`)}
        >
    
          <div className={classes.icons}>
            FIRMA<br/>
            IKONKI
          </div>
          <CardContent className={classes.texts}>
            <Typography gutterBottom variant="h5" component="h2">
              {/* {post.meta.headline} */}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
     
      </Card>
    
      )
    })
  }</Companies>);
}


export default WidgetPublishers